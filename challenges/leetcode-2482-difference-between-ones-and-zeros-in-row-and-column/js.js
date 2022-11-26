/**
 * @param {number[][]} grid
 * @return {number[][]}
 */
var onesMinusZeros = function (grid) {
  let rowZeroCount = []
  let rowOneCount = []
  let colZeroCount = []
  let colOneCount = []

  for (let y = 0; y < grid.length; y++) {
    let zero = 0
    let one = 0
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === 0) zero++
      if (grid[y][x] === 1) one++
    }
    rowZeroCount.push(zero)
    rowOneCount.push(one)
  }

  for (let x = 0; x < grid[0].length; x++) {
    let zero = 0
    let one = 0
    for (let y = 0; y < grid.length; y++) {
      if (grid[y][x] === 0) zero++
      if (grid[y][x] === 1) one++
    }
    colZeroCount.push(zero)
    colOneCount.push(one)
  }

  const diff = Array.from({ length: grid.length }, () => Array.from({ length: grid[0].length }, () => -999))
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      diff[y][x] = rowOneCount[y] + colOneCount[x] - rowZeroCount[y] - colZeroCount[x]
    }
  }
  return diff
}
