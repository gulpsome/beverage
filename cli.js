#!/usr/bin/env node

'use strict'

var fs = require('fs')
var path = require('path')
var gulp = [
  path.normalize(process.cwd() + '/node_modules/.bin/gulp'),
  path.normalize(process.cwd() + '/node_modules/beverage/node_modules/gulp/bin/gulp.js'),
  path.join(path.dirname(fs.realpathSync(__filename)), '/gulp')
]
var found = false

// this is a silent gulp
process.argv.push('--silent')

gulp.forEach(function(file) {
  try {
    if (!found) {
      //console.log('trying', file)
      require(file)
      found = true
    }
  }
  catch (e) {} // next
})

if (!found) {
  console.error('gulp not found at:'); console.error(gulp)
  process.exit(1)
}
