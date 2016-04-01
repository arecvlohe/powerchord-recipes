var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry:  __dirname + '/src/client/main.js',
  output: {
    path: __dirname + '/build',
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
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/client/index.tmpl.html',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('[name]-[hash].css'),
  ],
};
