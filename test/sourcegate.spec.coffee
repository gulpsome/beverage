#!/usr/bin/env mocha

s = require('../sourcegates')
sourcegate = require('sourcegate')
fs = require('fs')

# 0 testName
# 1 paths (to clean-up / for verification of successful write)
# 2 sourcegate (array of options that produce arguments to call sourcegate with)
testWriteFiles = [
  [ 'config without recipe writes a .jshintrc',
    ['test/out/.jshintrc'],
    [{
      task: 'jshintrc',
      sources: ['node_modules/hal-rc/.jshintrc'],
      options: {write: {path: 'test/out/.jshintrc'}}
    }]
  ]
]


describe "sourcegates", ->

  describe "with no args", ->
    it "yields args for sourcegate.apply without any effect", ->
      result = s()
      expect(result).to.eql [[[], {}]] # nothing instead of an error
      expect(sourcegate.apply null, result[0]).to.eql {}

  describe "=>", ->
    gulp = null
    for [testName, paths, so] in testWriteFiles
      before () ->
        gulp = require('gulp-help')(require('gulp'))
        for file in paths
          try fs.unlinkSync(file)
      after () ->
        for file in paths
          try fs.unlinkSync(file)
      it testName, ->
        o = sourcegate: so
        result = s(gulp, o) # options for sourcegate
        for item in result
          sourcegate.apply null, item
        for file in paths
          expect(fs.existsSync(file)).is.equal true
