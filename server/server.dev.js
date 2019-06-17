import express from 'express'
import path from 'path'
import morgan from 'morgan'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import app, { runApp } from './app'
import config from '../config/ssr/webpack.dev'

const PORT = process.env.PORT || 3008
const use_ssr = process.env.SERVER_SSR || false

const startApp = app => {
  runApp()
  app.listen(PORT, () => {
    console.log(
      `Server listening on \x1b[42m\x1b[1mhttp://localhost:${PORT}\x1b[0m in \x1b[41m${
      process.env.NODE_ENV || 'development'
      }\x1b[0m 🌎...`
    )
  })
}

if (use_ssr) {
  const compiler = webpack(config)
  app.use(express.static(path.join(__dirname, '../public')))
  app.use(morgan('dev'))
  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    logLevel: 'silent',
    publicPath: '/dist/web',
    writeToDisk(filePath) {
      return filePath
    },
  }),
  )
  startApp(app)
} else {
  startApp(app)
}