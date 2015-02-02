var angular = window.angular,
    add = require('./add'),
    subtract = require('./subtract'),
    multiply = require('./multiply'),
    divide = require('./divide')

angular
.module('foo', [])
.controller('foo', function () {})

/*
  filters
 */

.filter('add', function () {
  return add
})
.filter('subtract', function () {
  return subtract
})
.filter('multiply', function () {
  return multiply
})
.filter('divide', function () {
  return divide
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