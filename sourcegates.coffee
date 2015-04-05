require("source-map-support").install()
R = require("ramda")

module.exports = (gulp, o = {}) ->
  empty = [[], {}]
  unless o.sourcegate?.length then return [empty]
  ready = []
  for sg in o.sourcegate
    res = R.clone(empty)
    # TODO: get it implemented...
    ready.push res
  ready
