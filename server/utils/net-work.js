import request from 'request'

const HOST = 'http://127.0.0.1:3009'

export const get = ({ url }) => {
  console.log('API REQUEST URL: ', `${HOST}${url}`)
  return new Promise((resolve, reject) => {
    request.get(`${HOST}${url}`, (err, res, body) => {
      if (err) return resolve({ code: -500500, data: null, message: err.message })
      if (res.statusCode !== 200) resolve({ code: res.statusCode, data: null, message: res.message })
      return resolve({ code: 0, data: JSON.parse(body).data, message: '' })
    })
  })
}