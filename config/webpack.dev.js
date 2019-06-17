const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const LoadablePlugin = require('@loadable/webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const pxtorem = require('postcss-pxtorem')
const commonPaths = require('./paths')
const baseConfig = require('./webpack.base')

const ASSETS_PUBLIC_PATH = '/'
const use_ssr = process.env.SERVER_SSR || false
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
        selectorBlackList: ['html'],
      })
    ],
  },
}

module.exports = webpackMerge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: { hot: 'webpack-hot-middleware/client' },
  output: {
    path: `${commonPaths.outputPath}/web`,
    publicPath: `/web`,
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
          MiniCssExtractPlugin.loader,
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
      'process.env': {
        USE_SSR: JSON.stringify(use_ssr)
      }
    }),
    new LoadablePlugin(),
    // new MiniCssExtractPlugin({
    //   // filename: `${commonPaths.cssFolder}/[name].[hash].css`,
    //   // chunkFilename: `${commonPaths.cssFolder}/[name].[chunkhash].css`,
    // }),
    new HtmlWebpackPlugin({
      template: commonPaths.templatePath,
      inject: true,
      alwaysWriteToDisk: true,
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
    new HtmlWebpackHarddiskPlugin(),
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
    compress: false,
    hot: true,
    port: 8089,
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