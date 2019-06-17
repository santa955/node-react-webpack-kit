const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const LoadablePlugin = require('@loadable/webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const pxtorem = require('postcss-pxtorem')

const commonPath = require('../paths')

const getEntry = target => {
  return target === 'node'
    ? commonPath.serverEntryPath
    : commonPath.entryPath
}

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

const getConfig = target => ({
  name: target,
  mode: 'development',
  target,
  entry: {
    app: getEntry(target)
  },
  output: {
    path: path.join(commonPath.outputPath, target),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: `/${target}`,
    libraryTarget: target === 'node' ? 'commonjs2' : undefined,
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            caller: { target },
          },
        },
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          moduleCSSLoader,
          modulePostCssLoader,
          'stylus-loader'
        ],
      },
    ],
  },
  externals: target === 'node' ? ['@loadable/component', nodeExternals()] : undefined,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new LoadablePlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[name].[chunkhash].css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        USE_SSR: JSON.stringify(true)
      }
    })
  ]
})

export default [getConfig('web'), getConfig('node')]