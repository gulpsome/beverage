'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _sourcegate = require('sourcegate');

var _sourcegate2 = _interopRequireDefault(_sourcegate);

var _stamina = require('stamina');

require('source-map-support').install();

function def() {
  var opts = arguments[0] === undefined ? {} : arguments[0];

  opts.dotBeverage = opts.dotBeverage || ['node_modules/beverage/node_modules/hal-rc', '.'];

  var o = (0, _sourcegate2['default'])([{
    causality: {},
    build: 'build',
    scripts: {
      exclude: ['test'], // because gulp-npm-test does testing better than gulp-npm-run
      requireStrict: true
    },
    test: { // NOTE: test is always enabled because of this default -- not so good...
      testsRe: /\.spec\.coffee$/ // TODO: move to .beverage after changing it to a glob
    }
  }].concat(opts.dotBeverage.map(function (file) {
    return file + '/.beverage';
  }), opts));

  if (o.scripts.include && o.scripts.include[o.build]) {
    o = (0, _sourcegate2['default'])([o, { scripts: { require: [o.build] } }]);
  }

  return o;
}

exports['default'] = function (gulpIn, opts) {
  var o = def(opts);
  var gulp = (0, _stamina.gulpHelpify)(gulpIn);

  if (_stamina.pkg.scripts && o.scripts) require('gulp-npm-run')(gulpIn, o.scripts);

  gulp.task('beverage', 'The recipe of this beverage.', function () {
    console.log('\nCurrent beverage options:');
    console.log('\n' + JSON.stringify(o, null, 2) + '\n');
  });

  if (_stamina.pkg.scripts) {
    if (o.test && _stamina.pkg.scripts.test) {
      (function () {
        var test = require('gulp-npm-test')(gulp, o.test);

        if (o.testWatch) {
          gulp.task('test:watch', o.testWatch.toString(), function () {
            return require('gulp-watch')(o.testWatch, test);
          });
        }
      })();
    }

    // TODO: the following should be deleted as it's redundant
    if (o.buildWatch && o.scripts) {
      console.warn('The build & buildWatch options are deprecated...');
      console.warn('Please use "causality" instead.\n');
      gulp.task(o.build + ':watch', o.buildWatch.toString(), function () {
        return gulp.watch(o.buildWatch, [o.build]);
      });
    }
  }

  var _loop = function (task) {
    var cause = o.causality[task];
    if (_ramda2['default'].type(cause) === 'Array') {
      if (gulp.tasks[task]) {
        // a shorthand for files triggering an existing task - creates task:watch
        gulp.task(task + ':watch', cause.toString(), function () {
          return gulp.watch(o.buildWatch, cause);
        });
      }
    }
  };

  for (var task in o.causality) {
    _loop(task);
  }

  if (o.harp) require('gulp-harp')(gulp, _ramda2['default'].pick(['harp'], o));

  if (o.sourcegate && o.sourcegate.length) require('hal-rc')(o, gulp);

  return gulp;
};

