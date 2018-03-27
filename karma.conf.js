/* eslint-env node */
// Karma configuration
// Generated on Fri May 16 2014 10:44:21 GMT-0400 (EDT)

var webpackConfig = require('./webpack.config.js');
var reporters = ['mocha'];

delete webpackConfig.entry;
delete webpackConfig.output;

if (process.env.COVERAGE) {
  reporters.push('coverage');
}

module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      './node_modules/jquery/dist/jquery.js',
      './node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      './node_modules/jasmine-fixture/dist/jasmine-fixture.js',
      'test/specs/**/*.js',
    ],

    proxies: {
      '/img/': 'http://localhost:9876/base/public/img/',
    },

    preprocessors: {
      'test/specs/**/*.js': ['webpack'],
    },

    coverageReporter: {
      reporters: [
        {
          type: 'text-summary',
        },
      ],
    },

    reporters,

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true,
    },

    mochaReporter: {
      ignoreSkipped: true,
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['ChromeHeadless'],

    singleRun: false,
  });
};
