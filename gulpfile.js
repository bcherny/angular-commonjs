/*
  see https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md
 */

var browserify = require('browserify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    notifier = require('node-notifier'),
    util = require('gulp-util'),
    karma = require('karma').server

gulp.task('browserify-src', function () {

  var bundler = browserify({
    entries: ['./src/index.js']
  })

  var bundle = function() {
    return bundler
      .bundle()
      .on('error', error)
      .pipe(source('index.js'))
      .pipe(buffer())
      .pipe(gulp.dest('./dist/'))
  }

  return bundle()

})

gulp.task('browserify-tests', function () {

  var bundler = browserify({
    entries: ['./test/test.js', './test/add.js']
  })

  var bundle = function() {
    return bundler
      .bundle()
      .on('error', error)
      .pipe(source('test.js'))
      .pipe(buffer())
      .pipe(gulp.dest('./dist/'))
  }

  return bundle()

})

gulp.task('test', ['browserify-src', 'browserify-tests'], function (done) {

  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function() {
    done()
  })

})

gulp.task('default', ['browserify-src'])

gulp.task('watch', function () {

  gulp.watch('src/*.js', ['browserify-src'])

})

function error (err, prefix) {
  notifier.notify({ message: 'Browserify error: ' + err.message })
  util.log(util.colors.red.bold(prefix || 'Error'), err.message)
  this.end()
}