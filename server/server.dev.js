// import webpack from 'webpack'
// import webpackDevMiddleware from 'webpack-dev-middleware'
// import webpackHotMiddleware from 'webpack-hot-middleware'
// import config from '../config/webpack.dev'
import app from './app'

const PORT = process.env.PORT || 3009
// const compiler = webpack(config)

// app.use(webpackHotMiddleware(compiler))
// app.use(webpackDevMiddleware(compiler, {
//   // public path should be the same with webpack config
//   publicPath: config.output.publicPath,
//   noInfo: true,
//   historyApiFallback: true
// }))

app.listen(PORT, () => {
  console.log(
    `Server listening on \x1b[42m\x1b[1mhttp://localhost:${PORT}\x1b[0m in \x1b[41m${
    process.env.NODE_ENV || 'development'
    }\x1b[0m 🌎...`
  )
})