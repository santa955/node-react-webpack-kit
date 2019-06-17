const path = require('path')

module.exports = {
  root: path.resolve(__dirname, '../'),
  outputPath: path.resolve(__dirname, '../', 'dist'),
  entryPath: path.resolve(__dirname, '../', 'src/index.js'),
  serverEntryPath: path.resolve(__dirname, '../', 'src/app/index.js'),
  sourcePath: path.resolve(__dirname, '../', 'src'),
  templatePath: path.resolve(__dirname, '../', 'src/index.html'),
  imagesFolder: 'images',
  fontsFolder: 'fonts',
  cssFolder: 'css',
  jsFolder: 'js'
}