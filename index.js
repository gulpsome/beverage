'use strict'

var path = require('path')
var merge = require('lodash.merge')
var sourcegate = require('sourcegate')

var beverageGet = function(beveragePath) {
  return sourcegate([path.normalize(beveragePath + '/.beverage')])
}


var def = function(opts) {
    opts = opts || {}
    opts.dotBeverage = opts.dotBeverage || '.'

    var o = merge({}, {
      build: 'build',
      scripts: {
        exclude: ['test'],
        requireStrict: true
      },
      test: {
        testsRe: /\.spec\.coffee$/
      },
      sourcegate: [],
      sourcegateModule: 'hal-rc', // could be any git repo as well
      sourcegatePrefix: 'rc/', // these would override any sourcegatePreset
      sourcegateRx: {
        jshint: {node: true},
        eslint: {
          parser: 'babel-eslint',
          env: {node: true}
        }
      },
      sourcegateWatch: true
    }, beverageGet(opts.dotBeverage), opts)

    if (o.scripts.include && o.scripts.include[o.build])
      o = merge({}, o, {scripts: {require: [o.build]}})

    return o
  }


module.exports = function(gulpIn, opts) {
  var o = def(opts)
  var gulp

  if (o.scripts) gulp = require('gulp-npm-run')(gulpIn, o.scripts)
  else gulp = require('gulp-help')(gulpIn)

  if (o.test) {
    // TODO: ideally, this would check the caller's package.json
    // ... for presence of a "test" script
    var test = require('gulp-npm-test')(gulp, o.test)

    if (o.testWatch) {
      gulp.task('test:watch', o.testWatch.toString(), function() {
        require('gulp-watch')(o.testWatch, test)
      })
    }
  }

  if (o.buildWatch && o.scripts) {
    gulp.task('build:watch', o.buildWatch.toString(), function() {
      gulp.watch(o.buildWatch, [o.build])
    })
  }

  if (o.sourcegate.length) require('hal-rc')(o, gulp)

  return gulp
}
