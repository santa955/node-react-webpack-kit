import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import API from './api'
import routers from './routers'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api', API)
app.use(routers)

export default app