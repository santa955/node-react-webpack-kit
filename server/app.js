import express from 'express'
import path from 'path'
import fs from 'fs'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import gzip from 'express-static-gzip'
import cookieParser from 'cookie-parser'
import FileStreamRotator from 'file-stream-rotator'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../config/webpack.dev'
import middleware404 from './middleware/404'
import middlewareError from './middleware/error'
import API from './api'

const app = express()
const PORT = process.env.PORT || 3008
const compiler = webpack(config)
const logDir = path.join(__dirname, '../log')

// 日志按时间分割流
const accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDir, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})

// 检查是否存在logDir这个目录没有则创建
fs.existsSync(logDir) || fs.mkdirSync(logDir)
app.use(morgan('combined', { stream: accessLogStream }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

app.use(webpackHotMiddleware(compiler))
app.use(webpackDevMiddleware(compiler, {
  // public path should be the same with webpack config
  publicPath: config.output.publicPath,
  noInfo: true,
  historyApiFallback: true
}))

app.use('/api', API)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
})
app.use(middleware404())
app.use(middlewareError())

app.listen(PORT, () => {
  console.log(
    `Server listening on \x1b[42m\x1b[1mhttp://localhost:${PORT}\x1b[0m in \x1b[41m${
    process.env.NODE_ENV || 'development'
    }\x1b[0m 🌎...`
  )
})