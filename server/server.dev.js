import morgan from 'morgan'
import ignoreStyles from 'ignore-styles'
import Loadable from 'react-loadable'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import app from './app'
import config from '../config/webpack.dev'

const PORT = process.env.PORT || 3008
const compiler = webpack(config)
const use_ssr = process.env.SERVER_SSR || false

const startApp = app => {
  app.listen(PORT, () => {
    console.log(
      `Server listening on \x1b[42m\x1b[1mhttp://localhost:${PORT}\x1b[0m in \x1b[41m${
      process.env.NODE_ENV || 'development'
      }\x1b[0m 🌎...`
    )
  })
}

if (use_ssr) {
  app.use(morgan('dev'))
  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    // public path should be the same with webpack config
    publicPath: config.output.publicPath,
    noInfo: true,
    historyApiFallback: true
  }))
  startApp(app)
} else {
  startApp(app)
}