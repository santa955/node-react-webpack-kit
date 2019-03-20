const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const commonPaths = require('./paths')

module.exports = {
  entry: {
    app: commonPaths.entryPath
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          emitWarning: process.env.NODE_ENV !== 'production',
        },
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [/node_modules/]
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
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx', '.css', '.scss', '.less'],
  },
  plugins: [
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      template: commonPaths.templatePath,
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    })
  ],
}