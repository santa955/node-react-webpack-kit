import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import API from './api'
import routers from './routers'

const app = express()
const use_ssr = process.env.SERVER_SSR || false

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api', cors(), API)

//开启ssr
if (use_ssr) app.use(routers)

export default app