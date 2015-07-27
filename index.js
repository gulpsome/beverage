require('source-map-support').install()

import R from 'ramda'
import path from 'path'
import sourcegate from 'sourcegate'
import {pkg, gulpHelpify} from 'be-goods'
import chalk from 'chalk'

var logger = require('tracer').console({
  'filters': {'warn': chalk.yellow, 'error': chalk.red},
  'format': '<beverage/{{file}}:{{line}}> {{message}}'
})

function req (name) {
  let dep = R.has(name)
  let local = dep(pkg.dependencies || {}) || dep(pkg.devDependencies || {})
  if (local) {
    let where = path.normalize(`${process.cwd()}/node_modules/${name}`)
    return require(path.join(where, require(path.join(where, 'package.json')).main))
  } else {
    if (R.not(R.contains(name, ['hal-rc', 'gulp-cause']))) {
      // the above list of exceptions contains modules that will remain bundled as beverage dependencies
      console.warn(chalk.yellow(`Please install ${name} as a devDependency, future beverage will not buldle it.`))
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
        if (o[key]) {
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
