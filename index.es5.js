'use strict';

require('source-map-support/register');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _sourcegate = require('sourcegate');

var _sourcegate2 = _interopRequireDefault(_sourcegate);

var _beGoods = require('be-goods');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function req(name) {
  if ((0, _beGoods.isLocal)(name)) {
    return (0, _beGoods.myRequire)(name);
  } else {
    if (_ramda2.default.not(_ramda2.default.contains(name, ['hal-rc', 'gulp-cause', 'gulp-npm-run']))) {
      // the above list of exceptions contains modules that will remain bundled as beverage dependencies
      _beGoods.logger.warn('Please install ' + name + ' as a devDependency, future beverage will not buldle it.');
    }
    return require(name);
  }
}

// NOTE: gulp is a dependency (rather than devDependency) on purpose (a fallback default)
// TODO: review if / how this works (via be-goods or hal-rc?) -- give a warning if used?
// beverage-cli is using this as a fallback -- maybe that's where the dependency should be?

function def() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  opts.dotBeverage = opts.dotBeverage || ['node_modules/beverage/node_modules/hal-rc', '.'];

  var o = (0, _sourcegate2.default)([{
    build: 'build', // TODO: remove this after the deprecations are phased out
    scripts: {
      requireStrict: true
    }
  }].concat(opts.dotBeverage.map(function (file) {
    return file + '/.beverage';
  }), opts));

  // TODO: becomes `if (isLocal('gulp-npm-test'))` after the deprecations are phased out
  if (o.hasOwnProperty('test') || (0, _beGoods.isLocal)('gulp-npm-test')) {
    // gulp-npm-test does testing better than gulp-npm-run
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

module.exports = function (gulpIn, opts) {
  var o = def(opts);
  var gulp = (0, _beGoods.gulpHelpify)(gulpIn);

  gulp.task('beverage', 'The recipe of this beverage.', function () {
    console.log('\nCurrent beverage options:');
    console.log('\n' + JSON.stringify(o, null, 2) + '\n');
  });

  if (_beGoods.pkg.scripts) {
    if (o.scripts) req('gulp-npm-run')(gulp, o.scripts);

    if (o.test && _beGoods.pkg.scripts.test) {
      if (o.testWatch) {
        // TODO: this whole if should be deleted
        _beGoods.logger.warn('Option testWatch is deprecated, use test.watch instead.');
        o.test.watch = o.testWatch;
      }
      req('gulp-npm-test')(gulp, o.test);
    }

    if (o.buildWatch && o.scripts) {
      // TODO: this whole if should be deleted as it's redundant
      _beGoods.logger.warn('The build & buildWatch options are deprecated, use causality instead.');
      gulp.task(o.build + ':watch', o.buildWatch.toString(), function () {
        return gulp.watch(o.buildWatch, [o.build]);
      });
    }
  }

  if (o.sourcegate && o.sourcegate.length) {
    o.sourceopt = o.sourceopt || {};
    // TODO: the rest of this as far as the req is temporary, for graceful upgrade...
    // delete afterwards
    var convert = { 'sourcegateModule': 'module',
      'sourcegatePrefix': 'prefix',
      'sourcegatePreset': 'preset',
      'sourcegateWatch': 'watch' };
    if (_ramda2.default.keys(_ramda2.default.pick(_ramda2.default.keys(convert), o)).length) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _ramda2.default.keys(convert)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          if (o.hasOwnProperty(key)) {
            var val = convert[key];
            o.sourceopt[val] = o[key];
            _beGoods.logger.warn('Deprecated ' + key + ' option, use sourceopt.' + val + ' instead.');
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
    req('hal-rc')(_ramda2.default.pick(['sourcegate', 'sourceopt'], o), gulp);
  }

  if (o.harp) req('gulp-harp')(gulp, _ramda2.default.pick(['harp'], o));

  if (o.causality) req('gulp-cause')(gulp, o.causality);

  return gulp;
};

//# sourceMappingURL=data:application/json;base64,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QkFBZSxHQUFHLCtCQUEwQixHQUFHLGVBQVksQ0FBQTtXQUN2RTtTQUNGOzs7Ozs7Ozs7Ozs7Ozs7S0FDRjtBQUNELE9BQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBRSxJQUFJLENBQUMsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7R0FDNUQ7O0FBRUQsTUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUsZ0JBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTs7QUFFdkQsTUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFBOztBQUVyRCxTQUFPLElBQUksQ0FBQTtDQUNaLENBQUEiLCJmaWxlIjoiaW5kZXguZXM1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInXG5cbi8vIE5PVEU6IGd1bHAgaXMgYSBkZXBlbmRlbmN5IChyYXRoZXIgdGhhbiBkZXZEZXBlbmRlbmN5KSBvbiBwdXJwb3NlIChhIGZhbGxiYWNrIGRlZmF1bHQpXG4vLyBUT0RPOiByZXZpZXcgaWYgLyBob3cgdGhpcyB3b3JrcyAodmlhIGJlLWdvb2RzIG9yIGhhbC1yYz8pIC0tIGdpdmUgYSB3YXJuaW5nIGlmIHVzZWQ/XG4vLyBiZXZlcmFnZS1jbGkgaXMgdXNpbmcgdGhpcyBhcyBhIGZhbGxiYWNrIC0tIG1heWJlIHRoYXQncyB3aGVyZSB0aGUgZGVwZW5kZW5jeSBzaG91bGQgYmU/XG5pbXBvcnQgUiBmcm9tICdyYW1kYSdcbmltcG9ydCBzb3VyY2VnYXRlIGZyb20gJ3NvdXJjZWdhdGUnXG5pbXBvcnQge3BrZywgaXNMb2NhbCwgbXlSZXF1aXJlLCBndWxwSGVscGlmeSwgbG9nZ2VyfSBmcm9tICdiZS1nb29kcydcblxuZnVuY3Rpb24gcmVxIChuYW1lKSB7XG4gIGlmIChpc0xvY2FsKG5hbWUpKSB7XG4gICAgcmV0dXJuIG15UmVxdWlyZShuYW1lKVxuICB9IGVsc2Uge1xuICAgIGlmIChSLm5vdChSLmNvbnRhaW5zKG5hbWUsIFsnaGFsLXJjJywgJ2d1bHAtY2F1c2UnLCAnZ3VscC1ucG0tcnVuJ10pKSkge1xuICAgICAgLy8gdGhlIGFib3ZlIGxpc3Qgb2YgZXhjZXB0aW9ucyBjb250YWlucyBtb2R1bGVzIHRoYXQgd2lsbCByZW1haW4gYnVuZGxlZCBhcyBiZXZlcmFnZSBkZXBlbmRlbmNpZXNcbiAgICAgIGxvZ2dlci53YXJuKGBQbGVhc2UgaW5zdGFsbCAke25hbWV9IGFzIGEgZGV2RGVwZW5kZW5jeSwgZnV0dXJlIGJldmVyYWdlIHdpbGwgbm90IGJ1bGRsZSBpdC5gKVxuICAgIH1cbiAgICByZXR1cm4gcmVxdWlyZShuYW1lKVxuICB9XG59XG5cbmZ1bmN0aW9uIGRlZiAob3B0cyA9IHt9KSB7XG4gIG9wdHMuZG90QmV2ZXJhZ2UgPSBvcHRzLmRvdEJldmVyYWdlIHx8IFtcbiAgICAnbm9kZV9tb2R1bGVzL2JldmVyYWdlL25vZGVfbW9kdWxlcy9oYWwtcmMnLFxuICAgICcuJ1xuICBdXG5cbiAgbGV0IG8gPSBzb3VyY2VnYXRlKFt7XG4gICAgYnVpbGQ6ICdidWlsZCcsIC8vIFRPRE86IHJlbW92ZSB0aGlzIGFmdGVyIHRoZSBkZXByZWNhdGlvbnMgYXJlIHBoYXNlZCBvdXRcbiAgICBzY3JpcHRzOiB7XG4gICAgICByZXF1aXJlU3RyaWN0OiB0cnVlXG4gICAgfVxuICB9XS5jb25jYXQob3B0cy5kb3RCZXZlcmFnZS5tYXAoZmlsZSA9PiBmaWxlICsgJy8uYmV2ZXJhZ2UnKSwgb3B0cykpXG5cbiAgLy8gVE9ETzogYmVjb21lcyBgaWYgKGlzTG9jYWwoJ2d1bHAtbnBtLXRlc3QnKSlgIGFmdGVyIHRoZSBkZXByZWNhdGlvbnMgYXJlIHBoYXNlZCBvdXRcbiAgaWYgKG8uaGFzT3duUHJvcGVydHkoJ3Rlc3QnKSB8fCBpc0xvY2FsKCdndWxwLW5wbS10ZXN0JykpIHtcbiAgICAvLyBndWxwLW5wbS10ZXN0IGRvZXMgdGVzdGluZyBiZXR0ZXIgdGhhbiBndWxwLW5wbS1ydW5cbiAgICByZXR1cm4gc291cmNlZ2F0ZShbe1xuICAgICAgc2NyaXB0czoge2V4Y2x1ZGU6IFsndGVzdCddfSxcbiAgICAgIHRlc3Q6IHtcbiAgICAgICAgdGVzdHNSZTogJ1xcXFwuc3BlY1xcXFwuY29mZmVlJCdcbiAgICAgIH1cbiAgICB9LCBvXSlcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGd1bHBJbiwgb3B0cykge1xuICBsZXQgbyA9IGRlZihvcHRzKVxuICBsZXQgZ3VscCA9IGd1bHBIZWxwaWZ5KGd1bHBJbilcblxuICBndWxwLnRhc2soJ2JldmVyYWdlJywgJ1RoZSByZWNpcGUgb2YgdGhpcyBiZXZlcmFnZS4nLCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ1xcbkN1cnJlbnQgYmV2ZXJhZ2Ugb3B0aW9uczonKVxuICAgIGNvbnNvbGUubG9nKCdcXG4nICsgSlNPTi5zdHJpbmdpZnkobywgbnVsbCwgMikgKyAnXFxuJylcbiAgfSlcblxuICBpZiAocGtnLnNjcmlwdHMpIHtcbiAgICBpZiAoby5zY3JpcHRzKSByZXEoJ2d1bHAtbnBtLXJ1bicpKGd1bHAsIG8uc2NyaXB0cylcblxuICAgIGlmIChvLnRlc3QgJiYgcGtnLnNjcmlwdHMudGVzdCkge1xuICAgICAgaWYgKG8udGVzdFdhdGNoKSB7XG4gICAgICAgIC8vIFRPRE86IHRoaXMgd2hvbGUgaWYgc2hvdWxkIGJlIGRlbGV0ZWRcbiAgICAgICAgbG9nZ2VyLndhcm4oJ09wdGlvbiB0ZXN0V2F0Y2ggaXMgZGVwcmVjYXRlZCwgdXNlIHRlc3Qud2F0Y2ggaW5zdGVhZC4nKVxuICAgICAgICBvLnRlc3Qud2F0Y2ggPSBvLnRlc3RXYXRjaFxuICAgICAgfVxuICAgICAgcmVxKCdndWxwLW5wbS10ZXN0JykoZ3VscCwgby50ZXN0KVxuICAgIH1cblxuICAgIGlmIChvLmJ1aWxkV2F0Y2ggJiYgby5zY3JpcHRzKSB7XG4gICAgICAvLyBUT0RPOiB0aGlzIHdob2xlIGlmIHNob3VsZCBiZSBkZWxldGVkIGFzIGl0J3MgcmVkdW5kYW50XG4gICAgICBsb2dnZXIud2FybignVGhlIGJ1aWxkICYgYnVpbGRXYXRjaCBvcHRpb25zIGFyZSBkZXByZWNhdGVkLCB1c2UgY2F1c2FsaXR5IGluc3RlYWQuJylcbiAgICAgIGd1bHAudGFzayhvLmJ1aWxkICsgJzp3YXRjaCcsIG8uYnVpbGRXYXRjaC50b1N0cmluZygpLCAoKSA9PlxuICAgICAgICBndWxwLndhdGNoKG8uYnVpbGRXYXRjaCwgW28uYnVpbGRdKVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGlmIChvLnNvdXJjZWdhdGUgJiYgby5zb3VyY2VnYXRlLmxlbmd0aCkge1xuICAgIG8uc291cmNlb3B0ID0gby5zb3VyY2VvcHQgfHwge31cbiAgICAvLyBUT0RPOiB0aGUgcmVzdCBvZiB0aGlzIGFzIGZhciBhcyB0aGUgcmVxIGlzIHRlbXBvcmFyeSwgZm9yIGdyYWNlZnVsIHVwZ3JhZGUuLi5cbiAgICAvLyBkZWxldGUgYWZ0ZXJ3YXJkc1xuICAgIGxldCBjb252ZXJ0ID0geydzb3VyY2VnYXRlTW9kdWxlJzogJ21vZHVsZScsXG4gICAgICAgICAgICAgICAgICAgJ3NvdXJjZWdhdGVQcmVmaXgnOiAncHJlZml4JyxcbiAgICAgICAgICAgICAgICAgICAnc291cmNlZ2F0ZVByZXNldCc6ICdwcmVzZXQnLFxuICAgICAgICAgICAgICAgICAgICdzb3VyY2VnYXRlV2F0Y2gnOiAnd2F0Y2gnfVxuICAgIGlmIChSLmtleXMoUi5waWNrKFIua2V5cyhjb252ZXJ0KSwgbykpLmxlbmd0aCkge1xuICAgICAgZm9yIChsZXQga2V5IG9mIFIua2V5cyhjb252ZXJ0KSkge1xuICAgICAgICBpZiAoby5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgbGV0IHZhbCA9IGNvbnZlcnRba2V5XVxuICAgICAgICAgIG8uc291cmNlb3B0W3ZhbF0gPSBvW2tleV1cbiAgICAgICAgICBsb2dnZXIud2FybihgRGVwcmVjYXRlZCAke2tleX0gb3B0aW9uLCB1c2Ugc291cmNlb3B0LiR7dmFsfSBpbnN0ZWFkLmApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmVxKCdoYWwtcmMnKShSLnBpY2soWydzb3VyY2VnYXRlJywgJ3NvdXJjZW9wdCddLCBvKSwgZ3VscClcbiAgfVxuXG4gIGlmIChvLmhhcnApIHJlcSgnZ3VscC1oYXJwJykoZ3VscCwgUi5waWNrKFsnaGFycCddLCBvKSlcblxuICBpZiAoby5jYXVzYWxpdHkpIHJlcSgnZ3VscC1jYXVzZScpKGd1bHAsIG8uY2F1c2FsaXR5KVxuXG4gIHJldHVybiBndWxwXG59XG4iXX0=