const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  entry: path.join(__dirname, 'app', 'index.js'),
});
