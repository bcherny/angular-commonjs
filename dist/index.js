(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./add":2,"./divide":3,"./multiply":4,"./subtract":5}],2:[function(require,module,exports){
// (numbers: Array<Number>) => Number
module.exports = function add (numbers) {

  return numbers.reduce(function (prev, cur) {
    return prev + cur
  })

}
},{}],3:[function(require,module,exports){
// (numbers: Array<Number>) => Number
module.exports = function divide (numbers) {

  return numbers.reduce(function (prev, cur) {
    return prev / cur
  })

}
},{}],4:[function(require,module,exports){
// (numbers: Array<Number>) => Number
module.exports = function multiply (numbers) {

  return numbers.reduce(function (prev, cur) {
    return prev * cur
  })

}
},{}],5:[function(require,module,exports){
// (numbers: Array<Number>) => Number
module.exports = function subtract (numbers) {

  return numbers.reduce(function (prev, cur) {
    return prev - cur
  })

}
},{}]},{},[1]);
