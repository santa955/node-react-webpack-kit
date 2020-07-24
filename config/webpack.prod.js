const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge: webpackMerge } = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const BabelMinifyPlugin = require('babel-minify-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const baseConfig = require('./webpack.base')
const commonPaths = require('./paths')

const plugins = []
const isAnalyze = typeof process.env.BUNDLE_ANALYZE !== 'undefined'

if (isAnalyze) plugins.push(new BundleAnalyzerPlugin())

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

const modulePostCssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        remove: false,
        flexbox: 'no-2009'
      }),
    ],
  },
}

module.exports = webpackMerge(baseConfig, {
  mode: 'production',
  output: {
    filename: `js/[name].[hash].js`,
    path: commonPaths.outputPath,
    chunkFilename: 'js/[name].[chunkhash].js',
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/,
        exclude: /antdTheme/,
        use: [
          MiniCssExtractPlugin.loader,
          moduleCSSLoader,
          modulePostCssLoader,
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
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
    ...plugins,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `${commonPaths.cssFolder}/[name].[hash].css`,
      chunkFilename: `${commonPaths.cssFolder}/[name].[chunkhash].css`,
    }),
    new BabelMinifyPlugin(),
    new HtmlWebpackPlugin({
      template: commonPaths.templatePath,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
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