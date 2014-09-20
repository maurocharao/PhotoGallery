// npm install --save-dev chalk
// npm install --save-dev deprecated
// npm install --save-dev minimist
// npm install --save-dev orchestrator
// npm install --save-dev vinyl-fs
// npm install --save-dev gulp-sass
// npm install --save-dev coffee-script
// npm install --save-dev gulp-coffee
// npm install --save-dev gulp-jade
var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var jade = require('gulp-jade');

gulp.task('css', function() {
  return gulp.src('scss/*.scss')
    .pipe(watch())
    .pipe(sass())
    .pipe(gulp.dest('../build/css'));
});

gulp.task('js', function() {
  return gulp.src('coffeescript/*.coffee')
    .pipe(watch())
    .pipe(coffee())
    .pipe(gulp.dest('../build/javascript'));
});

gulp.task('html', function() {
  return gulp.src('jade/*.jade')
    .pipe(watch())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('../build/html'));
});

gulp.task('default', ['css','js','html'], function() {
});
