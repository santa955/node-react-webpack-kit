import express from 'express'
import fs from 'fs'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import path from 'path'
import nunjucks from 'nunjucks'
import cookieParser from 'cookie-parser'
import marked from 'marked'
import highlight from 'highlight.js'

const app = express()
const PORT = process.env.PORT || 3008

app.set('view engine', 'njk');
app.set('views', path.resolve(__dirname, 'views'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

nunjucks.configure(path.resolve(__dirname, 'views'), {
  autoescape: false,
  express: app
})

marked.setOptions({
  highlight: function (code) {
    highlight.highlightAuto(code).value
  },
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

let markdownString = fs.readFileSync(path.resolve(__dirname, './20150417.md'), 'utf8')
let HTMLString = marked(markdownString)

app.get('/', (req, res) => {
  res.render('index', { str: HTMLString })
})

app.listen(PORT, () => {
  console.info('server started - ', PORT)
})