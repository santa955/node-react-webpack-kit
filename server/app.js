import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import fs from 'fs'
import path from 'path'
import cors from 'cors'
import API from './api'
import routers from './routers'

const app = express()
const use_ssr = process.env.SERVER_SSR || false

export default app

export const runApp = () => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())

  app.use('/api', cors(), API)

  console.log('use_ssr', use_ssr)

  //开启ssr
  if (use_ssr) app.use(routers)
  else {
    app.get('*', (req, res) => {
      fs.readFile(
        path.resolve(__dirname, '../dist/index.html'),
        'utf8', (err, html) => {
          if (err) {
            console.error('Read error', err)
            res.status(500)
          }
          res.send(html)
        }
      )
    })
  }
}