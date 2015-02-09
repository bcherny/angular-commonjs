var angular = window.angular

angular
.module('foo', [])
.controller('foo', function () {})

.factory('require', function () {
  return function () {
    return require.apply(require, arguments)
  }
})

/*
  filters
 */

.filter('add', function (require) {
  return require('./add')
})
.filter('subtract', function (require) {
  return require('./subtract')
})
.filter('multiply', function (require) {
  return require('./multiply')
})
.filter('divide', function (require) {
  return require('./divide')
})

/*
  helpers
 */

.filter('split', function () {

  return function (string) {
    return (string || '').split(' ')
  }

})
.filter('toNumbers', function () {

  return function (array) {
    return array.map(Number)
  }

})