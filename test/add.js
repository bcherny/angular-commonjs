
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