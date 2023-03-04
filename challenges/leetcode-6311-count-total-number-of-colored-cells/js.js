/**
 * @param {number} n
 * @return {number}
 */
var coloredCells = function (n) {
  if (n === 1) return 1
  if (n === 2) return 5

  const arr = Array.from({ length: n + 1 }, () => null)

  arr[0] = 0
  arr[1] = 1

  for (let i = 2; i <= n; i++) {
    arr[i] = (i - 1) * 4
  }

  // console.log(arr)

  return arr.reduce((acc, cur) => acc + cur, 0)
}
