var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: false,
  entry: {
      app:'./index'
  },
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
  resolve: {
    alias: {
      'actions': path.join(__dirname, '/', 'actions'),
      'IconButton':path.join(__dirname, '/', 'components/IconButton'),
      'RootLoading':path.join(__dirname, '/', 'components/RootLoading'),
      'components':path.join(__dirname, '/', 'components'),
      'react-progressbar':path.join(__dirname, '/', 'static/lib/react-progressbar'),
      'componentConfig':path.join(__dirname, '/', 'containers/componentConfig'),
        'utils':path.join(__dirname, '/', 'utils')

    }
  },
  context: __dirname,
  node: {
    __dirname: true
  }
}
