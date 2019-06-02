import express from 'express'
import path from 'path'
import fs from 'fs'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import gzip from 'express-static-gzip'
import cookieParser from 'cookie-parser'
import FileStreamRotator from 'file-stream-rotator'
import React from 'react'
import { renderToString } from 'react-dom/server'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../config/webpack.dev'
import middleware404 from './middleware/404'
import middlewareError from './middleware/error'
import API from './api'
import { injectHTML } from './utils'
import Hello from '../src/test'

const app = express()
const compiler = webpack(config)
const logDir = path.join(__dirname, '../log')

// 日志按时间分割流
const accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDir, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})

app.use(morgan('dev'))

// 检查是否存在logDir这个目录没有则创建
// fs.existsSync(logDir) || fs.mkdirSync(logDir)
app.use(morgan('combined', { stream: accessLogStream }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

// app.use(webpackHotMiddleware(compiler))
// app.use(webpackDevMiddleware(compiler, {
//   // public path should be the same with webpack config
//   publicPath: config.output.publicPath,
//   noInfo: true,
//   historyApiFallback: true
// }))

app.use('/api', API)
app.get('*', (req, res) => {
  // let content = renderToString(<Hello />)
  // res.send(content)
  fs.readFile(
    path.join(__dirname, '../dist/index.html'),
    'utf-8', (err, html) => {
      if (err) {
        console.error('Read error', err)
        return res.status(404).end()
      }
      let content = renderToString(<Hello />)
      let htmlContent = injectHTML(html, {
        html: '',
        meta: '',
        body: content,
        scripts: [],
        state: JSON.stringify({}).replace(/</g, '\\u003c')
      })

      res.send(htmlContent)
    })

  // res.sendFile(path.join(__dirname, '../dist/index.html'));
})
// app.use(middleware404())
// app.use(middlewareError())

export default app