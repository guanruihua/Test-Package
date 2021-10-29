const path = require('path');
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')

module.exports = {

  entry: {
    app: './src/index.tsx',
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[fullhash].js',
  },
  resolve: {
    alias: {
      "@": path.resolve('src')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.d.ts'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ProgressBarWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.PROJECT_ENV": JSON.stringify(process.env.PROJECT_ENV)
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[fullhash].css',
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|en/),
  ],
  module: {
    rules: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(ts|tsx)$/, loader: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                modifyVars: {
                  // 'primary-color': '#52c41a',
                  // 'link-color': '#52c41a',
                  // 'border-radius-base': '2px',
                },
                javascriptEnabled: true,
              },
            },
          }]
      },

      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|otf|ico)$/i,
        type: "asset/resource",
        exclude: /node_modules/
      },
    ],
  },
  cache: {
    type: 'filesystem',
    // 可选配置
    buildDependencies: {
      config: [__filename],
    },
    name: 'development-cache',
  },

}

