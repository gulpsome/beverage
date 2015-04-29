# beverage -- give it a gulp

The DRYest gulp for the thirsty.

## Why

Because even with [gulp-npm-run](https://github.com/orlin/gulp-npm-run),
[gulp-npm-test](https://github.com/orlin/gulp-npm-test),
[sourcegate](https://github.com/orlin/sourcegate),
and [hal-rc](https://github.com/orlin/hal-rc) -
I'd still do a lot of copy-pasting between gulpfiles.

## What

There is almost always `test` + `test:watch`,
and often some kind of `build` + `build:watch` tasks,
and some linter / hinter config, that could be common /
similar across projects.

All of the above are optional, but there would be no use of beverage
if none are enabled, or configured.

## Use

[![NPM](https://nodei.co/npm/beverage.png?mini=true)](https://www.npmjs.org/package/beverage)

All that's needed in a `gulpfile.js`, besides gulp, for starters, is:

```javascript
var gulp = require('beverage')(require('gulp'), {
  // options listed next
})
```

### Configure

It will not do anything unless given some options:

- `test: {}` will setup `gulp test` provided there is a `npm test` script, see [gulp-npm-test](https://github.com/orlin/gulp-npm-test#configure) for full configuration options, notice `testsRe` makes testing more efficient, if the next option is used
- `testWatch: []` handed to `gulp-watch`, give it some file paths / globs, runs the tests on change
- `scripts: {include: {build: "Builds me something"}}` will setup the script / task, see [gulp-npm-run](https://github.com/orlin/gulp-npm-run#configure) for full configuration options; just like `test`, if there is no `scripts: {}`, at least, gulp-npm-run won't be used and there can't be a `build:watch` task either, the test script is excluded by default in favor of gulp-npm-test use, described earlier
- `build: "build"` already the default, assuming there is some `npm run build`
- `buildWatch: []` similar to `testWatch` - will build on change
- `sourcegate*` quite a number of options, handled by hal-rc, [where they are documented](https://github.com/orlin/hal-rc#configure)...

### Help

To see what tasks beverage has created:

```sh
gulp help #or just $ gulp
```

This is the default `gulp` task.  Override with a custom default according to preference.

Here is an example output:

```text
Usage
  gulp [task]

Available tasks
  build             sourcegates.js
  build:watch       sourcegates.coffee
  dev               DEVELOP
  help              Display this help text.
  sourcegate        Write sourcegate targets.
  sourcegate:watch  Watch sourcegate sources for changes.
  test              A gulp-npm-test task, using `mocha`.
  test:watch        sourcegates.js,test/*.coffee
```

For which, I only had to add a `dev` task:

```javascript
gulp.task('dev', 'DEVELOP', ['build', 'sourcegate:watch', 'build:watch', 'test:watch'])
```

Credits to [gulp-help](https://www.npmjs.com/package/gulp-help).

Hope this helps.

### Defaults

The defaults are tailored to my preferences, but one could always wrap
and drink it as some other *tasty-beverage*, here is an example:

```javascript
var merge = require('lodash.merge')
module.exports = function (gulp, options) {
  require('beverage')(gulp, merge({
      // your special beverage options
    },
    options
  ))}
```

## Test [![Build Status](https://img.shields.io/travis/orlin/beverage.svg?style=flat)](https://travis-ci.org/orlin/beverage)

```sh
npm test
```

## Unlicensed

This is free and unencumbered public domain software.
For more information, see [UNLICENSE](http://unlicense.org).
