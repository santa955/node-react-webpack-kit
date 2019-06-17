const path = require('path')
const nodeExternals = require('webpack-node-externals')
const LoadablePlugin = require('@loadable/webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const production = process.env.NODE_ENV === 'production'
const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
const DIST_PATH = path.resolve(__dirname, '../dist')
const getEntry = target => {
  return target === 'node'
    ? path.resolve(__dirname, '../src/app/index.js')
    : path.resolve(__dirname, '../src/index.js')
}

const getConfig = target => ({
  name: target,
  mode: development ? 'development' : 'production',
  target,
  entry: getEntry(target),
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
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 2,
              localIdentName: '[local]_[hash:base64:5]'
            }
          },
          'stylus-loader'
        ],
      },
    ],
  },
  externals: target === 'node' ? ['@loadable/component', nodeExternals()] : undefined,
  output: {
    path: path.join(DIST_PATH, target),
    filename: production ? '[name]-bundle-[chunkhash:8].js' : '[name].js',
    publicPath: `/${target}/`,
    libraryTarget: target === 'node' ? 'commonjs2' : undefined,
  },
  plugins: [new LoadablePlugin(), new MiniCssExtractPlugin()],
})

export default [getConfig('web'), getConfig('node')]