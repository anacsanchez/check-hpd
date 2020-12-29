const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const webpack = require('webpack');
const entryPath = path.join(__dirname, 'app', 'index.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  // output: {
  //   publicPath: ''
  // },
  //devServer: {
  //  contentBase: path.resolve(__dirname, 'app'),
    //hot: true,
    // proxy: {
    //   '/api': 'http://localhost:3050'
    // }
  //},
  entry: [
    'webpack-hot-middleware/client',
    entryPath
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
