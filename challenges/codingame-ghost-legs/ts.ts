import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })

// ------ Everything above this line will get cut when running copy script

const [w, h] = readline()
  .split(' ')
  .map(x => +x)

type Cell = 'E' | 'L' | 'R'

let topLabels = readline().split('  ')

const labelsCount = topLabels.length
let grid: Cell[][] = Array.from({ length: labelsCount }, () => Array.from({ length: h - 2 }, () => 'E'))

for (let i = 0; i < h - 2; i++) {
  const line: string = readline()
  for (let j = 0; j < labelsCount; j++) {
    let pipePosition = j * 3
    let direction: Cell
    if (pipePosition > 0 && line.charAt(pipePosition - 1) === '-') direction = 'L'
    else if (pipePosition < w - 1 && line.charAt(pipePosition + 1) === '-') direction = 'R'
    else direction = 'E'
    grid[j][i] = direction
  }
}

let bottomLabels = readline().split('  ')

// Find the output
for (let i = 0; i < topLabels.length; i++) {
  let currentColumnIndex = i
  for (let j = 0; j < grid[0].length; j++) {
    if (grid[currentColumnIndex][j] === 'R') currentColumnIndex++
    else if (grid[currentColumnIndex][j] === 'L') currentColumnIndex--
  }
  console.log(`${topLabels[i]}${bottomLabels[currentColumnIndex]}`)
}

console.error(grid)
