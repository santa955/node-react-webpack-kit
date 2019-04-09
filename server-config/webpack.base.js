const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const commonPaths = require('../paths')

module.exports = {
  entry: {
    app: commonPaths.server.entryPath
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
    alias: {}
  },
  plugins: [
    new ProgressBarPlugin()
  ]
}