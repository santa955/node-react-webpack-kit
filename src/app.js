import express from 'express'
import fs from 'fs'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import path from 'path'
import nunjucks from 'nunjucks'
import cookieParser from 'cookie-parser'
import markdownIt from 'markdown-it'
import hljs from 'highlight.js'

const app = express()
const PORT = process.env.PORT || 3008
const md = new markdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
        hljs.highlight(lang, str, true).value +
          '</code></pre>'
      } catch (err) { }
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
})

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


let markdownString = fs.readFileSync(path.resolve(__dirname, './20150417.md'), 'utf8')
let HTMLString = md.render(markdownString)

app.get('/', (req, res) => {
  res.render('index', { str: HTMLString })
})

app.listen(PORT, () => {
  console.info('server started - ', PORT)
})