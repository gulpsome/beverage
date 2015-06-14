require('source-map-support').install()

import R from 'ramda'
import sourcegate from 'sourcegate'
import path from 'path'
import {pkg} from 'stamina'

function def(opts = {}) {
    opts.dotBeverage = opts.dotBeverage || [
      'node_modules/beverage/node_modules/hal-rc',
      '.'
    ]

    let o = sourcegate([{
      build: 'build',
      scripts: {
        exclude: ['test'], // because gulp-npm-test does testing better than gulp-npm-run
        requireStrict: true
      },
      test: { // NOTE: test is always enabled because of this default -- not so good...
        testsRe: /\.spec\.coffee$/ // TODO: move to .beverage after changing it to a glob
      }
    }].concat(opts.dotBeverage.map(file => file + '/.beverage'), opts))

    if (o.scripts.include && o.scripts.include[o.build]) {
      o = sourcegate([o, {scripts: {require: [o.build]}}])
    }

    return o
  }


export default function(gulpIn, opts) {
  let o = def(opts)
  let gulp

  if (pkg.scripts && o.scripts) gulp = require('gulp-npm-run')(gulpIn, o.scripts)
  else gulp = require('gulp-help')(gulpIn)

  gulp.task('beverage', 'The recipe of this beverage.', () => {
    console.log('\nCurrent beverage options:')
    console.log('\n' + JSON.stringify(o, null, 2) + '\n')
  })

  if (pkg.scripts) {
    if (o.test && pkg.scripts.test) {
      let test = require('gulp-npm-test')(gulp, o.test)

      if (o.testWatch) {
        gulp.task('test:watch', o.testWatch.toString(), () =>
          require('gulp-watch')(o.testWatch, test)
        )
      }
    }

    if (o.buildWatch && o.scripts) {
      gulp.task(o.build + ':watch', o.buildWatch.toString(), () =>
        gulp.watch(o.buildWatch, [o.build])
      )
    }
  }

  if (o.harp) require('gulp-harp')(gulp, R.pick(['harp'], o))

  if (o.sourcegate && o.sourcegate.length) require('hal-rc')(o, gulp)

  return gulp
}
