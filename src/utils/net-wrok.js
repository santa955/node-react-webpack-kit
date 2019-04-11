const request = ({ url, data = {} }) => {
  let { method = 'GET', header = {}, ...rest } = data
  let headers = { ...header, 'content-type': 'application/json' }

  let option = {
    cache: 'no-cache',
    credentials: 'same-origin',
    headers,
    method,
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
  }


  if (Object.keys(rest).length) {
    console.log('reset', rest)
    option.body = JSON.stringify(rest)
  }

  return fetch(url, option)
    .then(response => {
      if (!response.ok) return { code: response.status, message: response.message || '请求出错', data: null }
      return response.json()
    })
    .catch(error => {
      return { code: error.status, message: error.message || '请求出错', data: null }
    })
}

export default request
export const get = (url) => request({ url })
export const post = ({ url, data }) => request({ url, data: { ...data, method: 'POST' } })