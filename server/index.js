const express = require('express')
const path = require('path')
const chalk = require('chalk')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const nunjucks = require('nunjucks')
const manifest = require('../dist/manifest.json')

const app = express()
const PORT = process.env.PORT || 8080
const viewsPath = path.join(__dirname, './', 'views')
const distPath = path.join(__dirname, '../', 'dist')

// nunjucks.configure(viewsPath, {
//   ext: 'html',
//   autoescape: true,
//   express: app
// })

// app.set('view engine', 'nunjucks')
app.use(helmet())
app.use(cookieParser())
app.use(express.static(distPath))
app.get('/*', function (req, res) {
  res.sendFile(path.resolve(distPath, 'index.html'))
})

app.listen(PORT, function (err) {
  if (err) return console.log(chalk.red(`[Server] 💥 ${err}`))
  console.log(chalk.green(`[Server] Server running: http://0.0.0.0:${PORT}`))
})