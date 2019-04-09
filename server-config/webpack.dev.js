const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const pxtorem = require('postcss-pxtorem')
const nodeExternals = require('webpack-node-externals')
const commonPaths = require('../paths')
const baseConfig = require('./webpack.base')

const ASSETS_PUBLIC_PATH = '/'
const moduleCSSLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: true,
    importLoaders: 2,
    localIdentName: '[local]_[hash:base64:5]'
  }
}

const modulePostCssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      pxtorem({
        rootValue: 20,
        propWhiteList: [],
        selectorBlackList: ['pc', 'html'],
      })
    ],
  },
}

module.exports = webpackMerge(baseConfig, {
  mode: 'development',
  target: 'node',
  devtool: 'eval-source-map',
  externals: [nodeExternals()],
  output: {
    path: commonPaths.server.outputPath,
    publicPath: ASSETS_PUBLIC_PATH,
    filename: '[name].[hash].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[name].[chunkhash].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    noParse: /\.min\.js/,
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', moduleCSSLoader],
        include: [/node_modules/, commonPaths.sourcePath]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          moduleCSSLoader,
          modulePostCssLoader,
          {
            loader: 'less-loader',
            options: { javascriptEnabled: true }
          }
        ]
      },
      {
        test: /\.styl$/,
        use: ['style-loader', moduleCSSLoader, modulePostCssLoader, 'stylus-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', moduleCSSLoader, modulePostCssLoader, 'sass-loader']
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': 'development'
    })
  ]
})