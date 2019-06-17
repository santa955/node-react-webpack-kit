const nodeExternals = require('webpack-node-externals')
const webpackMerge = require('webpack-merge')
const LoadablePlugin = require('@loadable/webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const pxtorem = require('postcss-pxtorem')
const baseConfig = require('./webpack.base')
const commonPath = require('./paths')

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
  entry: { servers: commonPath.serverEntryPath },
  output: {
    path: `${commonPath.outputPath}/node`,
    publicPath: `/node`,
    filename: '[name].[hash].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[name].[chunkhash].js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  externals: ['@loadable/component', nodeExternals()],
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          moduleCSSLoader,
          modulePostCssLoader,
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    new LoadablePlugin(),
    new MiniCssExtractPlugin()
  ]
})