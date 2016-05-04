'use strict';

require('source-map-support/register');

var _beGoods = require('be-goods');

var _sourcegate = require('sourcegate');

var _sourcegate2 = _interopRequireDefault(_sourcegate);

var _lodash = require('lodash.pick');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var req = (0, _beGoods.prefquire)({ dev: true, exitOnError: true });

function def() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  opts.dotBeverage = opts.dotBeverage || ['node_modules/beverage/node_modules/hal-rc', '.'];

  var o = (0, _sourcegate2.default)([{
    scripts: {
      requireStrict: true
    }
  }].concat(opts.dotBeverage.map(function (file) {
    return file + '/.beverage';
  }), opts));

  if (o.hasOwnProperty('test') && (0, _beGoods.isLocal)('gulp-npm-test')) {
    // gulp-npm-test does testing better than gulp-npm-run
    // NOTE: don't be put-off by `spec.coffee` and change it to match your tests
    return (0, _sourcegate2.default)([{
      scripts: { exclude: ['test'] },
      test: {
        testsRe: '\\.spec\\.coffee$'
      }
    }, o]);
  } else {
    return o;
  }
}

module.exports = function (first, second) {
  var gulp = void 0,
      o = void 0;
  if ((0, _beGoods.isGulp)(first)) {
    gulp = (0, _beGoods.gulpHelpify)(first);
    o = def(second);
  } else {
    // NOTE: gulp must be locally installed (relative to gulpfile.js / cwd)
    if ((0, _beGoods.isLocal)('gulp', true)) {
      gulp = (0, _beGoods.gulpHelpify)((0, _beGoods.myRequire)('gulp'));
    } else {
      // It should not be possible to run this code.
      // Both gulp and beverage-cli prevent it from happening.
      throw new Error('Gulp insists on a local node_modules/gulp install.');
    }
    o = def(first);
  }

  gulp.task('beverage', 'The recipe of this beverage.', function () {
    console.log('\nCurrent beverage options:');
    console.log('\n' + JSON.stringify(o, null, 2) + '\n');
  });

  if (_beGoods.pkg.scripts) {
    if (o.scripts) req('gulp-npm-run')(gulp, o.scripts);

    if (o.test && _beGoods.pkg.scripts.test) {
      req('gulp-npm-test')(gulp, o.test);
    }
  }

  if (o.sourcegate && o.sourcegate.length) {
    o.sourceopt = o.sourceopt || {};
    req('hal-rc')((0, _lodash2.default)(o, ['sourcegate', 'sourceopt']), gulp);
  }

  if (o.harp) req('gulp-harp')(gulp, (0, _lodash2.default)(o, ['harp']));

  if (o.causality) req('gulp-cause')(gulp, o.causality);

  return gulp;
};

