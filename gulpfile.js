'use strict';

var gulp = require('gulp');
var concat = require("gulp-concat");
var markdox = require("gulp-markdox");

var paths = {
  javascript: 'lib/**/*.js',
  documentation: 'doc'
};

// build documentation for all js in ./lib dir
gulp.task("doc", function(){
  gulp.del(paths.documentation);
  gulp.src(paths.javascript)
    .pipe(markdox())
    .pipe(concat("doc.md"))
    .pipe(gulp.dest(paths.documentation));
});
