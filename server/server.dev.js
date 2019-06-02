import CssModulesHook from 'css-modules-require-hook/preset'
import SourceMapSupport from 'source-map-support'
import Stylus from 'stylus'
import App from './app'

const PORT = process.env.PORT || 3009

SourceMapSupport.install()

App.listen(PORT, () => {
  console.log(
    `Server listening on \x1b[42m\x1b[1mhttp://localhost:${PORT}\x1b[0m in \x1b[41m${
    process.env.NODE_ENV || 'development'
    }\x1b[0m 🌎...`
  )
})