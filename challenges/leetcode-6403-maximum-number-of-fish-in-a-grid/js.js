const dirs = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
]

const isInBounds = (grid, x, y) => y >= 0 && y < grid.length && x >= 0 && x < grid[0].length

const bfs = (grid, x, y) => {
  if (grid[y][x] === 0) return 0

  let queue = []
  let visited = Array.from({ length: grid.length }, (_, vY) =>
    Array.from({ length: grid[0].length }, (_, vX) => grid[vY][vX])
  )
  let sum = 0

  queue.push([x, y])
  sum = visited[y][x]
  visited[y][x] = 0

  while (queue.length != 0) {
    let [cellX, cellY] = queue.shift()

    dirs.forEach(([dx, dy]) => {
      let adjX = cellX + dx
      let adjY = cellY + dy

      if (isInBounds(visited, adjX, adjY) && visited[adjY][adjX] > 0) {
        // console.log('isInBounds', adjX, adjY, visited[adjY][adjX], sum)
        sum += visited[adjY][adjX]
        queue.push([adjX, adjY])
        visited[adjY][adjX] = 0
      }
    })
  }
  return sum
}

/**
 * @param {number[][]} grid
 * @return {number}
 */
var findMaxFish = function (grid) {
  let max = 0
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      max = Math.max(max, bfs(grid, x, y))
    }
  }
  return max
}
