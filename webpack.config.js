/* eslint-env node */
var path = require('path');
var Notifier = require('webpack-notifier');
var hgn = require('hgn-loader');
hgn.prefix = 'src/templates/';

var demoPath = path.join(__dirname, 'demo');

module.exports = {
  name: 'demo',
  entry: demoPath + '/index.js',
  output: {
    path: path.join(demoPath, 'public'),
    filename: 'index.js',
  },
  resolve: {
    alias: {
      templates: __dirname + '/src/templates',
      fineuploader: 'fine-uploader/dist',
    },
    extensions: ['.js', '.mustache', '.css', '.scss'],
    modules: [
      path.join(__dirname, 'src', 'js'),
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /(\.js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /(fine-uploader|guillotine).*\.js$/,
        loader: 'imports-loader?jQuery=jquery',
      },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=25000' },
      {
        enforce: 'pre',
        test: /src\/js\/.*\.js$/,
        loader: 'eslint-loader',
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new Notifier({ title: 'Helicropter' }),
  ],
};
