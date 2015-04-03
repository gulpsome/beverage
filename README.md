# beverage -- give it a gulp

Because even with [gulp-npm-run](https://github.com/orlin/gulp-npm-run)
and [gulp-npm-test](https://github.com/orlin/gulp-npm-test)
I'd still do a lot of copy-pasting between gulpfiles.

There is almost always `test` + `test:watch`,
and often some kind of `build` + `build:watch` tasks.

## Use

[![NPM](https://nodei.co/npm/beverage.png?mini=true)](https://www.npmjs.org/package/beverage)

All that's needed in a `gulpfile.js`, besides gulp, for starters, is:

```javascript
var gulp = require('beverage')(require('gulp'), {
  // options listed next
})
```

Which won't do anything unless given some options:

- `test: {}` will setup `gulp test` provided there is a `npm test` script, see [gulp-npm-test](https://github.com/orlin/gulp-npm-test#configure) for full configuration options, notice `testsRe` makes testing more efficient, if the next option is used
- `testWatch: []` handed to `gulp-watch`, give it some file paths / globs, runs the tests on change
- `scripts: {include: {build: "Builds me something"}}` will setup the script / task, see [gulp-npm-run](https://github.com/orlin/gulp-npm-run#configure) for full configuration options
- `build: "build"` already the default, assuming there is some `npm run build`
- `buildWatch: []` similar to `testWatch` - will build on change

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
  build        Compile coffee with inline source-map.
  build:watch  *.coffee
  dev          DEVELOP
  help         Display this help text.
  test         A gulp-npm-test task, using `mocha`.
  test:watch   index.js,test/*.spec.coffee
```

For which, I'd add something like:

```javascript
gulp.task('dev', 'DEVELOP', ['build', 'test', 'build:watch', 'test:watch'])
```

Credits to [gulp-help](https://www.npmjs.com/package/gulp-help).

Hope this helps.

## Unlicensed

This is free and unencumbered public domain software.
For more information, see [UNLICENSE](http://unlicense.org).
