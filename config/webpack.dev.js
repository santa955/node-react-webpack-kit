const webpack = require('webpack')
const { merge: webpackMerge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const commonPaths = require('./paths')
const baseConfig = require('./webpack.base')

const PORT = process.env.PORT || 8080
const ASSETS_PUBLIC_PATH = '/'
const moduleCSSLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
    importLoaders: 2,
    modules: {
      localIdentName: '[local]_[hash:base64:5]'
    },
  }
}

module.exports = webpackMerge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  // entry: { 'hot-load': 'webpack-hot-middleware/client' },
  output: {
    path: commonPaths.outputPath,
    publicPath: ASSETS_PUBLIC_PATH,
    filename: '[name].[hash].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[name].[chunkhash].js'
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
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        use: ['style-loader', moduleCSSLoader, 'stylus-loader']
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new HtmlWebpackPlugin({
      template: commonPaths.templatePath,
      appMountIds: ['app'],
      inject: true,
      mobile: true,
      minify: {
        html5: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        preserveLineBreaks: true,
        removeComments: true,
        keepClosingSlash: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    })
  ],

  optimization: {
    runtimeChunk: 'single',
    minimize: false,
    namedChunks: true,
    namedModules: true,
    noEmitOnErrors: true,
  },

  devServer: {
    contentBase: commonPaths.outputPath,
    publicPath: ASSETS_PUBLIC_PATH,
    compress: true,
    hot: true,
    port: PORT,
    host: '0.0.0.0',
    useLocalIp: true,
    index: 'index.html',
    open: false,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // 解决刷新路由404 https://github.com/facebook/create-react-app/issues/387
    // https://zhuanlan.zhihu.com/p/32441060
    historyApiFallback: {
      disableDotRule: true,
    },
  }
})