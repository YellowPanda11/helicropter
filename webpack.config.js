/* eslint-env node */
const path = require('path');
const Notifier = require('webpack-notifier');
const hgn = require('@behance/hgn-loader');
hgn.prefix = 'src/templates/';

const demoPath = path.join(__dirname, 'demo');

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
    },
    extensions: ['.js', '.mustache', '.css', '.scss'],
    modules: [
      path.join(__dirname, 'src', 'js'),
      'node_modules',
    ],
  },
  resolveLoader: {
    alias: {
      'hgn-loader': '@behance/hgn-loader',
    },
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
  mode: 'development',
};
