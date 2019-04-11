const Error505 = () => {
  return (err, req, res, next) => {
    res.json({
      status: -500502,
      message: '内部错误',
      data: null
    })
  }
}

export default Error505