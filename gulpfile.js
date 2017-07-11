'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var pug = require('gulp-pug');

var src = {
  pug: './src/*.pug',
  scss:  {
    styles:'./src/scss/styles.scss',
    all:'./src/scss/**/*.scss',
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
 
gulp.task('pug', function(){
  gulp.src(src.pug)
    .pipe(pug())
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

gulp.task('build', ['pug', 'scss', 'img', 'fonts']);

gulp.task('watch', function(){
  gulp.watch(src.pug,['pug']);
  gulp.watch(src.scss.all, ['scss']);
  gulp.watch(src.img, ['img']);
  gulp.watch(src.fonts,['fonts']);
});

gulp.task('webserver', function() {
  gulp.src(dist.html)
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('default', [ 'watch', 'webserver']);