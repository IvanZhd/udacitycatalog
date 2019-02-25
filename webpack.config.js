const path = require('path');
const webpack = require('webpack');

// Third party plugins.
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Development asset host, asset location and build output path.
const publicHost = 'http://localhost:2992';
const rootAssetPath = './assets';
const buildOutputPath = './build/public';

module.exports = {
    entry: {
        // Chunks (files) that will get written out for JS and CSS files.
        app_js: [
            'webpack/hot/dev-server',
            rootAssetPath + '/scripts/index'
        ],
        app_css: [
            rootAssetPath + '/styles/app.scss'
        ]
    },
    output: {
        // Where and how will the files be formatted when they are output.
        path: buildOutputPath,
        publicPath: publicHost + '/assets/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].js'
    },
    resolve: {
        // Avoid having to require files with an extension if they are here.
        extensions: ['', '.js', '.jsx', '.css']
    },
    module: {
        // Various loaders to pre-process files of specific types.
        // If you wanted to SASS for example, you'd want to install this:
        //   https://github.com/jtangelder/sass-loader
        loaders: [{
                test: /\.jsx$/i,
                loaders: ['react-hot-loader', 'babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.scss$/,
                loaders: [
                    'file-loader?name=css/[name].blocks.css',
                    'extract-loader',
                    'css-loader?-url',
                    'postcss-loader',
                    'sass-loader'
                    // 'sass-resources-loader?resources=./node_modules/bootstrap/scss/**/*.scss&./assets/styles/config/**/*.scss',
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg([\?]?.*))$/i,
                loaders: [
                    'file-loader?context=' + rootAssetPath + '&name=[path][name].[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?name=[path][name].[ext]'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(buildOutputPath),
        // Stop modules with syntax errors from being emitted.
        new webpack.NoErrorsPlugin(),
        // Ensure CSS chunks get written to their own file.
        new ExtractTextPlugin('[name].[hash].css'),
        // Create the manifest file that Flask and other frameworks use.
        new ManifestRevisionPlugin(path.join('build', 'manifest.json'), {
            rootAssetPath: rootAssetPath,
            ignorePaths: ['/styles', '/scripts', '/fonts']
        })
    ]
};