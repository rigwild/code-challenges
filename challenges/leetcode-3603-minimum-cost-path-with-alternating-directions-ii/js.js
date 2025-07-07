/**
 * @param {number} row
 * @param {number} col
 * @param {number[][]} waitCost
 * @return {number}
 */
function minCost(row, col, waitCost) {
  // 2D array
  const cache = Array.from({ length: row }, () => Array.from({ length: col }, () => Infinity))

  function dp(i, j) {
    if (i < 0 || j < 0) {
      return Infinity
    }

    if (i === 0 && j === 0) {
      return 1
    }

    if (cache[i][j] !== Infinity) {
      return cache[i][j]
    }

    const entryCost = (i + 1) * (j + 1)
    const nextWaitCost = waitCost[i][j]
    const cost = Math.min(dp(i - 1, j), dp(i, j - 1)) + entryCost + nextWaitCost

    cache[i][j] = cost
    return cost
  }

  return dp(row - 1, col - 1) - waitCost[row - 1][col - 1]
}
