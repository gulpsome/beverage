require('source-map-support').install()

import R from 'ramda'
import {pollinateHarp} from 'stamina'
import sourcegate from 'sourcegate'
import path from 'path'
import harp from 'harp'
import sync from 'browser-sync'
let reload = sync.reload
let pkg = require(path.join(process.cwd(), 'package.json'))

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

  if (o.harp) {
    let ho = pollinateHarp(R.pick(['harp'], o)).harp

    gulp.task(ho.name, ho.help, () => {
      harp.server(ho.path || process.cwd(), {
        port: ho.port
      }, () => {
        if (ho.sync) {
          sync(ho.sync.options)
          if (ho.sync.reload) {
            if (ho.sync.stream) {
              // streaming changes
              gulp.watch(ho.sync.stream).on('change', (file) => {
                reload(file.path, {stream: true})
              })
            }
            // reload non-streaming (appended exclusions)
            let nonStreaming = ho.sync.reload.concat(
              ho.sync.stream.map(streamed => '!' + streamed + '+(|.map)')
            )
            gulp.watch(nonStreaming, () => {
              reload()
            })
          }
        }
      })
    })
  }

  if (o.sourcegate && o.sourcegate.length) require('hal-rc')(o, gulp)

  return gulp
}
