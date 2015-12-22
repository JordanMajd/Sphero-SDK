'use strict';

var gulp = require('gulp');
var concat = require("gulp-concat");
var markdox = require("gulp-markdox");
var del = require('del');

var paths = {
  javascript: 'lib/**/*.js',
  documentation: 'doc',
  distribution: 'dist'
};

// clean documenation then build documentation for all js
gulp.task("docs",['clean-docs'], function(){
  return gulp.src(paths.javascript)
    .pipe(markdox())
    .pipe(concat("doc.md"))
    .pipe(gulp.dest(paths.documentation));
});

// delete existing documentation
gulp.task('clean-docs', function(){
  return del(paths.documentation);
});

// clean current build and then build all js
gulp.task('build', ['clean'], function(){
  return gulp.src(paths.javascript)
    .pipe(gulp.dest(paths.distribution));
});

// delete existing build
gulp.task('clean', function(){
  return del(paths.distribution);
});

gulp.task('default', ['build']);
