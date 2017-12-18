const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const webpack = require('webpack')

const config = {
    entry: {
        app: [
            path.join(__dirname,  'src', 'index.jsx')
        ],
    },
    output: {
        path: path.join(__dirname, 'docs'),
        filename: '[name].[hash].js',
        publicPath: '/',
        chunkFilename: '[name][chunkhash].js',
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
            { test: /\.jsx$/, exclude: /node_modules/, loaders: ['babel-loader'] },
            {
                test: /\.sass$/,
                loader: 'style-loader!css-loader?module&localIdentName=[hash:base64:5]!sass-loader?indentedSyntax&outputStyle=expdanted',
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'Pomodoro',
            template: 'src/templates/index.ejs',
            hash: false,
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
}


config.devServer = {
    host: '0.0.0.0',
    disableHostCheck: true,
    contentBase: 'build',
    port: 3000,
    historyApiFallback: true,
    hot: false,
    inline: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
}

module.exports = config