/*jshint globalstrict: true*/
/*global require*/

'use strict'

const gulp = require('gulp')
const connect = require('gulp-connect')
const less = require('gulp-less')
const jdists = require('gulp-jdists')
const uglify = require('gulp-uglify')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const rename = require("gulp-rename")
const replace = require('gulp-replace')

gulp.task('connect', function() {
  connect.server({
    port: 2017,
    livereload: true
  })
})

gulp.task('watch', function() {
  gulp.watch(['./*.html', './css/*.less'], ['build', 'reload'])
})

gulp.task('reload', function() {
  connect.reload()
})

gulp.task('injection', function() {
  gulp
    .src('./injection.jdists.js')
    .pipe(jdists())
    .pipe(uglify())
    .pipe(rename('injection.js'))
    .pipe(replace(/^!function/g, 'void function'))
    .pipe(gulp.dest('./'))
})

gulp.task('readme', function() {
  gulp
    .src('./README.jdists.md')
    .pipe(jdists({
      clean: false
    }))
    .pipe(rename('README.md'))
    .pipe(gulp.dest('./'))
})

gulp.task('dist', ['injection', 'readme'])

gulp.task('build', function() {
  gulp.src('./css/*.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./css'))
})

gulp.task('default', ['build', 'connect', 'watch'])