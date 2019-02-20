const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js',
    polyfills: './src/polyfills.js',
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: require.resolve(path.resolve(__dirname, 'src/index.js')),
        use: 'imports-loader?this=>window'
      },
      {
        test: require.resolve(path.resolve(__dirname, 'src/globals.js')),
        use: 'exports-loader?file,parse=helpers.parse'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Progressive Web Application',
      template: './src/index.html'
    }),
    // new webpack.HotModuleReplacementPlugin()
    new webpack.NamedModulesPlugin(), // use the path to the module rather than a numerical identifier
    new webpack.HashedModuleIdsPlugin(), // some improvements with hash
    new webpack.ProvidePlugin({
      join: ['lodash', 'join']
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast 
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/'
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};