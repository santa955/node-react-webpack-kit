import express from 'express'
import path from 'path'
import fs from 'fs'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import React from 'react'
import { renderToString } from 'react-dom/server'
import API from './api'
import { injectHTML } from './utils'
import Hello from '../src/app'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../dist')))
app.use(morgan('dev'))
app.use('/api', API)

console.log('dir', path.join(__dirname, '../dist/index.html'))

app.get('*', (req, res) => {
  fs.readFile(
    path.join(root ,'./dist/index.html'),
    'utf8', (err, html) => {
      if (err) {
        console.error('Read error', err)
        return res.status(404).end()
      }
      let content = renderToString(<Hello />)
      let htmlContent = injectHTML(html, {
        html: '',
        meta: '',
        body: content,
        scripts: [],
        state: JSON.stringify({}).replace(/</g, '\\u003c')
      })

      res.send(htmlContent)
    })
})

export default app