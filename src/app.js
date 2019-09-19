import express from 'express'
import fs from 'fs'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import path from 'path'
import nunjucks from 'nunjucks'
import cookieParser from 'cookie-parser'
import hljs from 'highlight.js'

const app = express()
const PORT = process.env.PORT || 3008

app.set('view engine', 'njk');
app.set('views', path.resolve(__dirname, 'views'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

app.get('/api', (req, res) => {
  res.setHeader('Cache-Control', 'max-age=100')
  res.json({ 'message': '666' })
})

nunjucks.configure(path.resolve(__dirname, 'views'), {
  autoescape: false,
  express: app
})


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.info('server started - ', PORT)
})