import 'source-map-support/register'

// NOTE: gulp is a dependency (rather than devDependency) on purpose (a fallback default)
// perhaps there should be a warning - do `gulp` vs `beverage` commands behave differently?

import R from 'ramda'
import sourcegate from 'sourcegate'
import {pkg, isLocal, myRequire, gulpHelpify, logger} from 'be-goods'

function req (name) {
  if (isLocal(name)) {
    return myRequire(name)
  } else {
    if (R.not(R.contains(name, ['hal-rc', 'gulp-cause', 'gulp-npm-run']))) {
      // the above list of exceptions contains modules that will remain bundled as beverage dependencies
      logger.error(`Please install ${name} as a devDependency.`)
    }
    return require(name)
  }
}

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

module.exports = function (gulpIn, opts) {
  let o = def(opts)
  let gulp = gulpHelpify(gulpIn)

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
    req('hal-rc')(R.pick(['sourcegate', 'sourceopt'], o), gulp)
  }

  if (o.harp) req('gulp-harp')(gulp, R.pick(['harp'], o))

  if (o.causality) req('gulp-cause')(gulp, o.causality)

  return gulp
}
