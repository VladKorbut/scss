'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var jade = require('gulp-jade');

var src = {
  jade: './src/*.jade',
  scss:  {
    styles:'./src/scss/styles.scss',
    all:'./src/sass/**/*.scss',
  },
  fonts: './src/fonts/**/*.*',
  img:  './src/img/**/*.*',
}

var dist = {
  html: './dist/',
  css:  './dist/css/',
  fonts: './dist/fonts',
  img:  './dist/img',
}
 
gulp.task('jade', function(){
  gulp.src(src.jade)
    .pipe(jade())
    .pipe(gulp.dest(dist.html))
});

gulp.task('scss', function () {
  return gulp.src(src.scss.styles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))    
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist.css));
});

gulp.task('img', function() {
    gulp.src(src.img)
        .pipe(gulp.dest(dist.img))
});

gulp.task('fonts', function() {
    gulp.src(src.fonts)
        .pipe(gulp.dest(dist.fonts))
});

gulp.task('scss:watch', function () {
  gulp.watch(src.scss.all, ['scss']);
});

gulp.task('jade:watch', function(){
  gulp.watch(src.jade,['jade']);
});

gulp.task('img:watch', function () {
  gulp.watch(src.img, ['img']);
});

gulp.task('fonts:watch', function(){
  gulp.watch(src.fonts,['fonts']);
});

gulp.task('build', ['scss', 'jade', 'img', 'fonts']);

gulp.task('watch', ['scss:watch', 'jade:watch', 'img:watch', 'fonts:watch']);

gulp.task('webserver', function() {
  gulp.src(dist.html)
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('default', ['build', 'watch', 'webserver']);