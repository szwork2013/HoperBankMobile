var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')

var config = process.env.NODE_ENV === "prod" ? require('./webpack.dev.prod.config') : require('./webpack.dev.test.config')
var express = require('express');
var app = express();
var port = 3000
var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))
app.use('/static', express.static(__dirname + '/static'));
app.use(function(req, res) {
  res.sendFile(__dirname + '/index.html')
})
app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