//# sourceMappingURL=data:application/json;base64,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LW1hcC1zdXBwb3J0L3JlZ2lzdGVyJ1xuXG5pbXBvcnQge3ByZWZxdWlyZSwgcGtnLCBpc0xvY2FsLCBteVJlcXVpcmUsIGlzR3VscCwgZ3VscEhlbHBpZnl9IGZyb20gJ2JlLWdvb2RzJ1xuaW1wb3J0IHNvdXJjZWdhdGUgZnJvbSAnc291cmNlZ2F0ZSdcbmltcG9ydCBwaWNrIGZyb20gJ2xvZGFzaC5waWNrJ1xuXG5sZXQgcmVxID0gcHJlZnF1aXJlKHtkZXY6IHRydWUsIGV4aXRPbkVycm9yOiB0cnVlfSlcblxuZnVuY3Rpb24gZGVmIChvcHRzID0ge30pIHtcbiAgb3B0cy5kb3RCZXZlcmFnZSA9IG9wdHMuZG90QmV2ZXJhZ2UgfHwgW1xuICAgICdub2RlX21vZHVsZXMvYmV2ZXJhZ2Uvbm9kZV9tb2R1bGVzL2hhbC1yYycsXG4gICAgJy4nXG4gIF1cblxuICBsZXQgbyA9IHNvdXJjZWdhdGUoW3tcbiAgICBzY3JpcHRzOiB7XG4gICAgICByZXF1aXJlU3RyaWN0OiB0cnVlXG4gICAgfVxuICB9XS5jb25jYXQob3B0cy5kb3RCZXZlcmFnZS5tYXAoZmlsZSA9PiBmaWxlICsgJy8uYmV2ZXJhZ2UnKSwgb3B0cykpXG5cbiAgaWYgKG8uaGFzT3duUHJvcGVydHkoJ3Rlc3QnKSAmJiBpc0xvY2FsKCdndWxwLW5wbS10ZXN0JykpIHtcbiAgICAvLyBndWxwLW5wbS10ZXN0IGRvZXMgdGVzdGluZyBiZXR0ZXIgdGhhbiBndWxwLW5wbS1ydW5cbiAgICAvLyBOT1RFOiBkb24ndCBiZSBwdXQtb2ZmIGJ5IGBzcGVjLmNvZmZlZWAgYW5kIGNoYW5nZSBpdCB0byBtYXRjaCB5b3VyIHRlc3RzXG4gICAgcmV0dXJuIHNvdXJjZWdhdGUoW3tcbiAgICAgIHNjcmlwdHM6IHtleGNsdWRlOiBbJ3Rlc3QnXX0sXG4gICAgICB0ZXN0OiB7XG4gICAgICAgIHRlc3RzUmU6ICdcXFxcLnNwZWNcXFxcLmNvZmZlZSQnXG4gICAgICB9XG4gICAgfSwgb10pXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmaXJzdCwgc2Vjb25kKSB7XG4gIGxldCBndWxwLCBvXG4gIGlmIChpc0d1bHAoZmlyc3QpKSB7XG4gICAgZ3VscCA9IGd1bHBIZWxwaWZ5KGZpcnN0KVxuICAgIG8gPSBkZWYoc2Vjb25kKVxuICB9IGVsc2Uge1xuICAgIC8vIE5PVEU6IGd1bHAgbXVzdCBiZSBsb2NhbGx5IGluc3RhbGxlZCAocmVsYXRpdmUgdG8gZ3VscGZpbGUuanMgLyBjd2QpXG4gICAgaWYgKGlzTG9jYWwoJ2d1bHAnLCB0cnVlKSkge1xuICAgICAgZ3VscCA9IGd1bHBIZWxwaWZ5KG15UmVxdWlyZSgnZ3VscCcpKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJdCBzaG91bGQgbm90IGJlIHBvc3NpYmxlIHRvIHJ1biB0aGlzIGNvZGUuXG4gICAgICAvLyBCb3RoIGd1bHAgYW5kIGJldmVyYWdlLWNsaSBwcmV2ZW50IGl0IGZyb20gaGFwcGVuaW5nLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdHdWxwIGluc2lzdHMgb24gYSBsb2NhbCBub2RlX21vZHVsZXMvZ3VscCBpbnN0YWxsLicpXG4gICAgfVxuICAgIG8gPSBkZWYoZmlyc3QpXG4gIH1cblxuICBndWxwLnRhc2soJ2JldmVyYWdlJywgJ1RoZSByZWNpcGUgb2YgdGhpcyBiZXZlcmFnZS4nLCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ1xcbkN1cnJlbnQgYmV2ZXJhZ2Ugb3B0aW9uczonKVxuICAgIGNvbnNvbGUubG9nKCdcXG4nICsgSlNPTi5zdHJpbmdpZnkobywgbnVsbCwgMikgKyAnXFxuJylcbiAgfSlcblxuICBpZiAocGtnLnNjcmlwdHMpIHtcbiAgICBpZiAoby5zY3JpcHRzKSByZXEoJ2d1bHAtbnBtLXJ1bicpKGd1bHAsIG8uc2NyaXB0cylcblxuICAgIGlmIChvLnRlc3QgJiYgcGtnLnNjcmlwdHMudGVzdCkge1xuICAgICAgcmVxKCdndWxwLW5wbS10ZXN0JykoZ3VscCwgby50ZXN0KVxuICAgIH1cbiAgfVxuXG4gIGlmIChvLnNvdXJjZWdhdGUgJiYgby5zb3VyY2VnYXRlLmxlbmd0aCkge1xuICAgIG8uc291cmNlb3B0ID0gby5zb3VyY2VvcHQgfHwge31cbiAgICByZXEoJ2hhbC1yYycpKHBpY2sobywgWydzb3VyY2VnYXRlJywgJ3NvdXJjZW9wdCddKSwgZ3VscClcbiAgfVxuXG4gIGlmIChvLmhhcnApIHJlcSgnZ3VscC1oYXJwJykoZ3VscCwgcGljayhvLCBbJ2hhcnAnXSkpXG5cbiAgaWYgKG8uY2F1c2FsaXR5KSByZXEoJ2d1bHAtY2F1c2UnKShndWxwLCBvLmNhdXNhbGl0eSlcblxuICByZXR1cm4gZ3VscFxufVxuIl19