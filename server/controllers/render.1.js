import fs from 'fs'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import Loadable from 'react-loadable'
import { collectInitial, collectContext } from 'node-style-loader/collect'
import Client from '../../src/app'
import rootReducer from '../../src/redux/reducer'
// import manifest from '../../dist/manifest.json'

const root = process.env.NODE_ENV === 'production' ? path.resolve(__dirname, '../') : path.resolve(__dirname, '../../')
const injectHTML = (data, { html, title, meta, criticalStyles, body, scripts, state }) => {
  data = data.replace('<html>', `<html ${html}>`)
  // data = data.replace(/<title>.*?<\/title>/g, title)
  data = data.replace('</head>', `${meta}${criticalStyles}</head>`)
  data = data.replace(
    '<div id="root"></div>',
    `<div id="root">${body}</div><script>window.__PRELOADED_STATE__ = ${state}</script>`
  )
  data = data.replace('</body>', scripts.join('') + '</body>')

  return data
}

const extractAssets = (assets, chunks) =>
  Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map(k => assets[k])

export default (req, res, initState) => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(root, './dist/index.html'),
      'utf8', (err, html) => {
        if (err) {
          console.error('Read error', err)
          resolve('')
        }

        const modules = []
        const store = createStore(rootReducer, initState, applyMiddleware(ReduxThunk))
        const manifest = path.join(root,  './dist/manifest.json')
        const extraChunks = extractAssets(manifest, modules)
          .map(c => `<script type="text/javascript" src="/${c.replace(/^\//, '')}"></script>`)

        const [contextStyleTag, reactString] = collectContext(() =>
          renderToString(
            <Loadable.Capture report={moduleName => modules.push(moduleName)}>
              <Provider store={store}>
                <StaticRouter location={req.originalUrl} context={{}}>
                  <Client />
                </StaticRouter>
              </Provider>
            </Loadable.Capture>
          ))

        const htmlContent = injectHTML(html, {
          html: '',
          meta: '',
          body: reactString,
          scripts: extraChunks,
          criticalStyles: contextStyleTag,
          state: JSON.stringify(store.getState()).replace(/</g, '\\u003c')
        })

        resolve(htmlContent)
      })
  })
}