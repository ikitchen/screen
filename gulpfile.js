var fs = require('fs');
var path = require('path');
var moment = require('moment');
var gulp = require('gulp');
var rename = require("gulp-rename");
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var webpack = require('webpack');
var sftpConf = require('./sftp.conf.json');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');
var shell = require('gulp-shell');
var install = require('gulp-install');
var packageJson = require('./package.json');

var $ = {
  appVersion: packageJson.version,
  appName: 'screen',
  packageFolder: 'package',
  sshConf: {
    username: sftpConf.user,
    host: sftpConf.host,
    port: sftpConf.port || 22,
    privateKey: getSshPrivateKey(),
  },
  deployFolder: sftpConf.remotePath,
};
$.tarballName = tarballName();
$.packagePath = getPackagePath();
$.packageName = path.basename($.packagePath);
$.deployPath = path.join($.deployFolder, $.packageName);

gulp.task('deploy', function() {
  return gulp.src('')
    .pipe(shell('./deploy.sh', {
      env: {
        PORT: $.sshConf.port,
        SERVER: $.sshConf.username + '@' + $.sshConf.host,
        REMOTE_FOLDER: $.deployFolder,
        LOCAL_PACKAGE: $.packagePath,
        REMOTE_PACKAGE: $.deployPath,
        PACKAGE_NAME: $.packageName,
      }
    }));
});

gulp.task('pack', ['backend', 'frontend'], function() {
  return gulp.src('dist/**/*')
    .pipe(tar($.tarballName))
    .pipe(gzip())
    .pipe(gulp.dest('package'));
});

gulp.task('backend', ['backend.es6', 'backend.config']);
gulp.task('frontend', ['frontend.webpack']);


gulp.task('backend.copy', function() {
  return gulp.src(['server/**/*.{yaml,jade}', 'package.json'])
    .pipe(gulp.dest('dist'))
    .pipe(install({
      production: true
    }));
});

gulp.task('backend.config', ['backend.copy'], function() {
  return gulp.src('server/server-conf-prod.js')
    .pipe(rename('server-conf.js'))
    .pipe(gulp.dest('dist'));
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

function tarballName() {
  // return $.appName + '-' + moment().format('YYYY-MM-DD_HH-mm-ss') + '.tar';
  return $.appName + '-' + $.appVersion + '.tar';
}

function getPackagePath() {
  return path.join($.packageFolder, $.tarballName + '.gz');
}

function getSshPrivateKey() {
  var keyFile = sftpConf.privateKey || path.join(process.env.HOME, '.ssh/id_rsa');
  return fs.readFileSync(keyFile);
}