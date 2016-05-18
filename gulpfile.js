'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const markdox = require('gulp-markdox');
const del = require('del');

const paths = {
  javascript: 'lib/**/*.js',
  source: 'lib/**/*',
  documentation: 'doc'
};

// clean documenation then build documentation for all js
gulp.task('build-docs', ['clean-docs'], () => {
  return gulp.src(paths.javascript)
    .pipe(markdox())
    .pipe(concat('doc.md'))
    .pipe(gulp.dest(paths.documentation));
});

// delete existing documentation
gulp.task('clean-docs', () => {
  return del(paths.documentation);
});


// default clean then build
gulp.task('default', ['build-docs']);
