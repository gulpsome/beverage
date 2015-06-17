var R = require('ramda')
var fs = require('fs')
var path = require('path')
var gulp = [
  path.normalize(process.cwd() + '/node_modules/.bin/gulp'),
  path.join(path.dirname(fs.realpathSync(__filename)), '/gulp'),
  path.normalize(process.cwd() + '/node_modules/beverage/node_modules/gulp/bin/gulp.js')
]
var found = false
var yargs = require('yargs')
var argv = yargs
  .usage('beverage [gulp-tasks]')
  .option('h', {alias: ['help', '?'], type: 'boolean', description: 'show beverage help + `gulp help --silent`'})
  .option('o', {alias: 'options', type: 'boolean', description: 'same as `gulp beverage --silent`'})
  .argv
var tasks = argv._
var beverage = argv.o || R.contains('beverage', tasks)
var help = argv.h || R.contains('help', tasks) || R.isEmpty(tasks)

// *non-beverage-options*
// these will be filtered - not passed on to gulp
process.argv = R.difference(process.argv,
  ['-o', '--options', '-?', '-h', '--help'])

if (beverage || help) {
  // this is a silent gulp
  process.argv.push('--silent')

  // add tasks for options
  if (help && !R.contains('help', tasks)) {
    process.argv.splice(2, 0, 'help')
  }
  if (beverage && !R.contains('beverage', tasks)) {
    process.argv.splice(2, 0, 'beverage')
  }
}

gulp.forEach(function(file) {
  if (!found) {
    // does loop through all of it anyway
    try {
      //console.log('trying', file)
      require(file) // delegate to gulp
      found = true // break (as if)
      if (argv.h) console.log(
          '\n' +
          yargs.help() +
          '\nRunning `gulp ' +
          process.argv.slice(2).join(' ') +
          '` now...'
        )
    }
    catch (e) {} // next (equivalent noop / required catch)
  }
})

if (!found) {
  console.error('gulp not found at:'); console.error(gulp)
  process.exit(1)
}
