#!/usr/bin/env mocha

s = require('../sourcegates')
gulp = require('gulp-help')(require('gulp'))
sourcegate = require('sourcegate')

describe "sourcegates", ->

  describe "with no args", ->
    it "yields args for sourcegate.apply without eny effect", ->
      expect(sourcegate.apply null, s()).to.not.trow
