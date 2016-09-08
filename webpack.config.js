/* eslint-env node */
var path = require('path');
var Notifier = require('webpack-notifier');
var hgn = require('hgn-loader');
hgn.prefix = 'src/templates/';

var commonLoaders = [
  {
    test: /(\.js)$/,
    exclude: /node_modules/,
    loader: 'babel'
  },
  {
    test: /(fine-uploader|guillotine).*\.js$/,
    loader: 'imports?jQuery=jquery'
  },
  { test: /\.(png|jpg|gif)$/, loader: 'url?limit=25000' }
];

var demoPath = path.join(__dirname, 'demo');

module.exports = {
  name: 'demo',
  entry: demoPath + '/index.js',
  output: {
    path: path.join(demoPath, 'public'),
    filename: 'index.js'
  },
  resolve: {
    root: path.join(__dirname, 'src', 'js'),
    alias: {
      templates: __dirname + '/src/templates',
      fineuploader: 'fine-uploader/dist'
    },
    extensions: ['', '.js', '.mustache', '.css', '.scss'],
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: commonLoaders,
    preLoaders: [{
      test: /src\/js\/.*\.js$/,
      loader: 'eslint-loader'
    }]
  },
  devtool: 'inline-source-map',
  plugins: [
    new Notifier({ title: 'Helicropter' })
  ]
};
