let webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpackMerge = require('webpack-merge')
const path = require('path')
const basecConfig = require('./webpack.base')
const commonPaths = require('./paths')

module.exports = webpackMerge(basecConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: `[name].[hash].js`,
    path: commonPaths.outputPath,
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /(node_modules)/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
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
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `${commonPaths.cssFolder}/[name].css`,
      chunkFilename: '[id].css',
    }),
    new webpack.DefinePlugin({
      'process.env': 'production'
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // 只打包初始时依赖的第三方
        },
        antd: {
          name: 'antd',
          priority: 20,
          test: /[\\/]node_modules[\\/]antd[\\/]/
        },
        commons: {
          name: 'commons',
          test: path.resolve(commonPaths.sourcePath, ('/components')), // 可自定义拓展你的规则
          minChunks: 2, // 最小共用次数
          priority: 5,
          reuseExistingChunk: true
        }
      }
    }
  }
})