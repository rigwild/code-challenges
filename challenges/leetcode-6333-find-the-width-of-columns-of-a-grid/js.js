/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var findColumnWidth = function (grid) {
  let res = []
  console.log(grid.length)
  console.log(grid[0].length)

  for (let x = 0; x < grid[0].length; x++) {
    let maxLen = 0
    for (let y = 0; y < grid.length; y++) {
      maxLen = Math.max(maxLen, ('' + grid[y][x]).length)
    }
    console.log(maxLen)
    res.push(maxLen)
  }
  return res
}
