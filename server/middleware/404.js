const NotFound = () => {
  return (req, res, next) => {
    next({
      status: -400404,
      message: '请求地址不存在',
      data: null
    })
  }
}

export default NotFound