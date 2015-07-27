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

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

require('source-map-support').install();

var logger = require('tracer').console({
  'filters': { 'warn': _chalk2['default'].yellow, 'error': _chalk2['default'].red },
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

//# sourceMappingURL=data:application/json;base64,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c291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnc291cmNlLW1hcC1zdXBwb3J0JykuaW5zdGFsbCgpXG5cbmltcG9ydCBSIGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBzb3VyY2VnYXRlIGZyb20gJ3NvdXJjZWdhdGUnXG5pbXBvcnQge3BrZywgZ3VscEhlbHBpZnl9IGZyb20gJ3N0YW1pbmEnXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5cbnZhciBsb2dnZXIgPSByZXF1aXJlKCd0cmFjZXInKS5jb25zb2xlKHtcbiAgJ2ZpbHRlcnMnOiB7J3dhcm4nOiBjaGFsay55ZWxsb3csICdlcnJvcic6IGNoYWxrLnJlZH0sXG4gICdmb3JtYXQnOiAnPGJldmVyYWdlL3t7ZmlsZX19Ont7bGluZX19PiB7e21lc3NhZ2V9fSdcbn0pXG5cbmZ1bmN0aW9uIHJlcSAobmFtZSkge1xuICBsZXQgZGVwID0gUi5oYXMobmFtZSlcbiAgbGV0IGxvY2FsID0gZGVwKHBrZy5kZXBlbmRlbmNpZXMgfHwge30pIHx8IGRlcChwa2cuZGV2RGVwZW5kZW5jaWVzIHx8IHt9KVxuICBpZiAobG9jYWwpIHtcbiAgICBsZXQgd2hlcmUgPSBwYXRoLm5vcm1hbGl6ZShgJHtwcm9jZXNzLmN3ZCgpfS9ub2RlX21vZHVsZXMvJHtuYW1lfWApXG4gICAgcmV0dXJuIHJlcXVpcmUocGF0aC5qb2luKHdoZXJlLCByZXF1aXJlKHBhdGguam9pbih3aGVyZSwgJ3BhY2thZ2UuanNvbicpKS5tYWluKSlcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLndhcm4oYFBhY2thZ2UgJHtuYW1lfSBub3QgZm91bmQgYXMgbG9jYWwgZGVwZW5kZW5jeSwgZmFsbGJhY2sgdG8gYmV2ZXJhZ2UuYClcbiAgICByZXR1cm4gcmVxdWlyZShuYW1lKVxuICB9XG59XG5cbmZ1bmN0aW9uIGRlZiAob3B0cyA9IHt9KSB7XG4gICAgb3B0cy5kb3RCZXZlcmFnZSA9IG9wdHMuZG90QmV2ZXJhZ2UgfHwgW1xuICAgICAgJ25vZGVfbW9kdWxlcy9iZXZlcmFnZS9ub2RlX21vZHVsZXMvaGFsLXJjJyxcbiAgICAgICcuJ1xuICAgIF1cblxuICAgIGxldCBvID0gc291cmNlZ2F0ZShbe1xuICAgICAgYnVpbGQ6ICdidWlsZCcsXG4gICAgICBzY3JpcHRzOiB7XG4gICAgICAgIGV4Y2x1ZGU6IFsndGVzdCddLCAvLyBiZWNhdXNlIGd1bHAtbnBtLXRlc3QgZG9lcyB0ZXN0aW5nIGJldHRlciB0aGFuIGd1bHAtbnBtLXJ1blxuICAgICAgICByZXF1aXJlU3RyaWN0OiB0cnVlXG4gICAgICB9LFxuICAgICAgdGVzdDoge1xuICAgICAgICB0ZXN0c1JlOiAvXFwuc3BlY1xcLmNvZmZlZSQvIC8vIFRPRE86IG1vdmUgdG8gLmJldmVyYWdlIGFmdGVyIGNoYW5naW5nIGl0IHRvIGEgZ2xvYlxuICAgICAgfVxuICAgIH1dLmNvbmNhdChvcHRzLmRvdEJldmVyYWdlLm1hcChmaWxlID0+IGZpbGUgKyAnLy5iZXZlcmFnZScpLCBvcHRzKSlcblxuICAgIGlmIChvLnNjcmlwdHMuaW5jbHVkZSAmJiBvLnNjcmlwdHMuaW5jbHVkZVtvLmJ1aWxkXSkge1xuICAgICAgbyA9IHNvdXJjZWdhdGUoW28sIHtzY3JpcHRzOiB7cmVxdWlyZTogW28uYnVpbGRdfX1dKVxuICAgIH1cblxuICAgIHJldHVybiBvXG4gIH1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGd1bHBJbiwgb3B0cykge1xuICBsZXQgbyA9IGRlZihvcHRzKVxuICBsZXQgZ3VscCA9IGd1bHBIZWxwaWZ5KGd1bHBJbilcblxuICBndWxwLnRhc2soJ2JldmVyYWdlJywgJ1RoZSByZWNpcGUgb2YgdGhpcyBiZXZlcmFnZS4nLCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ1xcbkN1cnJlbnQgYmV2ZXJhZ2Ugb3B0aW9uczonKVxuICAgIGNvbnNvbGUubG9nKCdcXG4nICsgSlNPTi5zdHJpbmdpZnkobywgbnVsbCwgMikgKyAnXFxuJylcbiAgfSlcblxuICBpZiAocGtnLnNjcmlwdHMpIHtcbiAgICBpZiAoby5zY3JpcHRzKSByZXEoJ2d1bHAtbnBtLXJ1bicpKGd1bHAsIG8uc2NyaXB0cylcblxuICAgIGlmIChvLnRlc3QgJiYgcGtnLnNjcmlwdHMudGVzdCkge1xuICAgICAgaWYgKG8udGVzdFdhdGNoKSB7XG4gICAgICAgIC8vIFRPRE86IHRoaXMgd2hvbGUgaWYgc2hvdWxkIGJlIGRlbGV0ZWRcbiAgICAgICAgbG9nZ2VyLndhcm4oJ09wdGlvbiB0ZXN0V2F0Y2ggaXMgZGVwcmVjYXRlZCwgdXNlIHRlc3Qud2F0Y2ggaW5zdGVhZC4nKVxuICAgICAgICBvLnRlc3Qud2F0Y2ggPSBvLnRlc3RXYXRjaFxuICAgICAgfVxuICAgICAgcmVxKCdndWxwLW5wbS10ZXN0JykoZ3VscCwgby50ZXN0KVxuICAgIH1cblxuICAgIGlmIChvLmJ1aWxkV2F0Y2ggJiYgby5zY3JpcHRzKSB7XG4gICAgICAvLyBUT0RPOiB0aGlzIHdob2xlIGlmIHNob3VsZCBiZSBkZWxldGVkIGFzIGl0J3MgcmVkdW5kYW50XG4gICAgICBsb2dnZXIud2FybignVGhlIGJ1aWxkICYgYnVpbGRXYXRjaCBvcHRpb25zIGFyZSBkZXByZWNhdGVkLCB1c2UgY2F1c2FsaXR5IGluc3RlYWQuJylcbiAgICAgIGd1bHAudGFzayhvLmJ1aWxkICsgJzp3YXRjaCcsIG8uYnVpbGRXYXRjaC50b1N0cmluZygpLCAoKSA9PlxuICAgICAgICBndWxwLndhdGNoKG8uYnVpbGRXYXRjaCwgW28uYnVpbGRdKVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGlmIChvLnNvdXJjZWdhdGUgJiYgby5zb3VyY2VnYXRlLmxlbmd0aCkge1xuICAgIG8uc291cmNlb3B0ID0gby5zb3VyY2VvcHQgfHwge31cbiAgICAvLyBUT0RPOiB0aGUgcmVzdCBvZiB0aGlzIGFzIGZhciBhcyB0aGUgcmVxIGlzIHRlbXBvcmFyeSwgZm9yIGdyYWNlZnVsIHVwZ3JhZGUuLi5cbiAgICAvLyBkZWxldGUgYWZ0ZXJ3YXJkc1xuICAgIGxldCBjb252ZXJ0ID0geydzb3VyY2VnYXRlTW9kdWxlJzogJ21vZHVsZScsXG4gICAgICAgICAgICAgICAgICAgJ3NvdXJjZWdhdGVQcmVmaXgnOiAncHJlZml4JyxcbiAgICAgICAgICAgICAgICAgICAnc291cmNlZ2F0ZVByZXNldCc6ICdwcmVzZXQnLFxuICAgICAgICAgICAgICAgICAgICdzb3VyY2VnYXRlV2F0Y2gnOiAnd2F0Y2gnfVxuICAgIGlmIChSLmtleXMoUi5waWNrKFIua2V5cyhjb252ZXJ0KSwgbykpLmxlbmd0aCkge1xuICAgICAgZm9yIChsZXQga2V5IG9mIFIua2V5cyhjb252ZXJ0KSkge1xuICAgICAgICBpZiAob1trZXldKSB7XG4gICAgICAgICAgbGV0IHZhbCA9IGNvbnZlcnRba2V5XVxuICAgICAgICAgIG8uc291cmNlb3B0W3ZhbF0gPSBvW2tleV1cbiAgICAgICAgICBsb2dnZXIud2FybihgRGVwcmVjYXRlZCAke2tleX0gb3B0aW9uLCB1c2Ugc291cmNlb3B0LiR7dmFsfSBpbnN0ZWFkLmApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmVxKCdoYWwtcmMnKShSLnBpY2soWydzb3VyY2VnYXRlJywgJ3NvdXJjZW9wdCddLCBvKSwgZ3VscClcbiAgfVxuXG4gIGlmIChvLmhhcnApIHJlcSgnZ3VscC1oYXJwJykoZ3VscCwgUi5waWNrKFsnaGFycCddLCBvKSlcblxuICBpZiAoby5jYXVzYWxpdHkpIHJlcSgnZ3VscC1jYXVzZScpKGd1bHAsIG8uY2F1c2FsaXR5KVxuXG4gIHJldHVybiBndWxwXG59XG4iXX0=