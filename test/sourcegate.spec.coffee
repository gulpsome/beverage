#!/usr/bin/env mocha

s = require('../sourcegates')
gulp = require('gulp-help')(require('gulp'))
sourcegate = require('sourcegate')
nothing = [[[], {}]] #instead of a error

describe "sourcegates", ->

  describe "with no args", ->
    it "yields args for sourcegate.apply without eny effect", ->
      result = s()
      expect(result).to.eql nothing
      expect(sourcegate.apply null, result[0]).to.eql {}
