import 'source-map-support/register'

import R from 'ramda'
import sourcegate from 'sourcegate'
import {pkg, isLocal, myRequire, gulpHelpify, logger} from 'be-goods'

function req (name) {
  if (isLocal(name)) {
    return myRequire(name)
  } else {
    if (R.not(R.contains(name, ['hal-rc', 'gulp-cause', 'gulp-npm-run']))) {
      // the above list of exceptions contains modules that will remain bundled as beverage dependencies
      logger.warn(`Please install ${name} as a devDependency, future beverage will not buldle it.`)
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
    build: 'build', // TODO: remove this after the deprecations are phased out
    scripts: {
      requireStrict: true
    }
  }].concat(opts.dotBeverage.map(file => file + '/.beverage'), opts))

  // TODO: add `&& isLocal('gulp-npm-test')`, once the deprecations are phased out
  if (o.hasOwnProperty('test')) {
    // gulp-npm-test does testing better than gulp-npm-run
    return sourcegate({
      scripts: {exclude: ['test']},
      test: {
        testsRe: /\.spec\.coffee$/
      }
    }, o)
  } else {
    return o
  }
}

export default function (gulpIn, opts) {
  let o = def(opts)
  let gulp = gulpHelpify(gulpIn)

  gulp.task('beverage', 'The recipe of this beverage.', () => {
    console.log('\nCurrent beverage options:')
    console.log('\n' + JSON.stringify(o, null, 2) + '\n')
  })

  if (pkg.scripts) {
    if (o.scripts) req('gulp-npm-run')(gulp, o.scripts)

    if (o.test && pkg.scripts.test) {
      if (o.testWatch) {
        // TODO: this whole if should be deleted
        logger.warn('Option testWatch is deprecated, use test.watch instead.')
        o.test.watch = o.testWatch
      }
      req('gulp-npm-test')(gulp, o.test)
    }

    if (o.buildWatch && o.scripts) {
      // TODO: this whole if should be deleted as it's redundant
      logger.warn('The build & buildWatch options are deprecated, use causality instead.')
      gulp.task(o.build + ':watch', o.buildWatch.toString(), () =>
        gulp.watch(o.buildWatch, [o.build])
      )
    }
  }

  if (o.sourcegate && o.sourcegate.length) {
    o.sourceopt = o.sourceopt || {}
    // TODO: the rest of this as far as the req is temporary, for graceful upgrade...
    // delete afterwards
    let convert = {'sourcegateModule': 'module',
                   'sourcegatePrefix': 'prefix',
                   'sourcegatePreset': 'preset',
                   'sourcegateWatch': 'watch'}
    if (R.keys(R.pick(R.keys(convert), o)).length) {
      for (let key of R.keys(convert)) {
        if (o.hasOwnProperty(key)) {
          let val = convert[key]
          o.sourceopt[val] = o[key]
          logger.warn(`Deprecated ${key} option, use sourceopt.${val} instead.`)
        }
      }
    }
    req('hal-rc')(R.pick(['sourcegate', 'sourceopt'], o), gulp)
  }

  if (o.harp) req('gulp-harp')(gulp, R.pick(['harp'], o))

  if (o.causality) req('gulp-cause')(gulp, o.causality)

  return gulp
}
