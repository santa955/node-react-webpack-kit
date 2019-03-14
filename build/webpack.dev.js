const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const commonPaths = require('./paths')
const basecConfig = require('./webpack.base')

module.exports = webpackMerge(basecConfig, {
  mode: 'development',
  output: {
    filename: '[name].[hash].js',
    path: commonPaths.outputPath,
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /(node_modules)/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              camelCase: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(css|scss)$/,
        exclude: /(node_modules)/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              camelCase: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    contentBase: commonPaths.outputPath,
    compress: true,
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(['../dist']),
    new webpack.DefinePlugin({
      'process.env': 'development'
    }),
  ],
})