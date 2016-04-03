var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var dirname = path.resolve(__dirname, '..');

module.exports = {
  devtool: 'eval',
  entry:  dirname + '/src/client/main.js',
  output: {
    path: dirname + '/build',
    filename: '[name]-[hash].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_componetns)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin('style', '!css?modules!postcss'),
      },
    ],
  },
  postcss: [
    require('autoprefixer'),
  ],
  plugins: process.env.NODE_ENV === 'production' ? [
    new HtmlWebpackPlugin({
      template: dirname + '/src/client/index.html',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin('[name]-[hash].css'),
  ] : [],
};
