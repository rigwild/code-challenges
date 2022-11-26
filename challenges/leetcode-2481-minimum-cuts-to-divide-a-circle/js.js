/**
 * @param {number} n
 * @return {number}
 */
var numberOfCuts = function (n) {
  if (n === 1) return 0
  if (n === 2) return 1

  if (n % 2 === 0) return n / 2

  return n
}
