'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('source-map-support/register');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _sourcegate = require('sourcegate');

var _sourcegate2 = _interopRequireDefault(_sourcegate);

var _beGoods = require('be-goods');

function req(name) {
  if (_beGoods.isLocal(name)) {
    return _beGoods.myRequire(name);
  } else {
    if (_ramda2['default'].not(_ramda2['default'].contains(name, ['hal-rc', 'gulp-cause', 'gulp-npm-run']))) {
      // the above list of exceptions contains modules that will remain bundled as beverage dependencies
      _beGoods.logger.warn('Please install ' + name + ' as a devDependency, future beverage will not buldle it.');
    }
    return require(name);
  }
}

function def() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  opts.dotBeverage = opts.dotBeverage || ['node_modules/beverage/node_modules/hal-rc', '.'];

  var o = _sourcegate2['default']([{
    build: 'build', // TODO: remove this after the deprecations are phased out
    scripts: {
      requireStrict: true
    }
  }].concat(opts.dotBeverage.map(function (file) {
    return file + '/.beverage';
  }), opts));

  // TODO: becomes `if (isLocal('gulp-npm-test'))` after the deprecations are phased out
  if (o.hasOwnProperty('test') || _beGoods.isLocal('gulp-npm-test')) {
    // gulp-npm-test does testing better than gulp-npm-run
    return _sourcegate2['default']([{
      scripts: { exclude: ['test'] },
      test: {
        testsRe: /\.spec\.coffee$/
      }
    }, o]);
  } else {
    return o;
  }
}

exports['default'] = function (gulpIn, opts) {
  var o = def(opts);
  var gulp = _beGoods.gulpHelpify(gulpIn);

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
    if (_ramda2['default'].keys(_ramda2['default'].pick(_ramda2['default'].keys(convert), o)).length) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _ramda2['default'].keys(convert)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
    req('hal-rc')(_ramda2['default'].pick(['sourcegate', 'sourceopt'], o), gulp);
  }

  if (o.harp) req('gulp-harp')(gulp, _ramda2['default'].pick(['harp'], o));

  if (o.causality) req('gulp-cause')(gulp, o.causality);

  return gulp;
};

module.exports = exports['default'];

