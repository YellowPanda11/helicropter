var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');

var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

var webpackInst = webpack(webpackConfig);
gulp.task('webpack', function(cb) {
  webpackInst.run(function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({
      colors: true,
      version: false,
      chunks: false,
      chunkModules: false,
    }));

    cb();
  });
});

gulp.task('watch', ['webpack'], function() {
  livereload.listen();

  watch(['demo/index.js', 'src/js/**/*', 'src/templates/**/*'], function() { gulp.start('webpack'); });
  gulp.watch(['dist/**/*']).on('change', livereload.changed);
});
