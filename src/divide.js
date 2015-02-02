const _ = require('lodash')

// (Number...) => Number
module.exports = function () {

  return _(arguments).reduce(function (prev, cur) {
    return prev / cur
  })

}