const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpackMerge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const BabelMinifyPlugin = require('babel-minify-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const autoprefixer = require('autoprefixer')
const path = require('path')
const baseConfig = require('./webpack.base')
const commonPaths = require('./paths')

const plugins = []
const isAnalyze = typeof process.env.BUNDLE_ANALYZE !== 'undefined'

if (isAnalyze) plugins.push(new BundleAnalyzerPlugin())

module.exports = webpackMerge(baseConfig, {
  mode: 'production',
  output: {
    filename: `[name].[hash].js`,
    path: commonPaths.outputPath,
    chunkFilename: '[name].[chunkhash].js',
    //相对于index.html文件目录
    publicPath: './'
  },
  module: {
    noParse: /\.min\.js/,
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: true,
              localIdentName: '[local]_[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  remove: false,
                  flexbox: 'no-2009',
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9',
                  ]
                })
              ]
            }
          },
          'less-loader',
        ],
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: true,
              localIdentName: '[local]_[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  remove: false,
                  flexbox: 'no-2009',
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9',
                  ]
                })
              ]
            }
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    ...plugins,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `${commonPaths.cssFolder}/[name].[hash].css`,
      chunkFilename: `${commonPaths.cssFolder}/[name].[chunkhash].css`,
    }),
    new BabelMinifyPlugin(),
    new webpack.DefinePlugin({
      'process.env': 'production'
    }),
  ],
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          chunks: 'all',
          test: /(react|react-dom|react-dom-router|redux|react-redux)/,
          priority: 10,
          name: 'vendors',
        },
        antd: {
          name: 'antd',
          priority: 11,
          test: /(antd|\@ant-design)/,
          chunks: 'all'
        },
        libs: {
          name: 'libs',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 9,
        },

        // commons: {
        //   name: 'commons',
        //   test: path.resolve(commonPaths.sourcePath, ('/components')), // 可自定义拓展你的规则
        //   minChunks: 2, // 最小共用次数
        //   priority: 5,
        //   reuseExistingChunk: true
        // }
      }
    }
  }
})