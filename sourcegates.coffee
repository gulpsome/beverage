require("source-map-support").install()
R = require("ramda")
path = require("path")
sourcegate = require("sourcegate")

# TODO: this module should become its own project, orlin/hal-rc?
# as gulp is optional, document which options are gulp-specific

module.exports = (o = {}, gulp) ->
  empty = [[], {}]
  if R.is(Array, o.sourcegate)
    if R.isEmpty(o.sourcegate) then return [empty]
  else return [empty] # or throw?
  ready = []
  watch = []

  for sg in o.sourcegate
    res = R.clone(empty)
    unless sg.sources?
      sg.sources = []
    else unless R.is(Array, sg.sources)
      sg.sources = [sg.sources]
    sg.options ?= {}

    unless sg.recipe?
      res = [sg.sources, sg.options]

    else
      sources = []
      config = "node_modules"
      module = sg.module || o.sourcegateModule
      prefix = sg.prefix || o.sourcegatePrefix || ''
      if module
        config = path.normalize("#{config}/#{module}/#{prefix}#{sg.recipe}rc")
        if o.sourcegateWatch
          watch.push config
        sources.push config
        sg.options.write ?= {}
        sg.options.write.path = ".#{sg.recipe}rc"

      res = [sources.concat(sg.sources), sg.options]

    ready.push res

  if gulp?
    gulp.task "sourcegate", "Write sourcegate targets.", ->
      for sg in ready
        sourcegate.apply(null, sg)
    if o.sourcegateWatch
      gulp.task "sourcegate:watch",
        "Watch sourcegate sources for changes.", ->
          gulp.watch watch, ["sourcegate"]

  ready
