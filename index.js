require('source-map-support').install()

import R from 'ramda'
import sourcegate from 'sourcegate'
import {pkg, gulpHelpify} from 'stamina'

function def (opts = {}) {
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
      test: {
        testsRe: /\.spec\.coffee$/ // TODO: move to .beverage after changing it to a glob
      }
    }].concat(opts.dotBeverage.map(file => file + '/.beverage'), opts))

    if (o.scripts.include && o.scripts.include[o.build]) {
      o = sourcegate([o, {scripts: {require: [o.build]}}])
    }

    return o
  }

export default function (gulpIn, opts) {
  let o = def(opts)
  let gulp = gulpHelpify(gulpIn)

  gulp.task('beverage', 'The recipe of this beverage.', () => {
    console.log('\nCurrent beverage options:')
    console.log('\n' + JSON.stringify(o, null, 2) + '\n')
  })

  if (pkg.scripts) {
    if (o.scripts) require('gulp-npm-run')(gulp, o.scripts)

    if (o.test && pkg.scripts.test) {
      if (o.testWatch) {
        // TODO: this whole if should be deleted
        console.warn('Option testWatch is deprecated, please use test.watch instead.')
        o.test.watch = o.testWatch
      }
      require('gulp-npm-test')(gulp, o.test)
    }

    if (o.buildWatch && o.scripts) {
      // TODO: this whole if should be deleted as it's redundant
      console.warn('The build & buildWatch options are deprecated...')
      console.warn('Please use "causality" instead.\n')
      gulp.task(o.build + ':watch', o.buildWatch.toString(), () =>
        gulp.watch(o.buildWatch, [o.build])
      )
    }
  }

  if (o.harp) require('gulp-harp')(gulp, R.pick(['harp'], o))

  if (o.sourcegate && o.sourcegate.length) require('hal-rc')(o, gulp)

  if (o.causality) require('gulp-cause')(gulp, o.causality)

  return gulp
}
