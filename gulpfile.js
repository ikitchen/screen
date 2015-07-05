var gulp = require('gulp');
var rename = require("gulp-rename");
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var webpack = require('webpack');
var sftp = require('gulp-sftp');
var sftpConf = require('./sftp.conf.json');



gulp.task('prod', ['backend', 'frontend']);

gulp.task('backend', ['backend.es6', 'backend.copy', 'backend.config']);
gulp.task('frontend', ['frontend.webpack']);


gulp.task('deploy', function() {
  return gulp.src('dist/*')
    .pipe(sftp(sftpConf));
});

gulp.task('backend.copy', function() {
  return gulp.src(['server/**/*.{yaml,jade}', 'package.json'])
    .pipe(gulp.dest('dist'));
});

gulp.task('backend.config', function() {
  return gulp.src('server/server-conf-prod.js')
    .pipe(rename('server-conf.js'))
    .pipe(gulp.dest('server'));
});

gulp.task('backend.es6', function() {
  return gulp.src('server/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('frontend.webpack', function(callback) {
  webpack({
    context: __dirname,
    entry: './app.js',
    output: {
      path: 'dist/public',
      filename: 'app.js',
    },
    module: {
      loaders: [{
          test: /\.js$/,
          exclude: /node_modules\/react/,
          loader: 'babel-loader',
        }
        // { test: /\.less$/, loader: 'style!css!less' },
        // { test: /\.png$/, loader: 'file?prefix=img/' }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
    ],
  }, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      // output options
    }));
    callback();
  });
});