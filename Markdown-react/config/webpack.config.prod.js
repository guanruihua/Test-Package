const path = require('path');
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const publicPath = '/ServiceStatus/';

const prodConfig = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath,
    filename: '[name].[fullhash].js',
    assetModuleFilename: 'asset/[name].[contenthash:8].[ext]',
  },
  optimization: {
    minimize: true,
    // minimizer: [
    //   // new CssMinimizerPlugin()
    // ],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  }

}

module.exports = webpackMerge.merge(baseConfig, prodConfig)