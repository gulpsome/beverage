# beverage -- give it a gulp

[![version npm](https://img.shields.io/npm/v/beverage.svg?style=flat-square)](https://www.npmjs.com/package/beverage)
[![dependencies](https://img.shields.io/david/gulpsome/beverage.svg?style=flat-square)](https://david-dm.org/gulpsome/beverage)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)

_The DRYest gulp for the thirsty._

This `beverage` simplifies your `npm run` experience with little to no effort, it just becomes `gulp` too.

This `beverage` doubles your tasty `gulp` fun with even less effort, it's all the same, `gulp` on.

Beverage is something to pour in a `gulp` cup.

## Why

Because even with:
[gulp-npm-run](https://github.com/gulpsome/gulp-npm-run),
[gulp-npm-test](https://github.com/gulpsome/gulp-npm-test),
[gulp-cause](https://github.com/gulpsome/gulp-cause),
[hal-rc](https://github.com/gulpsome/hal-rc),
and [gulp-harp](https://github.com/gulpsome/gulp-harp) -
I'd still do a lot of copy-pasting between gulpfiles.
Just turning your npm scripts into gulp tasks,
with a single line of code, should be enough motivation.

## What

There is almost always `test` + `test:watch`,
and often some kind of `build` + `build:watch` tasks,
and some linter / hinter config, that could be common /
similar across projects, as well as a `dev` task that
runs the above and perhaps some other tasks in parallel...

All of the above are optional, yet there would be no use of beverage if none of these projects are enabled by configuration, these or possibly some others not listed up-front.  Make your own beverage.  Read on to find out what could be in it.

### Ecosystem [![The Ready Column](https://badge.waffle.io/gulpsome/beverage.png?label=ready&title=Urgent)](http://waffle.io/gulpsome/beverage)

Here is a diagram of dependencies / modules  `beverage` can help with:

[![](doc/Beverage.jpg "follow the link for more info")](doc)

Follow the infographic link above for explanation about what the colors mean.  The modules are useful on their own, mostly with gulp, though also developed with beverage.  It can be easy to forget what the interdependencies are.  I come back to it when I need a reminder.  If you like `npm link` and would like to hack on these, I recommend [npm-interlink](https://github.com/orlin/npm-interlink) to bootstrap a development environment.  That can be useful for any project with a number of interdependent modules...

## Use

[![NPM](https://nodei.co/npm/beverage.png?mini=true)](https://www.npmjs.org/package/beverage)

All that's needed in a `gulpfile.js`, besides gulp, for starters, is:

```javascript
var gulp = require('beverage')(require('gulp'), {
  // beverage options listed next
})
// use gulp as you would otherise
```

Or, even simpler, if beverage fulfills all your gulp task needs, you could load options from a `.beverage` file with just the following line in `gulpfile.js` to set gulp up:

```javascript
var gulp = require(‘beverage’)(require(‘gulp’))
```

Or the absolute simplest `gulpfile.js`:

```javascript
var gulp = require(‘beverage’)()
```

Beverage will use your local gulp and you must have it installed, something that gulp itself insists on.  Otherwise you will be reminded.  The options in this last example come from `.beverage` but you could also provide you own as a first argument:

```javascript
var gulp = require(‘beverage’)({
  // beverage options next...
})
// anything else you #gulp
```

### Configure

It will not do anything unless given some options:

- `dotBeverage: []` contains the relative paths where beverage will look for `.beverage` configuration files - the default is `[‘node_modules/beverage/node_modules/hal-rc’, ’.’]` - this is the only option one would have to override via `gulpfile.js`
- `causality: []` add declarative tasks via [gulp-cause](https://github.com/gulpsome/gulp-cause)
- `harp: {}` web server and browser-sync via [gulp-harp](https://github.com/gulpsome/gulp-harp)
- `test: {}` will setup `gulp test` provided there is a `npm test` script, see [gulp-npm-test](https://github.com/gulpsome/gulp-npm-test#configure) for configuration options
- `scripts: {}` makes gulp tasks for all your `package.json` scripts, see [gulp-npm-run](https://github.com/gulpsome/gulp-npm-run#configure) for optional configuration, the test script / task is better with `gulp-npm-test` which is automatically favored
- `sourcegate` & `sourceopt`, the latter is optional, both handled by [hal-rc, where they are documented](https://github.com/gulpsome/hal-rc#configure)

### CLI

There is also a [beverage-cli](https://github.com/gulpsome/beverage-cli),
that can be installed separately.

### Help

To see what tasks beverage has created:

```sh
gulp help
# or gulp
# or beve
# or beverage
```

Help is the default `gulp` task.  Create a `’default’` task to change that.

Here is an example output:

```text
Usage
  gulp [task]

Available tasks
  beverage          The recipe of this beverage.
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
gulp.task('dev', 'DEVELOP', ['build', 'build:watch', 'test:watch'])
```

Credits to [gulp-help](https://www.npmjs.com/package/gulp-help).

See the current beverage configuration options with `beverage -o` or `gulp beverage`.

Hope this helps.

### Defaults & Overrides

Beverage options are deep-merged in the following order of sources:

1. `index.js` - look at the `def` function (it has a few defaults)
2. `./node_modules/beverage/node_modules/hal-rc/.beverage` - where I keep hal-rc defaults, in the future there could be more defaults between steps 2 and 3...
3. `./.beverage` - your project options via a configuration file
4. `gulpfile.js` - your project options via javascript code

Steps 2 and 3 can be changed with a `dotBeverage` option given through `gulpfile.js`.  It’s an array of paths where `.beverage` is to be looked for.  For example, if you had a package called `special-recipe` that had all your default configuration, here is a `gulpfile.js` starting point:

```javascript
var gulp = require(‘beverage’)(require(‘gulp’), {
  dotBeverage: [‘node_modules/special-recipe’, ’.’]
})
```

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

## Test [![Build Status](https://img.shields.io/travis/gulpsome/beverage.svg?style=flat)](https://travis-ci.org/gulpsome/beverage)

```sh
npm test
```

## Depvelop [![Dependency Status](https://david-dm.org/gulpsome/beverage.svg)](https://david-dm.org/gulpsome/beverage) [![devDependency Status](https://david-dm.org/gulpsome/beverage/dev-status.svg)](https://david-dm.org/gulpsome/beverage#info=devDependencies)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Unlicensed

This is free and unencumbered public domain software.
For more information, see [UNLICENSE](http://unlicense.org).
