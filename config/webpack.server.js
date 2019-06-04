const nodeExternals = require('webpack-node-externals')
const webpackMerge = require('webpack-merge')

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

module.exports = webpackMerge(baseConfig, {
  entry: commonPath.serverEntryPath,
  output: {
    path: `${commonPath.outputPath}`,
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    publicPath: '/'
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          'node-style-loader',
          moduleCSSLoader,
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: []
})