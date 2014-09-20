var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var jade = require('gulp-jade');
var Imagemin = require('imagemin');
/*var util = require('gulp-util');
var gm = require('gulp-gm');
var imageResize = require('gulp-image-resize');
var rename = require('gulp-rename');*/

gulp.task('css', function() {
  return gulp.src('scss/*.scss')
    .pipe(watch())
    .pipe(sass())
    .pipe(gulp.dest('../build/css'));
});

gulp.task('js', function() {
  return gulp.src('coffeescript/*.coffee')
    .pipe(watch())
    .pipe(coffee({bare: true}))
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

gulp.task('img', function () {
  /*return gulp.src('img/*.{gif,jpg,png,svg}')
    .pipe(watch())
    //.pipe(gm(function (gmfile) { return gmfile.resize(100, 100); }))
    .pipe(imageResize({ format: 'jpeg', width: 100, height:100 }))
    //.pipe(rename(function (path) { path.basename += "-thumb"; }))
    .pipe(gulp.dest('../build/img'));*/
  var imagemin = new Imagemin()
    .src('img/*.{gif,jpg,png,svg}')
    .dest('../build/img')
    .use(Imagemin.jpegtran({ progressive: true }));
  imagemin.run(function(err, files) {
    if(err) throw err;
  });
});

gulp.task('all', ['css','js','html','img'], function() {
});
gulp.task('default', ['css','js','html'], function() {
});
