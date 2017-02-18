var path                       = require('path');
var ExtractTextPlugin          = require('extract-text-webpack-plugin');
var BrowserSyncPlugin          = require('browser-sync-webpack-plugin');  
var WebpackBuildNotifierPlugin = require('webpack-build-notifier'); 
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('style.css');

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/js/app.js'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'build.js'
    },
    module: {
        loaders: [
            { 
                test: /\.scss$/,
                loader: extractCSS.extract("style-loader", "css-loader!sass-loader")
            },
            {
                test: /\.js$/,
                loaders: [ 'babel' ],
                exclude: /node_modules/,
                include: __dirname
            },
            { 
                test: /\.jpg|png$/,
                loader: "file?name=[name].[ext]"
            },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?mimetype=image/svg+xml' },
            { test: /\.woff(\d+)?(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?mimetype=application/font-woff' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?mimetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?mimetype=application/font-woff' }
        ]
    },
    plugins: [
        new WebpackBuildNotifierPlugin(),
        extractCSS,
        new ExtractTextPlugin('[name].css'),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: [''] },
            files: [
                './src/*',
            ]
        })
    ]
};