var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var dirname = path.resolve(__dirname, '..');

module.exports = {
  devtool: 'eval-source-map',
  entry:  dirname + '/src/client/main.js',
  output: {
    path: dirname + '/build',
    filename: 'bundle.js',
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
        loader: 'style!css?modules!postcss',
      },
    ],
  },
  postcss: [
    require('autoprefixer'),
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: dirname + '/src/client/index.tmpl.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot: true,
  },
};
