const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const LoadablePlugin = require('@loadable/webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const BabelMinifyPlugin = require('babel-minify-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const autoprefixer = require('autoprefixer')

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
      autoprefixer({
        remove: false,
        flexbox: 'no-2009',
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9',
        ],
      }),
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
    publicPath: `/${target}/`,
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
    new ProgressBarPlugin(),
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
    }),
    new BabelMinifyPlugin(),
  ],
  optimization: {
    minimize: true,
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

        // 将所有的样式文件打包到单个项目
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
})
module.exports = [getConfig('web'), getConfig('node')]