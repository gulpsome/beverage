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
        },
        sourcegate: [],
        sourcegateRx: {
          jshint: {node: true},
          eslint: {
            parser: 'babel-eslint',
            env: {node: true}
          }
        },
        sourcegateModule: 'hal-rc', // could be any git repo too
        sourcegatePrefix: '.',
        sourcegateWatch: true,
        sourcegateMany: false
      }, opts || {})

      if(o.scripts.include && o.scripts.include[o.build])
        o = merge({}, o, {scripts: {require: [o.build]}})

      return o
    }

module.exports = function (gulpIn, opts) {
  var o = def(opts),
      gulp

  if (opts.scripts) gulp = require('gulp-npm-run')(gulpIn, o.scripts)
  else gulp = require('gulp-help')(gulpIn)

  if (opts.test) {
    // TODO: ideally, this would check the caller's package.json
    // ... for presence of a "test" script
    var test = require('gulp-npm-test')(gulp, o.test)

    if (opts.testWatch) {
      gulp.task('test:watch', o.testWatch.toString(), function() {
        require('gulp-watch')(o.testWatch, test)
      })
    }
  }

  if (o.buildWatch && opts.scripts) {
    gulp.task('build:watch', o.buildWatch.toString(), function(){
      gulp.watch(o.buildWatch, [o.build])
    })
  }

  if (o.sourcegate.length) require('hal-rc')(o, gulp)

  return gulp
}
