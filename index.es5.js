'use strict';

require('source-map-support/register');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _sourcegate = require('sourcegate');

var _sourcegate2 = _interopRequireDefault(_sourcegate);

var _beGoods = require('be-goods');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import gutil from 'gulp-util'

var req = (0, _beGoods.prefquire)({ dev: true, exitOnError: true });

// NOTE: gulp is a dependency (rather than devDependency) on purpose (a fallback default)

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

function isGulp(o) {
  if (((o || {}).constructor || {}).name === 'Gulp') {
    return true;
  } else {
    return false;
  }
}

module.exports = function (first, second) {
  var gulp = void 0,
      o = void 0;
  if (isGulp(first)) {
    gulp = (0, _beGoods.gulpHelpify)(first);
    o = def(second);
  } else {
    gulp = (0, _beGoods.gulpHelpify)(req('gulp'));
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
    req('hal-rc')(_ramda2.default.pick(['sourcegate', 'sourceopt'], o), gulp);
  }

  if (o.harp) req('gulp-harp')(gulp, _ramda2.default.pick(['harp'], o));

  if (o.causality) req('gulp-cause')(gulp, o.causality);

  return gulp;
};

//# sourceMappingURL=data:application/json;base64,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RUFBRSxTQUExQjs7QUFFakIsU0FBTyxJQUFQO0FBQ0QsQ0FqQ0QiLCJmaWxlIjoiaW5kZXguZXM1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInXG5cbi8vIE5PVEU6IGd1bHAgaXMgYSBkZXBlbmRlbmN5IChyYXRoZXIgdGhhbiBkZXZEZXBlbmRlbmN5KSBvbiBwdXJwb3NlIChhIGZhbGxiYWNrIGRlZmF1bHQpXG5cbmltcG9ydCBSIGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHNvdXJjZWdhdGUgZnJvbSAnc291cmNlZ2F0ZSdcbmltcG9ydCB7cHJlZnF1aXJlLCBwa2csIGlzTG9jYWwsIGd1bHBIZWxwaWZ5fSBmcm9tICdiZS1nb29kcydcbi8vIGltcG9ydCBndXRpbCBmcm9tICdndWxwLXV0aWwnXG5cbmxldCByZXEgPSBwcmVmcXVpcmUoe2RldjogdHJ1ZSwgZXhpdE9uRXJyb3I6IHRydWV9KVxuXG5mdW5jdGlvbiBkZWYgKG9wdHMgPSB7fSkge1xuICBvcHRzLmRvdEJldmVyYWdlID0gb3B0cy5kb3RCZXZlcmFnZSB8fCBbXG4gICAgJ25vZGVfbW9kdWxlcy9iZXZlcmFnZS9ub2RlX21vZHVsZXMvaGFsLXJjJyxcbiAgICAnLidcbiAgXVxuXG4gIGxldCBvID0gc291cmNlZ2F0ZShbe1xuICAgIHNjcmlwdHM6IHtcbiAgICAgIHJlcXVpcmVTdHJpY3Q6IHRydWVcbiAgICB9XG4gIH1dLmNvbmNhdChvcHRzLmRvdEJldmVyYWdlLm1hcChmaWxlID0+IGZpbGUgKyAnLy5iZXZlcmFnZScpLCBvcHRzKSlcblxuICBpZiAoby5oYXNPd25Qcm9wZXJ0eSgndGVzdCcpICYmIGlzTG9jYWwoJ2d1bHAtbnBtLXRlc3QnKSkge1xuICAgIC8vIGd1bHAtbnBtLXRlc3QgZG9lcyB0ZXN0aW5nIGJldHRlciB0aGFuIGd1bHAtbnBtLXJ1blxuICAgIC8vIE5PVEU6IGRvbid0IGJlIHB1dC1vZmYgYnkgYHNwZWMuY29mZmVlYCBhbmQgY2hhbmdlIGl0IHRvIG1hdGNoIHlvdXIgdGVzdHNcbiAgICByZXR1cm4gc291cmNlZ2F0ZShbe1xuICAgICAgc2NyaXB0czoge2V4Y2x1ZGU6IFsndGVzdCddfSxcbiAgICAgIHRlc3Q6IHtcbiAgICAgICAgdGVzdHNSZTogJ1xcXFwuc3BlY1xcXFwuY29mZmVlJCdcbiAgICAgIH1cbiAgICB9LCBvXSlcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzR3VscCAobykge1xuICBpZiAoKChvIHx8IHt9KS5jb25zdHJ1Y3RvciB8fCB7fSkubmFtZSA9PT0gJ0d1bHAnKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmaXJzdCwgc2Vjb25kKSB7XG4gIGxldCBndWxwLCBvXG4gIGlmIChpc0d1bHAoZmlyc3QpKSB7XG4gICAgZ3VscCA9IGd1bHBIZWxwaWZ5KGZpcnN0KVxuICAgIG8gPSBkZWYoc2Vjb25kKVxuICB9IGVsc2Uge1xuICAgIGd1bHAgPSBndWxwSGVscGlmeShyZXEoJ2d1bHAnKSlcbiAgICBvID0gZGVmKGZpcnN0KVxuICB9XG5cbiAgZ3VscC50YXNrKCdiZXZlcmFnZScsICdUaGUgcmVjaXBlIG9mIHRoaXMgYmV2ZXJhZ2UuJywgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdcXG5DdXJyZW50IGJldmVyYWdlIG9wdGlvbnM6JylcbiAgICBjb25zb2xlLmxvZygnXFxuJyArIEpTT04uc3RyaW5naWZ5KG8sIG51bGwsIDIpICsgJ1xcbicpXG4gIH0pXG5cbiAgaWYgKHBrZy5zY3JpcHRzKSB7XG4gICAgaWYgKG8uc2NyaXB0cykgcmVxKCdndWxwLW5wbS1ydW4nKShndWxwLCBvLnNjcmlwdHMpXG5cbiAgICBpZiAoby50ZXN0ICYmIHBrZy5zY3JpcHRzLnRlc3QpIHtcbiAgICAgIHJlcSgnZ3VscC1ucG0tdGVzdCcpKGd1bHAsIG8udGVzdClcbiAgICB9XG4gIH1cblxuICBpZiAoby5zb3VyY2VnYXRlICYmIG8uc291cmNlZ2F0ZS5sZW5ndGgpIHtcbiAgICBvLnNvdXJjZW9wdCA9IG8uc291cmNlb3B0IHx8IHt9XG4gICAgcmVxKCdoYWwtcmMnKShSLnBpY2soWydzb3VyY2VnYXRlJywgJ3NvdXJjZW9wdCddLCBvKSwgZ3VscClcbiAgfVxuXG4gIGlmIChvLmhhcnApIHJlcSgnZ3VscC1oYXJwJykoZ3VscCwgUi5waWNrKFsnaGFycCddLCBvKSlcblxuICBpZiAoby5jYXVzYWxpdHkpIHJlcSgnZ3VscC1jYXVzZScpKGd1bHAsIG8uY2F1c2FsaXR5KVxuXG4gIHJldHVybiBndWxwXG59XG4iXX0=