module.exports = exports['default'];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztxQkFFYyxPQUFPOzs7OzBCQUNFLFlBQVk7Ozs7dUJBQ0osU0FBUzs7QUFKeEMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7O0FBTXZDLFNBQVMsR0FBRyxHQUFhO01BQVgsSUFBSSxnQ0FBRyxFQUFFOztBQUNuQixNQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksQ0FDckMsMkNBQTJDLEVBQzNDLEdBQUcsQ0FDSixDQUFBOztBQUVELE1BQUksQ0FBQyxHQUFHLDZCQUFXLENBQUM7QUFDbEIsYUFBUyxFQUFFLEVBQUU7QUFDYixTQUFLLEVBQUUsT0FBTztBQUNkLFdBQU8sRUFBRTtBQUNQLGFBQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztBQUNqQixtQkFBYSxFQUFFLElBQUk7S0FDcEI7QUFDRCxRQUFJLEVBQUU7QUFDSixhQUFPLEVBQUUsaUJBQWlCO0FBQUEsS0FDM0I7R0FDRixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTtXQUFJLElBQUksR0FBRyxZQUFZO0dBQUEsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7O0FBRW5FLE1BQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ25ELEtBQUMsR0FBRyw2QkFBVyxDQUFDLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxFQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO0dBQ3JEOztBQUVELFNBQU8sQ0FBQyxDQUFBO0NBQ1Q7O3FCQUVZLFVBQVUsTUFBTSxFQUFFLElBQUksRUFBRTtBQUNyQyxNQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDakIsTUFBSSxJQUFJLEdBQUcsYUE3QkEsV0FBVyxFQTZCQyxNQUFNLENBQUMsQ0FBQTs7QUFFOUIsTUFBSSxTQS9CRSxHQUFHLENBK0JELE9BQU8sSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBOztBQUV4RSxNQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSw4QkFBOEIsRUFBRSxZQUFNO0FBQzFELFdBQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtBQUMxQyxXQUFPLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7R0FDdEQsQ0FBQyxDQUFBOztBQUVGLE1BQUksU0F0Q0UsR0FBRyxDQXNDRCxPQUFPLEVBQUU7QUFDZixRQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksU0F2Q1YsR0FBRyxDQXVDVyxPQUFPLENBQUMsSUFBSSxFQUFFOztBQUM5QixZQUFJLElBQUksR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTs7QUFFakQsWUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFO0FBQ2YsY0FBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRTttQkFDOUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDO1dBQUEsQ0FDekMsQ0FBQTtTQUNGOztLQUNGOzs7QUFHRCxRQUFJLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtBQUM3QixhQUFPLENBQUMsSUFBSSxDQUFDLGtEQUFrRCxDQUFDLENBQUE7QUFDaEUsYUFBTyxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFBO0FBQ2pELFVBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxRQUFRLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtlQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7T0FBQSxDQUNwQyxDQUFBO0tBQ0Y7R0FDRjs7d0JBRVEsSUFBSTtBQUNYLFFBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDN0IsUUFBSSxtQkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssT0FBTyxFQUFFO0FBQzdCLFVBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTs7QUFFcEIsWUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRTtpQkFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztTQUFBLENBQ2hDLENBQUE7T0FDRjtLQUNGOzs7QUFUSCxPQUFLLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUU7VUFBckIsSUFBSTtHQVVaOztBQUVELE1BQUksQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLG1CQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7O0FBRTNELE1BQUksQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBOztBQUVuRSxTQUFPLElBQUksQ0FBQTtDQUNaIiwiZmlsZSI6ImluZGV4LmVzNS5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJ3NvdXJjZS1tYXAtc3VwcG9ydCcpLmluc3RhbGwoKVxuXG5pbXBvcnQgUiBmcm9tICdyYW1kYSdcbmltcG9ydCBzb3VyY2VnYXRlIGZyb20gJ3NvdXJjZWdhdGUnXG5pbXBvcnQge3BrZywgZ3VscEhlbHBpZnl9IGZyb20gJ3N0YW1pbmEnXG5cbmZ1bmN0aW9uIGRlZiAob3B0cyA9IHt9KSB7XG4gICAgb3B0cy5kb3RCZXZlcmFnZSA9IG9wdHMuZG90QmV2ZXJhZ2UgfHwgW1xuICAgICAgJ25vZGVfbW9kdWxlcy9iZXZlcmFnZS9ub2RlX21vZHVsZXMvaGFsLXJjJyxcbiAgICAgICcuJ1xuICAgIF1cblxuICAgIGxldCBvID0gc291cmNlZ2F0ZShbe1xuICAgICAgY2F1c2FsaXR5OiB7fSxcbiAgICAgIGJ1aWxkOiAnYnVpbGQnLFxuICAgICAgc2NyaXB0czoge1xuICAgICAgICBleGNsdWRlOiBbJ3Rlc3QnXSwgLy8gYmVjYXVzZSBndWxwLW5wbS10ZXN0IGRvZXMgdGVzdGluZyBiZXR0ZXIgdGhhbiBndWxwLW5wbS1ydW5cbiAgICAgICAgcmVxdWlyZVN0cmljdDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHRlc3Q6IHsgLy8gTk9URTogdGVzdCBpcyBhbHdheXMgZW5hYmxlZCBiZWNhdXNlIG9mIHRoaXMgZGVmYXVsdCAtLSBub3Qgc28gZ29vZC4uLlxuICAgICAgICB0ZXN0c1JlOiAvXFwuc3BlY1xcLmNvZmZlZSQvIC8vIFRPRE86IG1vdmUgdG8gLmJldmVyYWdlIGFmdGVyIGNoYW5naW5nIGl0IHRvIGEgZ2xvYlxuICAgICAgfVxuICAgIH1dLmNvbmNhdChvcHRzLmRvdEJldmVyYWdlLm1hcChmaWxlID0+IGZpbGUgKyAnLy5iZXZlcmFnZScpLCBvcHRzKSlcblxuICAgIGlmIChvLnNjcmlwdHMuaW5jbHVkZSAmJiBvLnNjcmlwdHMuaW5jbHVkZVtvLmJ1aWxkXSkge1xuICAgICAgbyA9IHNvdXJjZWdhdGUoW28sIHtzY3JpcHRzOiB7cmVxdWlyZTogW28uYnVpbGRdfX1dKVxuICAgIH1cblxuICAgIHJldHVybiBvXG4gIH1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGd1bHBJbiwgb3B0cykge1xuICBsZXQgbyA9IGRlZihvcHRzKVxuICBsZXQgZ3VscCA9IGd1bHBIZWxwaWZ5KGd1bHBJbilcblxuICBpZiAocGtnLnNjcmlwdHMgJiYgby5zY3JpcHRzKSByZXF1aXJlKCdndWxwLW5wbS1ydW4nKShndWxwSW4sIG8uc2NyaXB0cylcblxuICBndWxwLnRhc2soJ2JldmVyYWdlJywgJ1RoZSByZWNpcGUgb2YgdGhpcyBiZXZlcmFnZS4nLCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ1xcbkN1cnJlbnQgYmV2ZXJhZ2Ugb3B0aW9uczonKVxuICAgIGNvbnNvbGUubG9nKCdcXG4nICsgSlNPTi5zdHJpbmdpZnkobywgbnVsbCwgMikgKyAnXFxuJylcbiAgfSlcblxuICBpZiAocGtnLnNjcmlwdHMpIHtcbiAgICBpZiAoby50ZXN0ICYmIHBrZy5zY3JpcHRzLnRlc3QpIHtcbiAgICAgIGxldCB0ZXN0ID0gcmVxdWlyZSgnZ3VscC1ucG0tdGVzdCcpKGd1bHAsIG8udGVzdClcblxuICAgICAgaWYgKG8udGVzdFdhdGNoKSB7XG4gICAgICAgIGd1bHAudGFzaygndGVzdDp3YXRjaCcsIG8udGVzdFdhdGNoLnRvU3RyaW5nKCksICgpID0+XG4gICAgICAgICAgcmVxdWlyZSgnZ3VscC13YXRjaCcpKG8udGVzdFdhdGNoLCB0ZXN0KVxuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVE9ETzogdGhlIGZvbGxvd2luZyBzaG91bGQgYmUgZGVsZXRlZCBhcyBpdCdzIHJlZHVuZGFudFxuICAgIGlmIChvLmJ1aWxkV2F0Y2ggJiYgby5zY3JpcHRzKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1RoZSBidWlsZCAmIGJ1aWxkV2F0Y2ggb3B0aW9ucyBhcmUgZGVwcmVjYXRlZC4uLicpXG4gICAgICBjb25zb2xlLndhcm4oJ1BsZWFzZSB1c2UgXCJjYXVzYWxpdHlcIiBpbnN0ZWFkLlxcbicpXG4gICAgICBndWxwLnRhc2soby5idWlsZCArICc6d2F0Y2gnLCBvLmJ1aWxkV2F0Y2gudG9TdHJpbmcoKSwgKCkgPT5cbiAgICAgICAgZ3VscC53YXRjaChvLmJ1aWxkV2F0Y2gsIFtvLmJ1aWxkXSlcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCB0YXNrIGluIG8uY2F1c2FsaXR5KSB7XG4gICAgbGV0IGNhdXNlID0gby5jYXVzYWxpdHlbdGFza11cbiAgICBpZiAoUi50eXBlKGNhdXNlKSA9PT0gJ0FycmF5Jykge1xuICAgICAgaWYgKGd1bHAudGFza3NbdGFza10pIHtcbiAgICAgICAgLy8gYSBzaG9ydGhhbmQgZm9yIGZpbGVzIHRyaWdnZXJpbmcgYW4gZXhpc3RpbmcgdGFzayAtIGNyZWF0ZXMgdGFzazp3YXRjaFxuICAgICAgICBndWxwLnRhc2sodGFzayArICc6d2F0Y2gnLCBjYXVzZS50b1N0cmluZygpLCAoKSA9PlxuICAgICAgICAgIGd1bHAud2F0Y2goby5idWlsZFdhdGNoLCBjYXVzZSlcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChvLmhhcnApIHJlcXVpcmUoJ2d1bHAtaGFycCcpKGd1bHAsIFIucGljayhbJ2hhcnAnXSwgbykpXG5cbiAgaWYgKG8uc291cmNlZ2F0ZSAmJiBvLnNvdXJjZWdhdGUubGVuZ3RoKSByZXF1aXJlKCdoYWwtcmMnKShvLCBndWxwKVxuXG4gIHJldHVybiBndWxwXG59XG4iXX0=