const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const commonPaths = require('./paths')
const baseConfig = require('./webpack.base')

module.exports = webpackMerge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    filename: '[name].[hash].js',
    path: commonPaths.outputPath,
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    noParse: /\.min\.js/,
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[local]_[hash:base64:5]',
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[local_[hash:base64:5]',
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
    host: '127.0.0.1',
    useLocalIp: true,
    index: 'index.html',
    open: false,
    overlay: {
      warnings: true,
      errors: true
    },
    // 解决刷新路由404 https://github.com/facebook/create-react-app/issues/387
    // https://zhuanlan.zhihu.com/p/32441060
    historyApiFallback: {
      disableDotRule: true,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': 'development'
    }),
  ],
})