const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development', // "development" the bundle is not minified; "production" is minified
    devtool: 'inline-source-map', // include sourse map into bundle
    devServer: {
        contentBase: './dist',
        hot: false
    }
});