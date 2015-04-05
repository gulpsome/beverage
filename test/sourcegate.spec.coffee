#!/usr/bin/env mocha

s = require('../sourcegates')
gulp = require('gulp-help')(require('gulp'))
sourcegate = require('sourcegate')
nothing = [[[], {}]] #instead of a error
fs = require('fs')

describe "sourcegates", ->

  describe "with no args", ->
    it "yields args for sourcegate.apply without eny effect", ->
      result = s()
      expect(result).to.eql nothing
      expect(sourcegate.apply null, result[0]).to.eql {}

  describe "a straight sourcegate without recipe", ->
    file = 'test/out/.jshintrc'
    before () -> try fs.unlinkSync(file)
    after () -> try fs.unlinkSync(file)
    it "beverage can ask sourcegate to write a .jshintrc", ->
      o =
        sourcegate: [
          task: 'jshintrc'
          sources: ['node_modules/hal-rc/.jshintrc.json']
          options: {write: {path: file}}
        ]
      result = s(gulp, o)
      sourcegate.apply null, result[0]
      expect(fs.existsSync(file)).is.equal true
