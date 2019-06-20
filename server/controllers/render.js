import fs from 'fs'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { ChunkExtractor } from '@loadable/server'
import rootReducer from '../../src/redux/reducer'

export default (req, res, initState) => {
  return new Promise(async (resolve, reject) => {

    const nodeStats = path.join(__dirname, '../../dist/node/loadable-stats.json')
    const webStats = path.join(__dirname, '../../dist/web/loadable-stats.json')

    const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats, entrypoints: ['app'] })
    const { default: App } = nodeExtractor.requireEntrypoint()
    const webExtractor = new ChunkExtractor({ statsFile: webStats, entrypoints: ['app'] })
    const store = createStore(rootReducer, initState, applyMiddleware(ReduxThunk))
    const jsx = webExtractor.collectChunks(
      <Provider store={store}>
        <StaticRouter location={req.originalUrl} context={{}}>
          <App />
        </StaticRouter>
      </Provider>
    )

    const html = renderToString(jsx)
    const content =
      `<!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <meta name="referrer" content="never">
          <title>好时光 - 好电影</title>
          ${webExtractor.getStyleTags()}
        </head>
        <body>
          <div id="root">${html}</div>
          <script>window.__PRELOADED__ = true</script>
          <script>window.__PRELOADED_STATE__ = ${JSON.stringify(initState)}</script>
          ${webExtractor.getScriptTags()}
        </body>
      </html>`

    resolve(content)
  })
}