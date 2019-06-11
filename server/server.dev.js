import express from 'express'
import path from 'path'
import request from 'request'
import fs from 'fs'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import ignoreStyles from 'ignore-styles'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../config/webpack.dev'
import API from './api'
import Client from '../src/app'
import { injectHTML } from './utils'
import rootReducer from '../src/redux/reducer'

const app = express()
const PORT = process.env.PORT || 3008
const compiler = webpack(config)

ignoreStyles(ignoreStyles.DEFAULT_EXTENSIONS, (mod, filename) => {
  if (!extensions.find(f => filename.endsWith(f))) {
    return ignoreStyles.noOp()
  }
})

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api', API)

app.use(webpackHotMiddleware(compiler))
app.use(webpackDevMiddleware(compiler, {
  // public path should be the same with webpack config
  publicPath: config.output.publicPath,
  noInfo: true,
  historyApiFallback: true
}))

app.get('*', (req, res) => {
  fs.readFile(
    path.resolve(__dirname, '../dist/index.html'),
    'utf8', (err, html) => {
      if (err) {
        console.error('Read error', err)
        return res.status(404).end()
      }
      request.get('http://127.0.0.1:3008/api/movie/26667010', (err, response, body) => {
        if (err) console.log(err)
        const p = JSON.parse(body)
        const movieInfo = p.data
        const initState = {
          detail: {
            movieInfo: {
              info: movieInfo
            }
          }
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

        res.send(htmlContent)
      })

    })
})

app.listen(PORT, () => {
  console.log(
    `Server listening on \x1b[42m\x1b[1mhttp://localhost:${PORT}\x1b[0m in \x1b[41m${
    process.env.NODE_ENV || 'development'
    }\x1b[0m 🌎...`
  )
})