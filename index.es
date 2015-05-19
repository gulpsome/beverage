'use strict'
require('source-map-support').install()

var sourcegate = require('sourcegate')

function def(opts = {}) {
    opts.dotBeverage = opts.dotBeverage || [
      '.',
      'node_modules/hal-rc',
      'node_modules/beverage/node_modules/hal-rc'
    ]

    let o = sourcegate([{
      build: 'build',
      scripts: {
        exclude: ['test'],
        requireStrict: true
      },
      test: {
        testsRe: /\.spec\.coffee$/
      },
      sourcegateModule: 'hal-rc', // could be any git repo as well
      sourcegatePrefix: 'rc/', // these would override any sourcegatePreset
      sourcegate: [
        {recipe: 'eslint', sources: {
          parser: 'babel-eslint'
        }}
      ],
      sourcegateWatch: true
    }].concat(opts.dotBeverage.map(path => path + '/.beverage'), [opts]))

    if (o.scripts.include && o.scripts.include[o.build])
      o = sourcegate([o, {scripts: {require: [o.build]}}])

    return o
  }


module.exports = function(gulpIn, opts) {
  let o = def(opts),
      gulp

  if (o.scripts) gulp = require('gulp-npm-run')(gulpIn, o.scripts)
  else gulp = require('gulp-help')(gulpIn)

  if (o.test) {
    // TODO: ideally, this would check the caller's package.json
    // ... for presence of a "test" script
    let test = require('gulp-npm-test')(gulp, o.test)

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
