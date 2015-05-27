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
// use gulp as you would otherise
```

Or, even simpler, if beverage fulfils all your gulp task needs, you could load options from a `.beverage` file with just the following line in `gulpfile.js` to set gulp up:

```
require(‘beverage’)(require(‘gulp’))
```

### Configure

It will not do anything unless given some options:

- `dotBeverage: []` contains the relative paths where beverage will look for `.beverage` configuration files - the default is `[‘node_modules/beverage/node_modules/hal-rc’, ’.’]` - this is the only option one would have to override via `gulpfile.js`
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

Help is the default `gulp` task.  Create a `’default’` task to change that.

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

### Defaults & Overrides

Beverage options are deep-merged in the following order of sources:

1. `index.es6` - look at the `def` function (it has a few defaults)
2. `./node_modules/beverage/node_modules/hal-rc/.beverage` - where I keep my preferred beverage defaults
3. `./.beverage` - your project options via a configuration file
4. `gulpfile.js` - your project options via javascript code

Steps 2 and 3 can be changed with a `dotBeverage` option given through `gulpfile.js`.  It’s an array of paths where `.beverage` is to be looked for.

One could of-course write a module that wraps beverage, whether to change default options or add functionality that my beverage won’t include:

```javascript
var merge = require('lodash.merge')
module.exports = function (gulpIn, options) {
  var gulp = require('beverage')(gulpIn, merge({
      // your special beverage options
    },
    options
  ))
// do more with gulp…
return gulp
}
```

## Test [![Build Status](https://img.shields.io/travis/orlin/beverage.svg?style=flat)](https://travis-ci.org/orlin/beverage)

```sh
npm test
```

## Dependencies

[![Dependency Status](https://david-dm.org/orlin/beverage.svg)](https://david-dm.org/orlin/beverage)
[![devDependency Status](https://david-dm.org/orlin/beverage/dev-status.svg)](https://david-dm.org/orlin/beverage#info=devDependencies)

## Unlicensed

This is free and unencumbered public domain software.
For more information, see [UNLICENSE](http://unlicense.org).
