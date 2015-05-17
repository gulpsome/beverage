'use strict'
require('source-map-support').install()

var sourcegate = require('sourcegate')


var def = function(opts = {}) {
    opts.dotBeverage = opts.dotBeverage || [
      '.',
      'node_modules/hal-rc',
      'node_modules/beverage/node_modules/hal-rc'
    ]

    var o = sourcegate([{
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
    }].concat(opts.dotBeverage.map(path => path + '/.beverage'), [opts]))

    if (o.scripts.include && o.scripts.include[o.build])
      o = sourcegate(o, {scripts: {require: [o.build]}})

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
