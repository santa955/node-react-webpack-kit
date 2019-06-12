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
  mode: 'production',
  entry: commonPath.serverEntryPath,
  output: {
    path: `${commonPath.outputPath}`,
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    publicPath: '/'
  },
  target: 'node',
  externals: [nodeExternals()],
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
        options: {
          babelrc: false,
          "presets": [
            [
              "@babel/preset-env",
              {
                "targets": {
                  "esmodules": true
                }
              }
            ],
            "@babel/preset-react"
          ],
          "plugins": [
            "dynamic-import-node",
            "react-loadable/babel",
            "@babel/plugin-transform-runtime",
            "react-hot-loader/babel",
            // Stage 2 https://github.com/babel/babel/tree/master/packages/babel-preset-stage-2
            [
              "@babel/plugin-proposal-decorators",
              {
                "legacy": true
              }
            ],
            "@babel/plugin-proposal-function-sent",
            "@babel/plugin-proposal-export-namespace-from",
            "@babel/plugin-proposal-numeric-separator",
            "@babel/plugin-proposal-throw-expressions",
            // Stage 3
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-syntax-import-meta",
            [
              "@babel/plugin-proposal-class-properties",
              {
                "loose": true
              }
            ],
            "@babel/plugin-proposal-json-strings"
          ]
        }
      },
      {
        test: /\.styl$/,
        use: [
          'node-style-loader',
          moduleCSSLoader,
          'stylus-loader'
        ]
      }
    ]
  }
})