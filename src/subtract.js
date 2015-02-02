// (numbers: Array<Number>) => Number
module.exports = function subtract (numbers) {

  return numbers.reduce(function (prev, cur) {
    return prev - cur
  })

}