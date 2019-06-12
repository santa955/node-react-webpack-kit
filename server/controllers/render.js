import fs from 'fs'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import Client from '../../src/app'
import rootReducer from '../../src/redux/reducer'

const root = process.env.NODE_ENV === 'production' ? path.resolve(__dirname, '../') : path.resolve(__dirname, '../../')
const injectHTML = (data, { html, title, meta, body, scripts, state }) => {
  data = data.replace('<html>', `<html ${html}>`)
  // data = data.replace(/<title>.*?<\/title>/g, title)
  data = data.replace('</head>', `${meta}</head>`)
  data = data.replace(
    '<div id="root"></div>',
    `<div id="root">${body}</div><script>window.__PRELOADED_STATE__ = ${state}</script>`
  )
  data = data.replace('</body>', scripts.join('') + '</body>')

  return data
}

export default (req, res, initState) => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(root, './dist/index.html'),
      'utf8', (err, html) => {
        if (err) {
          console.error('Read error', err)
          resolve('')
        }

        const store = createStore(rootReducer, initState, applyMiddleware(ReduxThunk))
        const content = renderToString(
          <Provider store={store}>
            <StaticRouter location={req.originalUrl} context={{}}>
              <Client />
            </StaticRouter>
          </Provider>
        )
        const htmlContent = injectHTML(html, {
          html: '',
          meta: '',
          body: content,
          scripts: [],
          state: JSON.stringify(store.getState()).replace(/</g, '\\u003c')
        })

        resolve(htmlContent)
      })
  })
}