//# sourceMappingURL=data:application/json;base64,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SSxDQUFDLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO0dBQzVEOztBQUVELE1BQUksQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLG1CQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7O0FBRXZELE1BQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQTs7QUFFckQsU0FBTyxJQUFJLENBQUE7Q0FDWiIsImZpbGUiOiJpbmRleC5lczUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3RlcidcblxuaW1wb3J0IFIgZnJvbSAncmFtZGEnXG5pbXBvcnQgc291cmNlZ2F0ZSBmcm9tICdzb3VyY2VnYXRlJ1xuaW1wb3J0IHtwa2csIGlzTG9jYWwsIG15UmVxdWlyZSwgZ3VscEhlbHBpZnksIGxvZ2dlcn0gZnJvbSAnYmUtZ29vZHMnXG5cbmZ1bmN0aW9uIHJlcSAobmFtZSkge1xuICBpZiAoaXNMb2NhbChuYW1lKSkge1xuICAgIHJldHVybiBteVJlcXVpcmUobmFtZSlcbiAgfSBlbHNlIHtcbiAgICBpZiAoUi5ub3QoUi5jb250YWlucyhuYW1lLCBbJ2hhbC1yYycsICdndWxwLWNhdXNlJywgJ2d1bHAtbnBtLXJ1biddKSkpIHtcbiAgICAgIC8vIHRoZSBhYm92ZSBsaXN0IG9mIGV4Y2VwdGlvbnMgY29udGFpbnMgbW9kdWxlcyB0aGF0IHdpbGwgcmVtYWluIGJ1bmRsZWQgYXMgYmV2ZXJhZ2UgZGVwZW5kZW5jaWVzXG4gICAgICBsb2dnZXIud2FybihgUGxlYXNlIGluc3RhbGwgJHtuYW1lfSBhcyBhIGRldkRlcGVuZGVuY3ksIGZ1dHVyZSBiZXZlcmFnZSB3aWxsIG5vdCBidWxkbGUgaXQuYClcbiAgICB9XG4gICAgcmV0dXJuIHJlcXVpcmUobmFtZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWYgKG9wdHMgPSB7fSkge1xuICBvcHRzLmRvdEJldmVyYWdlID0gb3B0cy5kb3RCZXZlcmFnZSB8fCBbXG4gICAgJ25vZGVfbW9kdWxlcy9iZXZlcmFnZS9ub2RlX21vZHVsZXMvaGFsLXJjJyxcbiAgICAnLidcbiAgXVxuXG4gIGxldCBvID0gc291cmNlZ2F0ZShbe1xuICAgIGJ1aWxkOiAnYnVpbGQnLCAvLyBUT0RPOiByZW1vdmUgdGhpcyBhZnRlciB0aGUgZGVwcmVjYXRpb25zIGFyZSBwaGFzZWQgb3V0XG4gICAgc2NyaXB0czoge1xuICAgICAgcmVxdWlyZVN0cmljdDogdHJ1ZVxuICAgIH1cbiAgfV0uY29uY2F0KG9wdHMuZG90QmV2ZXJhZ2UubWFwKGZpbGUgPT4gZmlsZSArICcvLmJldmVyYWdlJyksIG9wdHMpKVxuXG4gIC8vIFRPRE86IGJlY29tZXMgYGlmIChpc0xvY2FsKCdndWxwLW5wbS10ZXN0JykpYCBhZnRlciB0aGUgZGVwcmVjYXRpb25zIGFyZSBwaGFzZWQgb3V0XG4gIGlmIChvLmhhc093blByb3BlcnR5KCd0ZXN0JykgfHwgaXNMb2NhbCgnZ3VscC1ucG0tdGVzdCcpKSB7XG4gICAgLy8gZ3VscC1ucG0tdGVzdCBkb2VzIHRlc3RpbmcgYmV0dGVyIHRoYW4gZ3VscC1ucG0tcnVuXG4gICAgcmV0dXJuIHNvdXJjZWdhdGUoW3tcbiAgICAgIHNjcmlwdHM6IHtleGNsdWRlOiBbJ3Rlc3QnXX0sXG4gICAgICB0ZXN0OiB7XG4gICAgICAgIHRlc3RzUmU6IC9cXC5zcGVjXFwuY29mZmVlJC9cbiAgICAgIH1cbiAgICB9LCBvXSlcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChndWxwSW4sIG9wdHMpIHtcbiAgbGV0IG8gPSBkZWYob3B0cylcbiAgbGV0IGd1bHAgPSBndWxwSGVscGlmeShndWxwSW4pXG5cbiAgZ3VscC50YXNrKCdiZXZlcmFnZScsICdUaGUgcmVjaXBlIG9mIHRoaXMgYmV2ZXJhZ2UuJywgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdcXG5DdXJyZW50IGJldmVyYWdlIG9wdGlvbnM6JylcbiAgICBjb25zb2xlLmxvZygnXFxuJyArIEpTT04uc3RyaW5naWZ5KG8sIG51bGwsIDIpICsgJ1xcbicpXG4gIH0pXG5cbiAgaWYgKHBrZy5zY3JpcHRzKSB7XG4gICAgaWYgKG8uc2NyaXB0cykgcmVxKCdndWxwLW5wbS1ydW4nKShndWxwLCBvLnNjcmlwdHMpXG5cbiAgICBpZiAoby50ZXN0ICYmIHBrZy5zY3JpcHRzLnRlc3QpIHtcbiAgICAgIGlmIChvLnRlc3RXYXRjaCkge1xuICAgICAgICAvLyBUT0RPOiB0aGlzIHdob2xlIGlmIHNob3VsZCBiZSBkZWxldGVkXG4gICAgICAgIGxvZ2dlci53YXJuKCdPcHRpb24gdGVzdFdhdGNoIGlzIGRlcHJlY2F0ZWQsIHVzZSB0ZXN0LndhdGNoIGluc3RlYWQuJylcbiAgICAgICAgby50ZXN0LndhdGNoID0gby50ZXN0V2F0Y2hcbiAgICAgIH1cbiAgICAgIHJlcSgnZ3VscC1ucG0tdGVzdCcpKGd1bHAsIG8udGVzdClcbiAgICB9XG5cbiAgICBpZiAoby5idWlsZFdhdGNoICYmIG8uc2NyaXB0cykge1xuICAgICAgLy8gVE9ETzogdGhpcyB3aG9sZSBpZiBzaG91bGQgYmUgZGVsZXRlZCBhcyBpdCdzIHJlZHVuZGFudFxuICAgICAgbG9nZ2VyLndhcm4oJ1RoZSBidWlsZCAmIGJ1aWxkV2F0Y2ggb3B0aW9ucyBhcmUgZGVwcmVjYXRlZCwgdXNlIGNhdXNhbGl0eSBpbnN0ZWFkLicpXG4gICAgICBndWxwLnRhc2soby5idWlsZCArICc6d2F0Y2gnLCBvLmJ1aWxkV2F0Y2gudG9TdHJpbmcoKSwgKCkgPT5cbiAgICAgICAgZ3VscC53YXRjaChvLmJ1aWxkV2F0Y2gsIFtvLmJ1aWxkXSlcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBpZiAoby5zb3VyY2VnYXRlICYmIG8uc291cmNlZ2F0ZS5sZW5ndGgpIHtcbiAgICBvLnNvdXJjZW9wdCA9IG8uc291cmNlb3B0IHx8IHt9XG4gICAgLy8gVE9ETzogdGhlIHJlc3Qgb2YgdGhpcyBhcyBmYXIgYXMgdGhlIHJlcSBpcyB0ZW1wb3JhcnksIGZvciBncmFjZWZ1bCB1cGdyYWRlLi4uXG4gICAgLy8gZGVsZXRlIGFmdGVyd2FyZHNcbiAgICBsZXQgY29udmVydCA9IHsnc291cmNlZ2F0ZU1vZHVsZSc6ICdtb2R1bGUnLFxuICAgICAgICAgICAgICAgICAgICdzb3VyY2VnYXRlUHJlZml4JzogJ3ByZWZpeCcsXG4gICAgICAgICAgICAgICAgICAgJ3NvdXJjZWdhdGVQcmVzZXQnOiAncHJlc2V0JyxcbiAgICAgICAgICAgICAgICAgICAnc291cmNlZ2F0ZVdhdGNoJzogJ3dhdGNoJ31cbiAgICBpZiAoUi5rZXlzKFIucGljayhSLmtleXMoY29udmVydCksIG8pKS5sZW5ndGgpIHtcbiAgICAgIGZvciAobGV0IGtleSBvZiBSLmtleXMoY29udmVydCkpIHtcbiAgICAgICAgaWYgKG8uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGxldCB2YWwgPSBjb252ZXJ0W2tleV1cbiAgICAgICAgICBvLnNvdXJjZW9wdFt2YWxdID0gb1trZXldXG4gICAgICAgICAgbG9nZ2VyLndhcm4oYERlcHJlY2F0ZWQgJHtrZXl9IG9wdGlvbiwgdXNlIHNvdXJjZW9wdC4ke3ZhbH0gaW5zdGVhZC5gKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJlcSgnaGFsLXJjJykoUi5waWNrKFsnc291cmNlZ2F0ZScsICdzb3VyY2VvcHQnXSwgbyksIGd1bHApXG4gIH1cblxuICBpZiAoby5oYXJwKSByZXEoJ2d1bHAtaGFycCcpKGd1bHAsIFIucGljayhbJ2hhcnAnXSwgbykpXG5cbiAgaWYgKG8uY2F1c2FsaXR5KSByZXEoJ2d1bHAtY2F1c2UnKShndWxwLCBvLmNhdXNhbGl0eSlcblxuICByZXR1cm4gZ3VscFxufVxuIl19