const isInBounds = (grid, x, y) => y >= 0 && y < grid.length && x >= 0 && x < grid[0].length

/**
 * @param {number[][]} grid The initial grid of elements
 * @param {Unknown[]} rules Transition rules between elements
 * @return {number[][]}
 */
function solve(grid, rules) {
  rules.push()
  // Write your code here

  let result = Array.from({ length: grid.length - 1 }, () => Array.from({ length: grid[0].length - 1 }))
  let resY = 0
  let resX = 0

  for (let y = 0; y < grid[0].length; y += 1) {
    resX = 0
    for (let x = 0; x < grid.length; x += 1) {
      if (
        isInBounds(grid, x, y) &&
        isInBounds(grid, x + 1, y) &&
        isInBounds(grid, x, y + 1) &&
        isInBounds(grid, x + 1, y + 1)
      ) {
        let a = grid[y][x]
        let b = grid[y][x + 1]
        let c = grid[y + 1][x]
        let d = grid[y + 1][x + 1]
        const foundRule = rules.find(rule =>
          a === rule.pattern[0] &&
          b === rule.pattern[1] &&
          c === rule.pattern[2] &&
          d === rule.pattern[3]
        )
        result[resY][resX] = foundRule? foundRule.result : 0
        resX++
      }
    }
    resY++
  }

  // console.log('lol '+JSON.stringify(result))
  // console.log('lol '+JSON.stringify(rules))
  return result
}

/**
 * @typedef Unknown
 * @type {object}
 * @property {number[]} pattern
 * @property {number} result
 */

/* Ignore and do not change the code below */

/**
 * Try a solution
 */
function trySolution(newGrid) {
  console.log('' + JSON.stringify(newGrid))
}
trySolution(solve(JSON.parse(readline()), JSON.parse(readline())))

/* Ignore and do not change the code above */
