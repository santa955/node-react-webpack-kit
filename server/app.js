import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import gzip from 'express-static-gzip'
import cookieParser from 'cookie-parser'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../build/webpack.dev'

const app = express()
const PORT = process.env.PORT || 3008
const compiler = webpack(config)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

app.use(webpackHotMiddleware(compiler))
app.use(webpackDevMiddleware(compiler, {
  // public path should be the same with webpack config
  // contentBase: path.resolve(__dirname, '../', 'dist'),
  publicPath: config.output.publicPath,
  // noInfo: true,
  historyApiFallback: true,
  hot: true
}))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
})

app.listen(PORT, () => {
  console.log(
    `Server listening on \x1b[42m\x1b[1mhttp://localhost:${PORT}\x1b[0m in \x1b[41m${
    process.env.NODE_ENV || 'development'
    }\x1b[0m 🌎...`
  )
})