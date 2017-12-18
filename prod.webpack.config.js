const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const config = require("./webpack.config.js")

config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': JSON.stringify('production')
    }
}))

config.plugins.push(new UglifyJsPlugin())


module.exports = config