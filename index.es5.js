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
    console.warn('Package ' + name + ' not found as local dependency, fallback to beverage.');
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

//# sourceMappingURL=data:application/json;base64,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c291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnc291cmNlLW1hcC1zdXBwb3J0JykuaW5zdGFsbCgpXG5cbmltcG9ydCBSIGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBzb3VyY2VnYXRlIGZyb20gJ3NvdXJjZWdhdGUnXG5pbXBvcnQge3BrZywgZ3VscEhlbHBpZnl9IGZyb20gJ2JlLWdvb2RzJ1xuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJ1xuXG52YXIgbG9nZ2VyID0gcmVxdWlyZSgndHJhY2VyJykuY29uc29sZSh7XG4gICdmaWx0ZXJzJzogeyd3YXJuJzogY2hhbGsueWVsbG93LCAnZXJyb3InOiBjaGFsay5yZWR9LFxuICAnZm9ybWF0JzogJzxiZXZlcmFnZS97e2ZpbGV9fTp7e2xpbmV9fT4ge3ttZXNzYWdlfX0nXG59KVxuXG5mdW5jdGlvbiByZXEgKG5hbWUpIHtcbiAgbGV0IGRlcCA9IFIuaGFzKG5hbWUpXG4gIGxldCBsb2NhbCA9IGRlcChwa2cuZGVwZW5kZW5jaWVzIHx8IHt9KSB8fCBkZXAocGtnLmRldkRlcGVuZGVuY2llcyB8fCB7fSlcbiAgaWYgKGxvY2FsKSB7XG4gICAgbGV0IHdoZXJlID0gcGF0aC5ub3JtYWxpemUoYCR7cHJvY2Vzcy5jd2QoKX0vbm9kZV9tb2R1bGVzLyR7bmFtZX1gKVxuICAgIHJldHVybiByZXF1aXJlKHBhdGguam9pbih3aGVyZSwgcmVxdWlyZShwYXRoLmpvaW4od2hlcmUsICdwYWNrYWdlLmpzb24nKSkubWFpbikpXG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS53YXJuKGBQYWNrYWdlICR7bmFtZX0gbm90IGZvdW5kIGFzIGxvY2FsIGRlcGVuZGVuY3ksIGZhbGxiYWNrIHRvIGJldmVyYWdlLmApXG4gICAgcmV0dXJuIHJlcXVpcmUobmFtZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWYgKG9wdHMgPSB7fSkge1xuICAgIG9wdHMuZG90QmV2ZXJhZ2UgPSBvcHRzLmRvdEJldmVyYWdlIHx8IFtcbiAgICAgICdub2RlX21vZHVsZXMvYmV2ZXJhZ2Uvbm9kZV9tb2R1bGVzL2hhbC1yYycsXG4gICAgICAnLidcbiAgICBdXG5cbiAgICBsZXQgbyA9IHNvdXJjZWdhdGUoW3tcbiAgICAgIGJ1aWxkOiAnYnVpbGQnLFxuICAgICAgc2NyaXB0czoge1xuICAgICAgICBleGNsdWRlOiBbJ3Rlc3QnXSwgLy8gYmVjYXVzZSBndWxwLW5wbS10ZXN0IGRvZXMgdGVzdGluZyBiZXR0ZXIgdGhhbiBndWxwLW5wbS1ydW5cbiAgICAgICAgcmVxdWlyZVN0cmljdDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHRlc3Q6IHtcbiAgICAgICAgdGVzdHNSZTogL1xcLnNwZWNcXC5jb2ZmZWUkLyAvLyBUT0RPOiBtb3ZlIHRvIC5iZXZlcmFnZSBhZnRlciBjaGFuZ2luZyBpdCB0byBhIGdsb2JcbiAgICAgIH1cbiAgICB9XS5jb25jYXQob3B0cy5kb3RCZXZlcmFnZS5tYXAoZmlsZSA9PiBmaWxlICsgJy8uYmV2ZXJhZ2UnKSwgb3B0cykpXG5cbiAgICBpZiAoby5zY3JpcHRzLmluY2x1ZGUgJiYgby5zY3JpcHRzLmluY2x1ZGVbby5idWlsZF0pIHtcbiAgICAgIG8gPSBzb3VyY2VnYXRlKFtvLCB7c2NyaXB0czoge3JlcXVpcmU6IFtvLmJ1aWxkXX19XSlcbiAgICB9XG5cbiAgICByZXR1cm4gb1xuICB9XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChndWxwSW4sIG9wdHMpIHtcbiAgbGV0IG8gPSBkZWYob3B0cylcbiAgbGV0IGd1bHAgPSBndWxwSGVscGlmeShndWxwSW4pXG5cbiAgZ3VscC50YXNrKCdiZXZlcmFnZScsICdUaGUgcmVjaXBlIG9mIHRoaXMgYmV2ZXJhZ2UuJywgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdcXG5DdXJyZW50IGJldmVyYWdlIG9wdGlvbnM6JylcbiAgICBjb25zb2xlLmxvZygnXFxuJyArIEpTT04uc3RyaW5naWZ5KG8sIG51bGwsIDIpICsgJ1xcbicpXG4gIH0pXG5cbiAgaWYgKHBrZy5zY3JpcHRzKSB7XG4gICAgaWYgKG8uc2NyaXB0cykgcmVxKCdndWxwLW5wbS1ydW4nKShndWxwLCBvLnNjcmlwdHMpXG5cbiAgICBpZiAoby50ZXN0ICYmIHBrZy5zY3JpcHRzLnRlc3QpIHtcbiAgICAgIGlmIChvLnRlc3RXYXRjaCkge1xuICAgICAgICAvLyBUT0RPOiB0aGlzIHdob2xlIGlmIHNob3VsZCBiZSBkZWxldGVkXG4gICAgICAgIGxvZ2dlci53YXJuKCdPcHRpb24gdGVzdFdhdGNoIGlzIGRlcHJlY2F0ZWQsIHVzZSB0ZXN0LndhdGNoIGluc3RlYWQuJylcbiAgICAgICAgby50ZXN0LndhdGNoID0gby50ZXN0V2F0Y2hcbiAgICAgIH1cbiAgICAgIHJlcSgnZ3VscC1ucG0tdGVzdCcpKGd1bHAsIG8udGVzdClcbiAgICB9XG5cbiAgICBpZiAoby5idWlsZFdhdGNoICYmIG8uc2NyaXB0cykge1xuICAgICAgLy8gVE9ETzogdGhpcyB3aG9sZSBpZiBzaG91bGQgYmUgZGVsZXRlZCBhcyBpdCdzIHJlZHVuZGFudFxuICAgICAgbG9nZ2VyLndhcm4oJ1RoZSBidWlsZCAmIGJ1aWxkV2F0Y2ggb3B0aW9ucyBhcmUgZGVwcmVjYXRlZCwgdXNlIGNhdXNhbGl0eSBpbnN0ZWFkLicpXG4gICAgICBndWxwLnRhc2soby5idWlsZCArICc6d2F0Y2gnLCBvLmJ1aWxkV2F0Y2gudG9TdHJpbmcoKSwgKCkgPT5cbiAgICAgICAgZ3VscC53YXRjaChvLmJ1aWxkV2F0Y2gsIFtvLmJ1aWxkXSlcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBpZiAoby5zb3VyY2VnYXRlICYmIG8uc291cmNlZ2F0ZS5sZW5ndGgpIHtcbiAgICBvLnNvdXJjZW9wdCA9IG8uc291cmNlb3B0IHx8IHt9XG4gICAgLy8gVE9ETzogdGhlIHJlc3Qgb2YgdGhpcyBhcyBmYXIgYXMgdGhlIHJlcSBpcyB0ZW1wb3JhcnksIGZvciBncmFjZWZ1bCB1cGdyYWRlLi4uXG4gICAgLy8gZGVsZXRlIGFmdGVyd2FyZHNcbiAgICBsZXQgY29udmVydCA9IHsnc291cmNlZ2F0ZU1vZHVsZSc6ICdtb2R1bGUnLFxuICAgICAgICAgICAgICAgICAgICdzb3VyY2VnYXRlUHJlZml4JzogJ3ByZWZpeCcsXG4gICAgICAgICAgICAgICAgICAgJ3NvdXJjZWdhdGVQcmVzZXQnOiAncHJlc2V0JyxcbiAgICAgICAgICAgICAgICAgICAnc291cmNlZ2F0ZVdhdGNoJzogJ3dhdGNoJ31cbiAgICBpZiAoUi5rZXlzKFIucGljayhSLmtleXMoY29udmVydCksIG8pKS5sZW5ndGgpIHtcbiAgICAgIGZvciAobGV0IGtleSBvZiBSLmtleXMoY29udmVydCkpIHtcbiAgICAgICAgaWYgKG9ba2V5XSkge1xuICAgICAgICAgIGxldCB2YWwgPSBjb252ZXJ0W2tleV1cbiAgICAgICAgICBvLnNvdXJjZW9wdFt2YWxdID0gb1trZXldXG4gICAgICAgICAgbG9nZ2VyLndhcm4oYERlcHJlY2F0ZWQgJHtrZXl9IG9wdGlvbiwgdXNlIHNvdXJjZW9wdC4ke3ZhbH0gaW5zdGVhZC5gKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJlcSgnaGFsLXJjJykoUi5waWNrKFsnc291cmNlZ2F0ZScsICdzb3VyY2VvcHQnXSwgbyksIGd1bHApXG4gIH1cblxuICBpZiAoby5oYXJwKSByZXEoJ2d1bHAtaGFycCcpKGd1bHAsIFIucGljayhbJ2hhcnAnXSwgbykpXG5cbiAgaWYgKG8uY2F1c2FsaXR5KSByZXEoJ2d1bHAtY2F1c2UnKShndWxwLCBvLmNhdXNhbGl0eSlcblxuICByZXR1cm4gZ3VscFxufVxuIl19