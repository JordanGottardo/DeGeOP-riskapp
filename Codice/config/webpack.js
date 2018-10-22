const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const loaderConfig = require('./webpack.loader');

const config = {
  context: path.resolve(__dirname, '../source'),
  entry: './index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css']
  },
  devtool: 'source-map',
  module: {
    loaders: loaderConfig
  },
  output: {
    path: path.resolve(__dirname, '../distribution/'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, '../distribution/'),
    compress: true,
    port: 8080
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'TodoList',
    template: path.resolve(__dirname, '../source/index.ejs')
  })]
};

module.exports = config;
