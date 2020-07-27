const express = require('express')
const path = require('path')
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
app.use(express.static(distPath))
app.get('/*', function (req, res) {
  res.sendFile(path.resolve(distPath, 'index.html'))
})

app.listen(PORT, function () {
  console.log(`App istening on port ${PORT}`)
})