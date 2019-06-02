module.exports = {
  extensions: ['.styl'],
  preprocessCss: function (css, filename) {
    return Stylus(css)
      .set('filename', filename)
      .render()
  },
  camelCase: true,
  generateScopedName: '[name]_[local]_[hash:base64:8]'
}