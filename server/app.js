import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import gzip from 'express-static-gzip'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.PORT || 3008

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

app.set("views", path.resolve(__dirname, "views"))
app.set("view engine", "ejs")

app.get('/', (req, res) => {
  res.render("index", {
    message: "Hey everyone! This is my webpage."
  });
})

app.listen(PORT, () => {
  console.log(
    `Server listening on \x1b[42m\x1b[1mhttp://localhost:${PORT}\x1b[0m in \x1b[41m${
    process.env.NODE_ENV || 'development'
    }\x1b[0m 🌎...`
  )
})