var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
module.exports = {
    devtool: false,
    entry: {
        app:'./index'
    },
    output: {
        path: __dirname+'/static/scripts/',
        filename: 'bundle_[hash].js',
        chunkFilename: '[id].chunk_[hash].js',
        publicPath: '/static/scripts/'
    },
    plugins: [
        new CleanPlugin(['./static/scripts','./static/index.html']),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new HtmlWebpackPlugin({
            title: '琥珀金服',
            template: './index_template.html',
            filename: '../index.html',
            favicon: ''
        }),
        //new webpack.optimize.CommonsChunkPlugin('shared.js')
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
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
            'utils':path.join(__dirname, '/', 'utils'),
            'containers':path.join(__dirname, '/', 'containers')
        }
    },
    context: __dirname,
    node: {
        __dirname: true
    }
}
