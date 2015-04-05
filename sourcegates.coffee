require("source-map-support").install()
R = require("ramda")

module.exports = (gulp, o = {}) ->
  empty = [[], {}]
  if R.is(Array, o.sourcegate)
    if R.isEmpty(o.sourcegate) then return [empty]
  else if R.is(Object, o.sourcegate)
    o.sourcegate = [o.sourcegate]
  else return [empty] # or throw?
  ready = []

  for sg in o.sourcegate
    res = R.clone(empty)
    # TODO: get it implemented...
    ready.push res
  ready
