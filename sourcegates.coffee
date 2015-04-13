# TODO: this module should become its own project, orlin/hal-rc?
# as gulp is optional, document which options are gulp-specific

require("source-map-support").install()
R = require("ramda")
fs = require("fs")
path = require("path")
sourcegate = require("sourcegate")
nocomments = require("strip-json-comments")


get = (what, module) ->
  where = [
    "node_modules/#{what}",
    "node_modules/#{module}/node_modules/#{what}"
  ]

  try
    JSON.parse nocomments fs.readFileSync(path.normalize where[0]).toString()
  catch
    try
      JSON.parse nocomments fs.readFileSync(path.normalize where[1]).toString()
    catch e
      console.error(e)
      throw new Error "Could not find preset at: #{where}"


getPreset = (tool, name, module) ->
  presets =
    jscs: "jscs/presets" #{preset}.json will be appended
    jshint:
      airbnb: "airbnb-style/linters/jshintrc"
    eslint:
      airbnb: "airbnb-style/linters/eslintrc"

  if tool is "jscs"
    get("#{presets.jscs}/#{name}.json", module)
  else if presets[tool]?[name]?
    get(presets[tool][name], module)
  else {}


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
      sg.sources = o.sourcegateRx?[sg.recipe] || []
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
      preset = sg.preset || o.sourcegatePreset
      if module
        config = path.normalize("#{config}/#{module}/#{prefix}#{sg.recipe}rc")
        if o.sourcegateWatch
          watch.push config
        sources.push getPreset(sg.recipe, preset, module) if preset?
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
