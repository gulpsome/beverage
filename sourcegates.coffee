require("source-map-support").install()
R = require("ramda")

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
    unless R.is(Array, sg.sources)
      sg.sources = [sg.sources]
    unless sg.recipe?
      res = [sg.sources, sg.options]

    # TODO: get it implemented...

    ready.push res

  gulp?.task "sourcegate", "Rewrite sourcegate targets.", ->
    for sg in ready
      sourcegate.apply(null, sg)

  ready
