console.log('use webpack.dev.test.config')
var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
module.exports = {
    devtool: 'cheap-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './index',
    ],
    output: {
        path: __dirname+'/static/scripts/',
        filename: 'bundle.js',
        chunkFilename: '[id].chunk_[hash].js',
        publicPath: '/static/scripts/'
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        //new webpack.optimize.CommonsChunkPlugin('shared.js')
        new webpack.BannerPlugin('This file is created by SLEBEE'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('dev')
        }),
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
            },
            //下面这个是设置当图片大于150kb时转化成Base64格式的loader
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=15000'
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
    },
    devServer: {
        historyApiFallback:true,
        hot:true,
        inline:true,
        progress:true,
        //其实很简单的，只要配置这个参数就可以了
        proxy: {
            '/api/*': {
                target: 'http://localhost:5000',
                secure: false
            }
        }
    }
}
