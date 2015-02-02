(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/*
  in this suite, we directly unit test src/add.js
 */

describe ('add', function () {

  var add

  beforeEach(function () {

    add = require('../src/add')

  })

  it ('should add positive numbers', function () {

    expect(add([1, 2, 3])).toBe(6)

  })

  it ('should add negative numbers', function () {

    expect(add([-1, -2, -3])).toBe(-6)

  })

})
},{"../src/add":3}],2:[function(require,module,exports){
describe ('foo', function () {

  var $filter

  beforeEach(function () {

    module('foo')

    inject(function (_$filter_) {
      $filter = _$filter_
    })

  })

  describe ('add filter', function () {

    it ('should add numbers', function () {

      expect($filter('add')([1, 2, 3])).toBe(6)

    })

  })

})
},{}],3:[function(require,module,exports){
// (numbers: Array<Number>) => Number
module.exports = function add (numbers) {

  return numbers.reduce(function (prev, cur) {
    return prev + cur
  })

}
},{}]},{},[2,1]);
