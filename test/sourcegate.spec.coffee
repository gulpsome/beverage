#!/usr/bin/env mocha

s = require('../sourcegates')
sourcegate = require('sourcegate')
fs = require('fs')

testWR = "test/out" # stands for testWriteRoot
# 0 test's it "text"
# 1 paths (to clean-up / for verification of successful write)
# 2 sourcegate (array of options that produce arguments to call sourcegate with)
testWriteFiles = [
  [ 'config without recipe writes a .jshintrc',
    ["#{testWR}/.jshintrc"],
    [{
      task: 'jshintrc',
      sources: ['node_modules/hal-rc/.jshintrc'],
      options: {write: {path: "#{testWR}/.jshintrc"}}
    }]
  ],
  [ 'config with a jshint recipe + defaults module writes a .jshintrc',
    ["#{testWR}/.jshintrc"],
    [{
      recipe: 'jshint',
      module: 'hal-rc',
      prefix: '.',
      options: {write: {root: testWR}}
    }]
  ]
]


describe "sourcegates", ->

  describe "with no args", ->
    it "yields args for sourcegate.apply without any effect", ->
      result = s()
      expect(result).to.eql [[[], {}]] # nothing instead of an error
      expect(sourcegate.apply null, result[0]).to.eql {}

  describe "-", ->
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
        r = s(o, gulp) # options for sourcegate
        for item in r
          sourcegate.apply null, item
        for file in paths
          expect(fs.existsSync(file)).is.equal true
