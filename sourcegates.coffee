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
        config = path.normalize(path.join(config, module,
                                          "#{prefix}#{sg.recipe}rc"))
        sources.push config
        sg.options.write ?= {}
        sg.options.write.path = ".#{sg.recipe}rc"

      res = [sources.concat(sg.sources), sg.options]

    ready.push res

  gulp?.task "sourcegate", "Rewrite sourcegate targets.", ->
    for sg in ready
      sourcegate.apply(null, sg)

  ready
