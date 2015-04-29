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

Beverage is most uniquely useful for its [sourcegate](https://github.com/orlin/beverage#sourcegate) integration,
which so far does not exist as a standalone "gulpfriendly" thing.

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
- `sourcegate: []` creates tasks that write configuration files, documented next
- `sourcegateRx: {}` abbreviation for sourcegateRecipeDefaults so one can skip stuff like `sources: {node: true}` for each jshint-linted project, skip the defaults with `sourcegate: [{recipe: 'jshint', sources: {}}] for example, or override with sourcegateModule / module config`
- `sourcegateModule: 'a-node_modules-module-name'` optional like everything else
- `sourcegatePrefix`: '.'` will look for `".#{recipe}rc"`, it can also be a path
- `sourcegatePreset: "airbnb"` for example, in some cases there are presets across tools, this sets a default one for configuration DRY-ness; presets of tools installed in the project's `node_modules` have priority over presets form `sourcegateModule`'s `node_modules`, this way a project can have its own version of presets
- `sourcegateWatch: true` will create a `sourcegate:watch` task

### Sourcegate

The `sourcegate` is useful for writing configuration files from a template to the project's root with possible overrides.  This is done with the [sourcegate module](https://github.com/orlin/sourcegate) and some example files would be: `.jshintrc`, `.jscsrc`, `.eslintrc`, etc.  If there is a package in node_modules that contains some / many / most / all your baseline defaults for coding style preferences / standards, `sourcegateModule` will tell beverage about it so the config is DRYer.  Or each template can set its own individual module / path.  It could be a published module, or a git repo in `devDependencies`.  Beverage offers convenient setup for tools that use json config files, for example:

- [jscs](http://jscs.info)
- [jshint](http://jshint.com)
- [eslint](http://eslint.org)

These tools are here called recipes.
Any tool that looks for its configuration in a ".#{tool}rc" file,
in a project's root dir - is automatically supported as a recipe.
The config would look like:

```javascript
{
  recipe: 'name', // a tool's name
  module: 'name', // overrides the sourcegateModule default
  prefix: '.', // what goes between module and "#{recipe}rc"
  preset: 'name', // this is only relevant for jscs, or "airbnb" so far
  sources: [], // sourcegate's first argument - stuff to merge
  sources: {}, // shorthand for overrides that don't come from a file
  options: {} // handed to sourcegate
}
```

Some tools, such as jscs have presets, use the `preset` option for easy config.
In this case, jscs would have to be a dependency of the project using beverage,
or the configured `module`, checked in precisely this order.

The `recipe`, `module`, `prefix` and `preset` options are merely conveniences.

One can always fallback to [sourcegate options](https://github.com/orlin/sourcegate#configure).
The minimum needed in such a case is:

```javascript
{
  sources: [
    // one or more things to merge
  ],
  options: {write: {path: 'name-me.json'}} // if not ".#{tool}rc"
}
```

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
