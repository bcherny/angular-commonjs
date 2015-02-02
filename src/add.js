// (numbers: Array<Number>) => Number
module.exports = function add (numbers) {

  return numbers.reduce(function (prev, cur) {
    return prev + cur
  })

}