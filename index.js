'use strict'

var merge = require('lodash.merge'),
    def = function (opts) {
      var o = merge({}, {
        build: 'build',
        scripts: {
          exclude: ['test'],
          requireStrict: true
        },
        test: {
          testsRe: /\.spec\.coffee$/,
        }
      }, opts || {})

      if(o.scripts.include && o.scripts.include[o.build])
        o = merge({}, o, {scripts: {require: [o.build]}})

      return o
    }

module.exports = function (gulpIn, opts) {
  var o = def(opts)
  var gulp = require('gulp-npm-run')(gulpIn, o.scripts)

  // modify 'test'; reuse test fn for gulp test:watch
  var test = require('gulp-npm-test')(gulp, o.test)

  gulp.task('test:watch', o.testWatch.toString(), function() {
    require('gulp-watch')(o.testWatch, test)
  })

  gulp.task('build:watch', o.buildWatch.toString(), function(){
    gulp.watch(o.buildWatch, [o.build])
  })

  return gulp
}
