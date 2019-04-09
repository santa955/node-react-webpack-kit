const path = require('path')

module.exports = {
  root: path.resolve(__dirname, '../../')
  client: {
    outputPath: path.resolve(__dirname, '../', 'dist'),
    entryPath: path.resolve(__dirname, '../', 'src/client/app.js'),
    sourcePath: path.resolve(__dirname, '../', 'src'),
    templatePath: path.resolve(__dirname, '../', 'src/index.html'),
    imagesFolder: 'images',
    fontsFolder: 'fonts',
    cssFolder: 'css',
    jsFolder: 'js'
  },
  server: {
    outputPath: path.resolve(__dirname, '../../', 'dist/server'),
    entryPath: path.resolve(__dirname, '../../', 'src/server/app.js'),
  }
}