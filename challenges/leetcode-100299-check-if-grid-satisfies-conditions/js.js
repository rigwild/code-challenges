// @ts-check
/**
 * @param {number[][]} grid
 * @return {boolean}
 */
var satisfiesConditions = function (grid) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (x + 1 < grid[0].length && grid[y][x] === grid[y][x + 1]) return false
      if (y + 1 < grid.length && grid[y][x] !== grid[y + 1][x]) return false
    }
  }
  return true
}
