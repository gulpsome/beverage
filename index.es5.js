'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sourcegate = require('sourcegate');

var _sourcegate2 = _interopRequireDefault(_sourcegate);

var _beGoods = require('be-goods');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

require('source-map-support').install();

var logger = require('tracer').console({
  'filters': { 'warn': _chalk2['default'].yellow, 'error': _chalk2['default'].red },
  'format': '<beverage/{{file}}:{{line}}> {{message}}'
});

function req(name) {
  var dep = _ramda2['default'].has(name);
  var local = dep(_beGoods.pkg.dependencies || {}) || dep(_beGoods.pkg.devDependencies || {});
  if (local) {
    var where = _path2['default'].normalize(process.cwd() + '/node_modules/' + name);
    return require(_path2['default'].join(where, require(_path2['default'].join(where, 'package.json')).main));
  } else {
    if (_ramda2['default'].not(_ramda2['default'].contains(name, ['hal-rc', 'gulp-cause']))) {
      // the above list of exceptions contains modules that will remain bundled with beverage
      console.warn(_chalk2['default'].yellow('Please install ' + name + ' as a devDependency, future beverage will not buldle it.'));
    }
    return require(name);
  }
}

function def() {
  var opts = arguments[0] === undefined ? {} : arguments[0];

  opts.dotBeverage = opts.dotBeverage || ['node_modules/beverage/node_modules/hal-rc', '.'];

  var o = _sourcegate2['default']([{
    build: 'build',
    scripts: {
      exclude: ['test'], // because gulp-npm-test does testing better than gulp-npm-run
      requireStrict: true
    },
    test: {
      testsRe: /\.spec\.coffee$/ // TODO: move to .beverage after changing it to a glob
    }
  }].concat(opts.dotBeverage.map(function (file) {
    return file + '/.beverage';
  }), opts));

  if (o.scripts.include && o.scripts.include[o.build]) {
    o = _sourcegate2['default']([o, { scripts: { require: [o.build] } }]);
  }

  return o;
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
        logger.warn('Option testWatch is deprecated, use test.watch instead.');
        o.test.watch = o.testWatch;
      }
      req('gulp-npm-test')(gulp, o.test);
    }

    if (o.buildWatch && o.scripts) {
      // TODO: this whole if should be deleted as it's redundant
      logger.warn('The build & buildWatch options are deprecated, use causality instead.');
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

          if (o[key]) {
            var val = convert[key];
            o.sourceopt[val] = o[key];
            logger.warn('Deprecated ' + key + ' option, use sourceopt.' + val + ' instead.');
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

//# sourceMappingURL=data:application/json;base64,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LFNBQVMsRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQTs7QUFFckQsU0FBTyxJQUFJLENBQUE7Q0FDWiIsImZpbGUiOiJpbmRleC5lczUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCdzb3VyY2UtbWFwLXN1cHBvcnQnKS5pbnN0YWxsKClcblxuaW1wb3J0IFIgZnJvbSAncmFtZGEnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHNvdXJjZWdhdGUgZnJvbSAnc291cmNlZ2F0ZSdcbmltcG9ydCB7cGtnLCBndWxwSGVscGlmeX0gZnJvbSAnYmUtZ29vZHMnXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5cbnZhciBsb2dnZXIgPSByZXF1aXJlKCd0cmFjZXInKS5jb25zb2xlKHtcbiAgJ2ZpbHRlcnMnOiB7J3dhcm4nOiBjaGFsay55ZWxsb3csICdlcnJvcic6IGNoYWxrLnJlZH0sXG4gICdmb3JtYXQnOiAnPGJldmVyYWdlL3t7ZmlsZX19Ont7bGluZX19PiB7e21lc3NhZ2V9fSdcbn0pXG5cbmZ1bmN0aW9uIHJlcSAobmFtZSkge1xuICBsZXQgZGVwID0gUi5oYXMobmFtZSlcbiAgbGV0IGxvY2FsID0gZGVwKHBrZy5kZXBlbmRlbmNpZXMgfHwge30pIHx8IGRlcChwa2cuZGV2RGVwZW5kZW5jaWVzIHx8IHt9KVxuICBpZiAobG9jYWwpIHtcbiAgICBsZXQgd2hlcmUgPSBwYXRoLm5vcm1hbGl6ZShgJHtwcm9jZXNzLmN3ZCgpfS9ub2RlX21vZHVsZXMvJHtuYW1lfWApXG4gICAgcmV0dXJuIHJlcXVpcmUocGF0aC5qb2luKHdoZXJlLCByZXF1aXJlKHBhdGguam9pbih3aGVyZSwgJ3BhY2thZ2UuanNvbicpKS5tYWluKSlcbiAgfSBlbHNlIHtcbiAgICBpZiAoUi5ub3QoUi5jb250YWlucyhuYW1lLCBbJ2hhbC1yYycsICdndWxwLWNhdXNlJ10pKSkge1xuICAgICAgLy8gdGhlIGFib3ZlIGxpc3Qgb2YgZXhjZXB0aW9ucyBjb250YWlucyBtb2R1bGVzIHRoYXQgd2lsbCByZW1haW4gYnVuZGxlZCB3aXRoIGJldmVyYWdlXG4gICAgICBjb25zb2xlLndhcm4oY2hhbGsueWVsbG93KGBQbGVhc2UgaW5zdGFsbCAke25hbWV9IGFzIGEgZGV2RGVwZW5kZW5jeSwgZnV0dXJlIGJldmVyYWdlIHdpbGwgbm90IGJ1bGRsZSBpdC5gKSlcbiAgICB9XG4gICAgcmV0dXJuIHJlcXVpcmUobmFtZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWYgKG9wdHMgPSB7fSkge1xuICAgIG9wdHMuZG90QmV2ZXJhZ2UgPSBvcHRzLmRvdEJldmVyYWdlIHx8IFtcbiAgICAgICdub2RlX21vZHVsZXMvYmV2ZXJhZ2Uvbm9kZV9tb2R1bGVzL2hhbC1yYycsXG4gICAgICAnLidcbiAgICBdXG5cbiAgICBsZXQgbyA9IHNvdXJjZWdhdGUoW3tcbiAgICAgIGJ1aWxkOiAnYnVpbGQnLFxuICAgICAgc2NyaXB0czoge1xuICAgICAgICBleGNsdWRlOiBbJ3Rlc3QnXSwgLy8gYmVjYXVzZSBndWxwLW5wbS10ZXN0IGRvZXMgdGVzdGluZyBiZXR0ZXIgdGhhbiBndWxwLW5wbS1ydW5cbiAgICAgICAgcmVxdWlyZVN0cmljdDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHRlc3Q6IHtcbiAgICAgICAgdGVzdHNSZTogL1xcLnNwZWNcXC5jb2ZmZWUkLyAvLyBUT0RPOiBtb3ZlIHRvIC5iZXZlcmFnZSBhZnRlciBjaGFuZ2luZyBpdCB0byBhIGdsb2JcbiAgICAgIH1cbiAgICB9XS5jb25jYXQob3B0cy5kb3RCZXZlcmFnZS5tYXAoZmlsZSA9PiBmaWxlICsgJy8uYmV2ZXJhZ2UnKSwgb3B0cykpXG5cbiAgICBpZiAoby5zY3JpcHRzLmluY2x1ZGUgJiYgby5zY3JpcHRzLmluY2x1ZGVbby5idWlsZF0pIHtcbiAgICAgIG8gPSBzb3VyY2VnYXRlKFtvLCB7c2NyaXB0czoge3JlcXVpcmU6IFtvLmJ1aWxkXX19XSlcbiAgICB9XG5cbiAgICByZXR1cm4gb1xuICB9XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChndWxwSW4sIG9wdHMpIHtcbiAgbGV0IG8gPSBkZWYob3B0cylcbiAgbGV0IGd1bHAgPSBndWxwSGVscGlmeShndWxwSW4pXG5cbiAgZ3VscC50YXNrKCdiZXZlcmFnZScsICdUaGUgcmVjaXBlIG9mIHRoaXMgYmV2ZXJhZ2UuJywgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdcXG5DdXJyZW50IGJldmVyYWdlIG9wdGlvbnM6JylcbiAgICBjb25zb2xlLmxvZygnXFxuJyArIEpTT04uc3RyaW5naWZ5KG8sIG51bGwsIDIpICsgJ1xcbicpXG4gIH0pXG5cbiAgaWYgKHBrZy5zY3JpcHRzKSB7XG4gICAgaWYgKG8uc2NyaXB0cykgcmVxKCdndWxwLW5wbS1ydW4nKShndWxwLCBvLnNjcmlwdHMpXG5cbiAgICBpZiAoby50ZXN0ICYmIHBrZy5zY3JpcHRzLnRlc3QpIHtcbiAgICAgIGlmIChvLnRlc3RXYXRjaCkge1xuICAgICAgICAvLyBUT0RPOiB0aGlzIHdob2xlIGlmIHNob3VsZCBiZSBkZWxldGVkXG4gICAgICAgIGxvZ2dlci53YXJuKCdPcHRpb24gdGVzdFdhdGNoIGlzIGRlcHJlY2F0ZWQsIHVzZSB0ZXN0LndhdGNoIGluc3RlYWQuJylcbiAgICAgICAgby50ZXN0LndhdGNoID0gby50ZXN0V2F0Y2hcbiAgICAgIH1cbiAgICAgIHJlcSgnZ3VscC1ucG0tdGVzdCcpKGd1bHAsIG8udGVzdClcbiAgICB9XG5cbiAgICBpZiAoby5idWlsZFdhdGNoICYmIG8uc2NyaXB0cykge1xuICAgICAgLy8gVE9ETzogdGhpcyB3aG9sZSBpZiBzaG91bGQgYmUgZGVsZXRlZCBhcyBpdCdzIHJlZHVuZGFudFxuICAgICAgbG9nZ2VyLndhcm4oJ1RoZSBidWlsZCAmIGJ1aWxkV2F0Y2ggb3B0aW9ucyBhcmUgZGVwcmVjYXRlZCwgdXNlIGNhdXNhbGl0eSBpbnN0ZWFkLicpXG4gICAgICBndWxwLnRhc2soby5idWlsZCArICc6d2F0Y2gnLCBvLmJ1aWxkV2F0Y2gudG9TdHJpbmcoKSwgKCkgPT5cbiAgICAgICAgZ3VscC53YXRjaChvLmJ1aWxkV2F0Y2gsIFtvLmJ1aWxkXSlcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBpZiAoby5zb3VyY2VnYXRlICYmIG8uc291cmNlZ2F0ZS5sZW5ndGgpIHtcbiAgICBvLnNvdXJjZW9wdCA9IG8uc291cmNlb3B0IHx8IHt9XG4gICAgLy8gVE9ETzogdGhlIHJlc3Qgb2YgdGhpcyBhcyBmYXIgYXMgdGhlIHJlcSBpcyB0ZW1wb3JhcnksIGZvciBncmFjZWZ1bCB1cGdyYWRlLi4uXG4gICAgLy8gZGVsZXRlIGFmdGVyd2FyZHNcbiAgICBsZXQgY29udmVydCA9IHsnc291cmNlZ2F0ZU1vZHVsZSc6ICdtb2R1bGUnLFxuICAgICAgICAgICAgICAgICAgICdzb3VyY2VnYXRlUHJlZml4JzogJ3ByZWZpeCcsXG4gICAgICAgICAgICAgICAgICAgJ3NvdXJjZWdhdGVQcmVzZXQnOiAncHJlc2V0JyxcbiAgICAgICAgICAgICAgICAgICAnc291cmNlZ2F0ZVdhdGNoJzogJ3dhdGNoJ31cbiAgICBpZiAoUi5rZXlzKFIucGljayhSLmtleXMoY29udmVydCksIG8pKS5sZW5ndGgpIHtcbiAgICAgIGZvciAobGV0IGtleSBvZiBSLmtleXMoY29udmVydCkpIHtcbiAgICAgICAgaWYgKG9ba2V5XSkge1xuICAgICAgICAgIGxldCB2YWwgPSBjb252ZXJ0W2tleV1cbiAgICAgICAgICBvLnNvdXJjZW9wdFt2YWxdID0gb1trZXldXG4gICAgICAgICAgbG9nZ2VyLndhcm4oYERlcHJlY2F0ZWQgJHtrZXl9IG9wdGlvbiwgdXNlIHNvdXJjZW9wdC4ke3ZhbH0gaW5zdGVhZC5gKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJlcSgnaGFsLXJjJykoUi5waWNrKFsnc291cmNlZ2F0ZScsICdzb3VyY2VvcHQnXSwgbyksIGd1bHApXG4gIH1cblxuICBpZiAoby5oYXJwKSByZXEoJ2d1bHAtaGFycCcpKGd1bHAsIFIucGljayhbJ2hhcnAnXSwgbykpXG5cbiAgaWYgKG8uY2F1c2FsaXR5KSByZXEoJ2d1bHAtY2F1c2UnKShndWxwLCBvLmNhdXNhbGl0eSlcblxuICByZXR1cm4gZ3VscFxufVxuIl19