require("source-map-support").install()
R = require("ramda")

module.exports = (gulp, o = {}) ->
  empty = [[], {}]
  if R.is(Array, o.sourcegate)
    if R.isEmpty(o.sourcegate) then return [empty]
  else return [empty] # or throw?
  ready = []

  for sg in o.sourcegate
    res = R.clone(empty)
    unless R.is(Array, sg.sources)
      sg.sources = [sg.sources]
    res[0] = sg.sources
    res[1] = sg.options

    # TODO: get it implemented...

    ready.push res
  ready
