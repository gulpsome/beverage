#!/usr/bin/env node

'use strict'

var R = require('ramda')
var fs = require('fs')
var path = require('path')
var gulp = [
  path.normalize(process.cwd() + '/node_modules/.bin/gulp'),
  path.join(path.dirname(fs.realpathSync(__filename)), '/gulp'),
  path.normalize(process.cwd() + '/node_modules/beverage/node_modules/gulp/bin/gulp.js')
]
var found = false
var argv = require('minimist')(process.argv.slice(2))
var beverage = argv.o || argv.options
var tasks = argv._

if (beverage ||
    tasks.length === 0 ||
    R.contains('beverage', tasks) ||
    R.contains('help', tasks)) {
  process.argv.push('--silent') // this is a silent gulp
  // TODO: insert beverage before --options to make gulp happy
  // if (beverage && ! R.contains('beverage', tasks)) process.argv.push('beverage')
}

gulp.forEach(function(file) {
  if (!found) {
    // does loop through all of it anyway
    try {
      //console.log('trying', file)
      require(file) // delegate to gulp
      found = true // break (as if)
    }
    catch (e) {} // next (equivalent noop / required catch)
  }
})

if (!found) {
  console.error('gulp not found at:'); console.error(gulp)
  process.exit(1)
}
