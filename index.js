'use strict'

var fs = require('fs')
var path = require('path')
var isThere = require('is-there')
var nocomments = require('strip-json-comments')
var merge = require('lodash.merge')


var beverageGet = function(beveragePath) {
  var what = path.normalize(beveragePath + '/.beverage')

  if (isThere(what)) {
    try {
      return JSON.parse(nocomments(fs.readFileSync(what).toString()))
    }
    catch (e) {
      console.error(e)
      throw new Error('Could not find .beverage at: ' + beveragePath.toString())
    }
  }
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
