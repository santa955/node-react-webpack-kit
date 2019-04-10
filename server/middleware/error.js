const Error505 = () => {
  return (err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error')
  }
}

export default Error505