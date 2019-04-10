const express = require('express')
const request = require('request')
const router = express.Router()
const API_URL = 'http://api.douban.com/v2/movie'

const packJson = (type, data) => {
  return {
    code: type === 'error' ? data.code || -500500 : 0,
    data: type === 'error' ? null : data,
    message: type === 'error' ? (data.msg || data.message) : '',
  }
}

router.get('/movie/:id', (req, res, next) => {
  let { id } = req.params
  request.get(`${API_URL}/subject/${id}`, (err, response, body) => {
    if (err) return res.json(packJson('error', err))
    body = JSON.parse(body)
    if (body.code) return res.json(packJson('error', body))
    return res.json(packJson(null, body))
  })
})

router.get('/movies/theaters', (req, res, next) => {
  request.get(`${API_URL}/in_theaters`, (err, response, body) => {
    if (err) return res.json(packJson('error', err))
    body = JSON.parse(body)
    if (body.code) return res.json(packJson('error', body))
    return res.json(packJson(null, body))
  })
})

export default router