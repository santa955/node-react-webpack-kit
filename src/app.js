import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import path from 'path'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.PORT || 3008

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

app.get('/api', (req, res) => {
  res.setHeader('Cache-Control', 'max-age=100')
  res.json({ 'message': '666' })
})

app.get('/', (req, res) => {
  res.send('Invalid endpoint!')
})

app.listen(PORT, () => {
  console.info('server started - ', PORT)
})