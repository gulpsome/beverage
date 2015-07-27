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
      // the above list of exceptions contains modules that will remain bundled as beverage dependencies
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

//# sourceMappingURL=data:application/json;base64,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LFNBQVMsRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQTs7QUFFckQsU0FBTyxJQUFJLENBQUE7Q0FDWiIsImZpbGUiOiJpbmRleC5lczUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCdzb3VyY2UtbWFwLXN1cHBvcnQnKS5pbnN0YWxsKClcblxuaW1wb3J0IFIgZnJvbSAncmFtZGEnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHNvdXJjZWdhdGUgZnJvbSAnc291cmNlZ2F0ZSdcbmltcG9ydCB7cGtnLCBndWxwSGVscGlmeX0gZnJvbSAnYmUtZ29vZHMnXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5cbnZhciBsb2dnZXIgPSByZXF1aXJlKCd0cmFjZXInKS5jb25zb2xlKHtcbiAgJ2ZpbHRlcnMnOiB7J3dhcm4nOiBjaGFsay55ZWxsb3csICdlcnJvcic6IGNoYWxrLnJlZH0sXG4gICdmb3JtYXQnOiAnPGJldmVyYWdlL3t7ZmlsZX19Ont7bGluZX19PiB7e21lc3NhZ2V9fSdcbn0pXG5cbmZ1bmN0aW9uIHJlcSAobmFtZSkge1xuICBsZXQgZGVwID0gUi5oYXMobmFtZSlcbiAgbGV0IGxvY2FsID0gZGVwKHBrZy5kZXBlbmRlbmNpZXMgfHwge30pIHx8IGRlcChwa2cuZGV2RGVwZW5kZW5jaWVzIHx8IHt9KVxuICBpZiAobG9jYWwpIHtcbiAgICBsZXQgd2hlcmUgPSBwYXRoLm5vcm1hbGl6ZShgJHtwcm9jZXNzLmN3ZCgpfS9ub2RlX21vZHVsZXMvJHtuYW1lfWApXG4gICAgcmV0dXJuIHJlcXVpcmUocGF0aC5qb2luKHdoZXJlLCByZXF1aXJlKHBhdGguam9pbih3aGVyZSwgJ3BhY2thZ2UuanNvbicpKS5tYWluKSlcbiAgfSBlbHNlIHtcbiAgICBpZiAoUi5ub3QoUi5jb250YWlucyhuYW1lLCBbJ2hhbC1yYycsICdndWxwLWNhdXNlJ10pKSkge1xuICAgICAgLy8gdGhlIGFib3ZlIGxpc3Qgb2YgZXhjZXB0aW9ucyBjb250YWlucyBtb2R1bGVzIHRoYXQgd2lsbCByZW1haW4gYnVuZGxlZCBhcyBiZXZlcmFnZSBkZXBlbmRlbmNpZXNcbiAgICAgIGNvbnNvbGUud2FybihjaGFsay55ZWxsb3coYFBsZWFzZSBpbnN0YWxsICR7bmFtZX0gYXMgYSBkZXZEZXBlbmRlbmN5LCBmdXR1cmUgYmV2ZXJhZ2Ugd2lsbCBub3QgYnVsZGxlIGl0LmApKVxuICAgIH1cbiAgICByZXR1cm4gcmVxdWlyZShuYW1lKVxuICB9XG59XG5cbmZ1bmN0aW9uIGRlZiAob3B0cyA9IHt9KSB7XG4gICAgb3B0cy5kb3RCZXZlcmFnZSA9IG9wdHMuZG90QmV2ZXJhZ2UgfHwgW1xuICAgICAgJ25vZGVfbW9kdWxlcy9iZXZlcmFnZS9ub2RlX21vZHVsZXMvaGFsLXJjJyxcbiAgICAgICcuJ1xuICAgIF1cblxuICAgIGxldCBvID0gc291cmNlZ2F0ZShbe1xuICAgICAgYnVpbGQ6ICdidWlsZCcsXG4gICAgICBzY3JpcHRzOiB7XG4gICAgICAgIGV4Y2x1ZGU6IFsndGVzdCddLCAvLyBiZWNhdXNlIGd1bHAtbnBtLXRlc3QgZG9lcyB0ZXN0aW5nIGJldHRlciB0aGFuIGd1bHAtbnBtLXJ1blxuICAgICAgICByZXF1aXJlU3RyaWN0OiB0cnVlXG4gICAgICB9LFxuICAgICAgdGVzdDoge1xuICAgICAgICB0ZXN0c1JlOiAvXFwuc3BlY1xcLmNvZmZlZSQvIC8vIFRPRE86IG1vdmUgdG8gLmJldmVyYWdlIGFmdGVyIGNoYW5naW5nIGl0IHRvIGEgZ2xvYlxuICAgICAgfVxuICAgIH1dLmNvbmNhdChvcHRzLmRvdEJldmVyYWdlLm1hcChmaWxlID0+IGZpbGUgKyAnLy5iZXZlcmFnZScpLCBvcHRzKSlcblxuICAgIGlmIChvLnNjcmlwdHMuaW5jbHVkZSAmJiBvLnNjcmlwdHMuaW5jbHVkZVtvLmJ1aWxkXSkge1xuICAgICAgbyA9IHNvdXJjZWdhdGUoW28sIHtzY3JpcHRzOiB7cmVxdWlyZTogW28uYnVpbGRdfX1dKVxuICAgIH1cblxuICAgIHJldHVybiBvXG4gIH1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGd1bHBJbiwgb3B0cykge1xuICBsZXQgbyA9IGRlZihvcHRzKVxuICBsZXQgZ3VscCA9IGd1bHBIZWxwaWZ5KGd1bHBJbilcblxuICBndWxwLnRhc2soJ2JldmVyYWdlJywgJ1RoZSByZWNpcGUgb2YgdGhpcyBiZXZlcmFnZS4nLCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ1xcbkN1cnJlbnQgYmV2ZXJhZ2Ugb3B0aW9uczonKVxuICAgIGNvbnNvbGUubG9nKCdcXG4nICsgSlNPTi5zdHJpbmdpZnkobywgbnVsbCwgMikgKyAnXFxuJylcbiAgfSlcblxuICBpZiAocGtnLnNjcmlwdHMpIHtcbiAgICBpZiAoby5zY3JpcHRzKSByZXEoJ2d1bHAtbnBtLXJ1bicpKGd1bHAsIG8uc2NyaXB0cylcblxuICAgIGlmIChvLnRlc3QgJiYgcGtnLnNjcmlwdHMudGVzdCkge1xuICAgICAgaWYgKG8udGVzdFdhdGNoKSB7XG4gICAgICAgIC8vIFRPRE86IHRoaXMgd2hvbGUgaWYgc2hvdWxkIGJlIGRlbGV0ZWRcbiAgICAgICAgbG9nZ2VyLndhcm4oJ09wdGlvbiB0ZXN0V2F0Y2ggaXMgZGVwcmVjYXRlZCwgdXNlIHRlc3Qud2F0Y2ggaW5zdGVhZC4nKVxuICAgICAgICBvLnRlc3Qud2F0Y2ggPSBvLnRlc3RXYXRjaFxuICAgICAgfVxuICAgICAgcmVxKCdndWxwLW5wbS10ZXN0JykoZ3VscCwgby50ZXN0KVxuICAgIH1cblxuICAgIGlmIChvLmJ1aWxkV2F0Y2ggJiYgby5zY3JpcHRzKSB7XG4gICAgICAvLyBUT0RPOiB0aGlzIHdob2xlIGlmIHNob3VsZCBiZSBkZWxldGVkIGFzIGl0J3MgcmVkdW5kYW50XG4gICAgICBsb2dnZXIud2FybignVGhlIGJ1aWxkICYgYnVpbGRXYXRjaCBvcHRpb25zIGFyZSBkZXByZWNhdGVkLCB1c2UgY2F1c2FsaXR5IGluc3RlYWQuJylcbiAgICAgIGd1bHAudGFzayhvLmJ1aWxkICsgJzp3YXRjaCcsIG8uYnVpbGRXYXRjaC50b1N0cmluZygpLCAoKSA9PlxuICAgICAgICBndWxwLndhdGNoKG8uYnVpbGRXYXRjaCwgW28uYnVpbGRdKVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGlmIChvLnNvdXJjZWdhdGUgJiYgby5zb3VyY2VnYXRlLmxlbmd0aCkge1xuICAgIG8uc291cmNlb3B0ID0gby5zb3VyY2VvcHQgfHwge31cbiAgICAvLyBUT0RPOiB0aGUgcmVzdCBvZiB0aGlzIGFzIGZhciBhcyB0aGUgcmVxIGlzIHRlbXBvcmFyeSwgZm9yIGdyYWNlZnVsIHVwZ3JhZGUuLi5cbiAgICAvLyBkZWxldGUgYWZ0ZXJ3YXJkc1xuICAgIGxldCBjb252ZXJ0ID0geydzb3VyY2VnYXRlTW9kdWxlJzogJ21vZHVsZScsXG4gICAgICAgICAgICAgICAgICAgJ3NvdXJjZWdhdGVQcmVmaXgnOiAncHJlZml4JyxcbiAgICAgICAgICAgICAgICAgICAnc291cmNlZ2F0ZVByZXNldCc6ICdwcmVzZXQnLFxuICAgICAgICAgICAgICAgICAgICdzb3VyY2VnYXRlV2F0Y2gnOiAnd2F0Y2gnfVxuICAgIGlmIChSLmtleXMoUi5waWNrKFIua2V5cyhjb252ZXJ0KSwgbykpLmxlbmd0aCkge1xuICAgICAgZm9yIChsZXQga2V5IG9mIFIua2V5cyhjb252ZXJ0KSkge1xuICAgICAgICBpZiAob1trZXldKSB7XG4gICAgICAgICAgbGV0IHZhbCA9IGNvbnZlcnRba2V5XVxuICAgICAgICAgIG8uc291cmNlb3B0W3ZhbF0gPSBvW2tleV1cbiAgICAgICAgICBsb2dnZXIud2FybihgRGVwcmVjYXRlZCAke2tleX0gb3B0aW9uLCB1c2Ugc291cmNlb3B0LiR7dmFsfSBpbnN0ZWFkLmApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmVxKCdoYWwtcmMnKShSLnBpY2soWydzb3VyY2VnYXRlJywgJ3NvdXJjZW9wdCddLCBvKSwgZ3VscClcbiAgfVxuXG4gIGlmIChvLmhhcnApIHJlcSgnZ3VscC1oYXJwJykoZ3VscCwgUi5waWNrKFsnaGFycCddLCBvKSlcblxuICBpZiAoby5jYXVzYWxpdHkpIHJlcSgnZ3VscC1jYXVzZScpKGd1bHAsIG8uY2F1c2FsaXR5KVxuXG4gIHJldHVybiBndWxwXG59XG4iXX0=