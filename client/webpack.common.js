const path = require('path');

module.exports = {
  // entry: [path.join(__dirname, 'app', 'index.js')],
  context: __dirname,
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',
    //hotUpdateChunkFilename: 'hot/hot-update.js',
    //hotUpdateMainFilename: 'hot/hot-update.json'
    //publicPath: path.join(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      }
    ]
  }
};
