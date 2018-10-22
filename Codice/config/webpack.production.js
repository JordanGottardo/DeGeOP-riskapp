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
    path: path.resolve(__dirname, '../../'),
    filename: 'akane.js'
  }
};

module.exports = config;
