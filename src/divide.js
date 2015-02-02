// (numbers: Array<Number>) => Number
module.exports = function divide (numbers) {

  return numbers.reduce(function (prev, cur) {
    return prev / cur
  })

}