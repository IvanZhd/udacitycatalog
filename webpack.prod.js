const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production', // "development" the bundle is not minified; "production" is minified
    devtool: 'source-map'
});