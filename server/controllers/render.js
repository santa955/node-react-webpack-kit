import fs from 'fs'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { ChunkExtractor } from '@loadable/server'
// import Client from '../../src/app'
import rootReducer from '../../src/redux/reducer'

const root = process.env.NODE_ENV === 'production'
  ? path.resolve(__dirname, '../')
  : path.resolve(__dirname, '../../')

export default (req, res, initState) => {
  return new Promise((resolve, reject) => {

    const nodeStats = path.join(root, './dist/node/loadable-stats.json')
    const webStats = path.join(root, './dist/web/loadable-stats.json')
    const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats, entrypoints: 'servers' })
    const { default: App } = nodeExtractor.requireEntrypoint()
    const webExtractor = new ChunkExtractor({ statsFile: webStats, entrypoints: 'app' })
    const store = createStore(rootReducer, initState, applyMiddleware(ReduxThunk))
    const jsx = webExtractor.collectChunks(
      <Provider store={store}>
        <StaticRouter location={req.originalUrl} context={{}}>
          <App />
        </StaticRouter>
      </Provider>
    )

    const html = renderToString(jsx)
    const content = `<!DOCTYPE html>
    <html>
    <head>
    ${webExtractor.getLinkTags()}
    ${webExtractor.getStyleTags()}
    </head>
    <body>
      <div id="root">${html}</div>
      ${webExtractor.getScriptTags()}
    </body>
    </html>`

    resolve(content)
  })
}