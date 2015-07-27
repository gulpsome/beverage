'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sourcegate = require('sourcegate');

var _sourcegate2 = _interopRequireDefault(_sourcegate);

var _stamina = require('stamina');

require('source-map-support').install();

var logger = require('tracer').console({
  'format': '<beverage/{{file}}:{{line}}> {{message}}'
});

function req(name) {
  var dep = _ramda2['default'].has(name);
  var local = dep(_stamina.pkg.dependencies || {}) || dep(_stamina.pkg.devDependencies || {});
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
  var gulp = _stamina.gulpHelpify(gulpIn);

  gulp.task('beverage', 'The recipe of this beverage.', function () {
    console.log('\nCurrent beverage options:');
    console.log('\n' + JSON.stringify(o, null, 2) + '\n');
  });

  if (_stamina.pkg.scripts) {
    if (o.scripts) req('gulp-npm-run')(gulp, o.scripts);

    if (o.test && _stamina.pkg.scripts.test) {
      if (o.testWatch) {
        // TODO: this whole if should be deleted
        logger.warn('Option testWatch is deprecated, please use test.watch instead.');
        o.test.watch = o.testWatch;
      }
      req('gulp-npm-test')(gulp, o.test);
    }

    if (o.buildWatch && o.scripts) {
      // TODO: this whole if should be deleted as it's redundant
      logger.warn('The build & buildWatch options are deprecated, use "causality" instead.');
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
            logger.warn('Deprecated ' + key + ' option, please use sourceopt.' + val + ' instead.');
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

//# sourceMappingURL=data:application/json;base64,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QUFRO0FBQzVCLHVCQUFpQixFQUFFLE9BQU8sRUFBQyxDQUFBO0FBQzFDLFFBQUksbUJBQUUsSUFBSSxDQUFDLG1CQUFFLElBQUksQ0FBQyxtQkFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7Ozs7OztBQUM3Qyw2QkFBZ0IsbUJBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyw4SEFBRTtjQUF4QixHQUFHOztBQUNWLGNBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ1YsZ0JBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUN0QixhQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUN6QixrQkFBTSxDQUFDLElBQUksaUJBQWUsR0FBRyxzQ0FBaUMsR0FBRyxlQUFZLENBQUE7V0FDOUU7U0FDRjs7Ozs7Ozs7Ozs7Ozs7O0tBQ0Y7QUFDRCxPQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsbUJBQUUsSUFBSSxDQUFDLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO0dBQzVEOztBQUVELE1BQUksQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLG1CQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7O0FBRXZELE1BQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQTs7QUFFckQsU0FBTyxJQUFJLENBQUE7Q0FDWiIsImZpbGUiOiJpbmRleC5lczUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCdzb3VyY2UtbWFwLXN1cHBvcnQnKS5pbnN0YWxsKClcblxuaW1wb3J0IFIgZnJvbSAncmFtZGEnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHNvdXJjZWdhdGUgZnJvbSAnc291cmNlZ2F0ZSdcbmltcG9ydCB7cGtnLCBndWxwSGVscGlmeX0gZnJvbSAnc3RhbWluYSdcblxudmFyIGxvZ2dlciA9IHJlcXVpcmUoJ3RyYWNlcicpLmNvbnNvbGUoe1xuICAnZm9ybWF0JzogJzxiZXZlcmFnZS97e2ZpbGV9fTp7e2xpbmV9fT4ge3ttZXNzYWdlfX0nXG59KVxuXG5mdW5jdGlvbiByZXEgKG5hbWUpIHtcbiAgbGV0IGRlcCA9IFIuaGFzKG5hbWUpXG4gIGxldCBsb2NhbCA9IGRlcChwa2cuZGVwZW5kZW5jaWVzIHx8IHt9KSB8fCBkZXAocGtnLmRldkRlcGVuZGVuY2llcyB8fCB7fSlcbiAgaWYgKGxvY2FsKSB7XG4gICAgbGV0IHdoZXJlID0gcGF0aC5ub3JtYWxpemUoYCR7cHJvY2Vzcy5jd2QoKX0vbm9kZV9tb2R1bGVzLyR7bmFtZX1gKVxuICAgIHJldHVybiByZXF1aXJlKHBhdGguam9pbih3aGVyZSwgcmVxdWlyZShwYXRoLmpvaW4od2hlcmUsICdwYWNrYWdlLmpzb24nKSkubWFpbikpXG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS53YXJuKGBQYWNrYWdlICR7bmFtZX0gbm90IGZvdW5kIGFzIGxvY2FsIGRlcGVuZGVuY3ksIGZhbGxiYWNrIHRvIGJldmVyYWdlLmApXG4gICAgcmV0dXJuIHJlcXVpcmUobmFtZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWYgKG9wdHMgPSB7fSkge1xuICAgIG9wdHMuZG90QmV2ZXJhZ2UgPSBvcHRzLmRvdEJldmVyYWdlIHx8IFtcbiAgICAgICdub2RlX21vZHVsZXMvYmV2ZXJhZ2Uvbm9kZV9tb2R1bGVzL2hhbC1yYycsXG4gICAgICAnLidcbiAgICBdXG5cbiAgICBsZXQgbyA9IHNvdXJjZWdhdGUoW3tcbiAgICAgIGJ1aWxkOiAnYnVpbGQnLFxuICAgICAgc2NyaXB0czoge1xuICAgICAgICBleGNsdWRlOiBbJ3Rlc3QnXSwgLy8gYmVjYXVzZSBndWxwLW5wbS10ZXN0IGRvZXMgdGVzdGluZyBiZXR0ZXIgdGhhbiBndWxwLW5wbS1ydW5cbiAgICAgICAgcmVxdWlyZVN0cmljdDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHRlc3Q6IHtcbiAgICAgICAgdGVzdHNSZTogL1xcLnNwZWNcXC5jb2ZmZWUkLyAvLyBUT0RPOiBtb3ZlIHRvIC5iZXZlcmFnZSBhZnRlciBjaGFuZ2luZyBpdCB0byBhIGdsb2JcbiAgICAgIH1cbiAgICB9XS5jb25jYXQob3B0cy5kb3RCZXZlcmFnZS5tYXAoZmlsZSA9PiBmaWxlICsgJy8uYmV2ZXJhZ2UnKSwgb3B0cykpXG5cbiAgICBpZiAoby5zY3JpcHRzLmluY2x1ZGUgJiYgby5zY3JpcHRzLmluY2x1ZGVbby5idWlsZF0pIHtcbiAgICAgIG8gPSBzb3VyY2VnYXRlKFtvLCB7c2NyaXB0czoge3JlcXVpcmU6IFtvLmJ1aWxkXX19XSlcbiAgICB9XG5cbiAgICByZXR1cm4gb1xuICB9XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChndWxwSW4sIG9wdHMpIHtcbiAgbGV0IG8gPSBkZWYob3B0cylcbiAgbGV0IGd1bHAgPSBndWxwSGVscGlmeShndWxwSW4pXG5cbiAgZ3VscC50YXNrKCdiZXZlcmFnZScsICdUaGUgcmVjaXBlIG9mIHRoaXMgYmV2ZXJhZ2UuJywgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdcXG5DdXJyZW50IGJldmVyYWdlIG9wdGlvbnM6JylcbiAgICBjb25zb2xlLmxvZygnXFxuJyArIEpTT04uc3RyaW5naWZ5KG8sIG51bGwsIDIpICsgJ1xcbicpXG4gIH0pXG5cbiAgaWYgKHBrZy5zY3JpcHRzKSB7XG4gICAgaWYgKG8uc2NyaXB0cykgcmVxKCdndWxwLW5wbS1ydW4nKShndWxwLCBvLnNjcmlwdHMpXG5cbiAgICBpZiAoby50ZXN0ICYmIHBrZy5zY3JpcHRzLnRlc3QpIHtcbiAgICAgIGlmIChvLnRlc3RXYXRjaCkge1xuICAgICAgICAvLyBUT0RPOiB0aGlzIHdob2xlIGlmIHNob3VsZCBiZSBkZWxldGVkXG4gICAgICAgIGxvZ2dlci53YXJuKCdPcHRpb24gdGVzdFdhdGNoIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgdGVzdC53YXRjaCBpbnN0ZWFkLicpXG4gICAgICAgIG8udGVzdC53YXRjaCA9IG8udGVzdFdhdGNoXG4gICAgICB9XG4gICAgICByZXEoJ2d1bHAtbnBtLXRlc3QnKShndWxwLCBvLnRlc3QpXG4gICAgfVxuXG4gICAgaWYgKG8uYnVpbGRXYXRjaCAmJiBvLnNjcmlwdHMpIHtcbiAgICAgIC8vIFRPRE86IHRoaXMgd2hvbGUgaWYgc2hvdWxkIGJlIGRlbGV0ZWQgYXMgaXQncyByZWR1bmRhbnRcbiAgICAgIGxvZ2dlci53YXJuKCdUaGUgYnVpbGQgJiBidWlsZFdhdGNoIG9wdGlvbnMgYXJlIGRlcHJlY2F0ZWQsIHVzZSBcImNhdXNhbGl0eVwiIGluc3RlYWQuJylcbiAgICAgIGd1bHAudGFzayhvLmJ1aWxkICsgJzp3YXRjaCcsIG8uYnVpbGRXYXRjaC50b1N0cmluZygpLCAoKSA9PlxuICAgICAgICBndWxwLndhdGNoKG8uYnVpbGRXYXRjaCwgW28uYnVpbGRdKVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGlmIChvLnNvdXJjZWdhdGUgJiYgby5zb3VyY2VnYXRlLmxlbmd0aCkge1xuICAgIG8uc291cmNlb3B0ID0gby5zb3VyY2VvcHQgfHwge31cbiAgICAvLyBUT0RPOiB0aGUgcmVzdCBvZiB0aGlzIGFzIGZhciBhcyB0aGUgcmVxIGlzIHRlbXBvcmFyeSwgZm9yIGdyYWNlZnVsIHVwZ3JhZGUuLi5cbiAgICAvLyBkZWxldGUgYWZ0ZXJ3YXJkc1xuICAgIGxldCBjb252ZXJ0ID0geydzb3VyY2VnYXRlTW9kdWxlJzogJ21vZHVsZScsXG4gICAgICAgICAgICAgICAgICAgJ3NvdXJjZWdhdGVQcmVmaXgnOiAncHJlZml4JyxcbiAgICAgICAgICAgICAgICAgICAnc291cmNlZ2F0ZVByZXNldCc6ICdwcmVzZXQnLFxuICAgICAgICAgICAgICAgICAgICdzb3VyY2VnYXRlV2F0Y2gnOiAnd2F0Y2gnfVxuICAgIGlmIChSLmtleXMoUi5waWNrKFIua2V5cyhjb252ZXJ0KSwgbykpLmxlbmd0aCkge1xuICAgICAgZm9yIChsZXQga2V5IG9mIFIua2V5cyhjb252ZXJ0KSkge1xuICAgICAgICBpZiAob1trZXldKSB7XG4gICAgICAgICAgbGV0IHZhbCA9IGNvbnZlcnRba2V5XVxuICAgICAgICAgIG8uc291cmNlb3B0W3ZhbF0gPSBvW2tleV1cbiAgICAgICAgICBsb2dnZXIud2FybihgRGVwcmVjYXRlZCAke2tleX0gb3B0aW9uLCBwbGVhc2UgdXNlIHNvdXJjZW9wdC4ke3ZhbH0gaW5zdGVhZC5gKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJlcSgnaGFsLXJjJykoUi5waWNrKFsnc291cmNlZ2F0ZScsICdzb3VyY2VvcHQnXSwgbyksIGd1bHApXG4gIH1cblxuICBpZiAoby5oYXJwKSByZXEoJ2d1bHAtaGFycCcpKGd1bHAsIFIucGljayhbJ2hhcnAnXSwgbykpXG5cbiAgaWYgKG8uY2F1c2FsaXR5KSByZXEoJ2d1bHAtY2F1c2UnKShndWxwLCBvLmNhdXNhbGl0eSlcblxuICByZXR1cm4gZ3VscFxufVxuIl19