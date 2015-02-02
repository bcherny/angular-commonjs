// (numbers: Array<Number>) => Number
module.exports = function multiply (numbers) {

  return numbers.reduce(function (prev, cur) {
    return prev * cur
  })

}