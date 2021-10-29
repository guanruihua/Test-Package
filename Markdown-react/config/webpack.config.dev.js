const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const proxyConfig = require('./proxy.config')
const path = require('path')
const apiMocker = require('webpack-api-mocker');

const devServer = {
  port: 3456,
  host: 'localhost',
  watchContentBase: true,
  // publicPath: '/',
  inline: true,
  stats: 'errors-only',
  historyApiFallback: true,
  hot: true,
  contentBase: path.join(__dirname, '../public'),
  compress: true,
  clientLogLevel: 'warning',
  headers: { 'Access-Control-Allow-Origin': '*' },
  // open: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  proxy: proxyConfig,
  // before(app) {
  //   apiMocker(app, path.resolve('mock/index.js'), {
  //     proxy: {
  //       '/apiMock/': 'http://127.0.0.1:3000'
  //     }
  //   })
  // }
}

const devConfig = {
  mode: 'development',
  devServer: devServer,
  devtool: 'source-map'
}

module.exports = webpackMerge.merge(baseConfig, devConfig)


