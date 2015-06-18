import R from 'ramda'
import fs from 'fs'
import path from 'path'
import yargs from 'yargs'
let found = false
const gulp = [
  path.normalize(process.cwd() + '/node_modules/.bin/gulp'),
  path.join(path.dirname(fs.realpathSync(__filename)), '/gulp'),
  path.normalize(process.cwd() + '/node_modules/beverage/node_modules/gulp/bin/gulp.js')
]
let argv = yargs
  .usage('beverage [gulp-tasks]')
  .option('h', {alias: ['help', '?'], type: 'boolean', description: 'show beverage help + `gulp help --silent`'})
  .option('o', {alias: 'options', type: 'boolean', description: 'same as `gulp beverage --silent`'})
  .argv
let tasks = argv._
let beverage = argv.o || R.contains('beverage', tasks)
let help = argv.h || R.contains('help', tasks) || R.isEmpty(tasks)

// *non-beverage-options*
// not passed on to gulp
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

for (let file of gulp) {
  try {
    require(file) // delegate to gulp
    found = true
    if (argv.h) console.log(
        '\n' +
        yargs.help() +
        '\nRunning `gulp ' +
        process.argv.slice(2).join(' ') +
        '` now...'
      )
    break
  }
  catch (e) {}
}

if (!found) {
  console.error('gulp not found at:'); console.error(gulp)
  process.exit(1)
}
