import 'source-map-support/register'

import {prefquire, pkg, isLocal, isGulp, gulpHelpify} from 'be-goods'
import sourcegate from 'sourcegate'
import pick from 'lodash.pick'

let req = prefquire({dev: true, exitOnError: true})

function def (opts = {}) {
  opts.dotBeverage = opts.dotBeverage || [
    'node_modules/beverage/node_modules/hal-rc',
    '.'
  ]

  let o = sourcegate([{
    scripts: {
      requireStrict: true
    }
  }].concat(opts.dotBeverage.map(file => file + '/.beverage'), opts))

  if (o.hasOwnProperty('test') && isLocal('gulp-npm-test')) {
    // gulp-npm-test does testing better than gulp-npm-run
    // NOTE: don't be put-off by `spec.coffee` and change it to match your tests
    return sourcegate([{
      scripts: {exclude: ['test']},
      test: {
        testsRe: '\\.spec\\.coffee$'
      }
    }, o])
  } else {
    return o
  }
}

module.exports = function (first, second) {
  let gulp, o
  if (isGulp(first)) {
    gulp = gulpHelpify(first)
    o = def(second)
  } else {
    // NOTE: gulp must be locally installed (relative to gulpfile.js / cwd).
    // Gulp insists on it. Both gulp-cli and beverage-cli enforce it.
    gulp = gulpHelpify(req('gulp', {forceLocal: true}))
    o = def(first)
  }

  gulp.task('beverage', 'The recipe of this beverage.', () => {
    console.log('\nCurrent beverage options:')
    console.log('\n' + JSON.stringify(o, null, 2) + '\n')
  })

  if (pkg.scripts) {
    if (o.scripts) req('gulp-npm-run')(gulp, o.scripts)

    if (o.test && pkg.scripts.test) {
      req('gulp-npm-test')(gulp, o.test)
    }
  }

  if (o.sourcegate && o.sourcegate.length) {
    o.sourceopt = o.sourceopt || {}
    req('hal-rc')(pick(o, ['sourcegate', 'sourceopt']), gulp)
  }

  if (o.harp) req('gulp-harp')(gulp, pick(o, ['harp']))

  if (o.causality) req('gulp-cause')(gulp, o.causality)

  return gulp
}
