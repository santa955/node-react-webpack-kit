const HOST = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com'
const request = ({ url, method = 'GET', header = {}, data = {} }) => {
  let headers = { ...header, 'content-type': 'application/json' }

  let option = {
    cache: 'no-cache',
    credentials: 'same-origin',
    headers,
    method,
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(data)
  }

  return fetch(`${HOST}${url}`, option)
    .then(response => {
      if (!response.ok) {
        return {
          code: response.status,
          message: response.message || '请求出错',
          data: null
        }
      }
      return { code: 0, message: '', data: response.json() }
    })
    .catch(error => {
      let { code, message = '请求出错' } = error
      return { code, message, data: null }
    })
}

export default request
export const get = ({ url, header }) => request({ url, header })
export const post = ({ url, header, data }) => request({ url, method: 'POST', header, data })