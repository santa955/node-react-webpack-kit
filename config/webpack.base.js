const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const commonPaths = require('./paths')

module.exports = {
  entry: {
    app: commonPaths.entryPath
  },
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.(js|jsx)$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/,
      //   options: {
      //     // emitWarning: process.env.NODE_ENV !== 'production',
      //     emitWarning: false
      //   },
      // },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: commonPaths.imagesFolder,
            },
          },
        ],
      },
      {
        test: /\.(woff2|ttf|woff|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: commonPaths.fontsFolder,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@components': `${commonPaths.sourcePath}/components`,
      '@pages': `${commonPaths.sourcePath}/pages`,
      '@libs': `${commonPaths.sourcePath}/libs`,
      '@redux': `${commonPaths.sourcePath}/redux`,
    }
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  // 定义非直接引用依赖
  // 定义第三方直接用Script引入而不需要打包的类库
  externals: {
    window: 'window'
  }
}