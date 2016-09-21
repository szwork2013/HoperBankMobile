var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './index'
  ],
  output: {
    path: __dirname+'/static/',
    filename: 'bundle.js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      }
    ]
  },
  context: __dirname,
  node: {
    __dirname: true
  }
}
