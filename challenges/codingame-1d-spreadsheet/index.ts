import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })
const print = console.log.bind(console)

// ------ Everything above this line will get cut when running copy script

type Operation = 'VALUE' | 'ADD' | 'SUB' | 'MULT'
type Cell = { operation: Operation; arg1: string; arg2: string }

const n = parseInt(readline())

let cells: Cell[] = []
let cache: { [ref: string]: number } = {}

const refToInt = (cellData: string) => parseInt(cellData.replace('$', ''), 10)
const computeCell = (cell: Cell) => {
  let arg1: number, arg2: number

  if (cell.arg1.startsWith('$') && cell.arg1 in cache) arg1 = cache[cell.arg1]
  else if (!cell.arg1.startsWith('$')) {
    arg1 = parseInt(cell.arg1, 10)
    cache[cell.arg1] = arg1
  } else {
    arg1 = computeCell(cells[refToInt(cell.arg1)])
    cache[cell.arg1] = arg1
  }

  if (cell.arg2.startsWith('$') && cell.arg2 in cache) arg2 = cache[cell.arg2]
  else if (cell.arg2.startsWith('_')) arg2 = -1
  else if (!cell.arg2.startsWith('$')) {
    arg2 = parseInt(cell.arg2, 10)
    cache[cell.arg2] = arg2
  } else {
    arg2 = computeCell(cells[refToInt(cell.arg2)])
    cache[cell.arg2] = arg2
  }

  switch (cell.operation) {
    case 'VALUE':
      return arg1
    case 'ADD':
      return arg1 + arg2
    case 'SUB':
      return arg1 - arg2
    case 'MULT':
      return arg1 * arg2
  }
}

for (let i = 0; i < n; i++) {
  const [operation, arg1, arg2] = readline().split(' ')
  cells.push({ operation: operation as Operation, arg1, arg2 })
}

for (let i = 0; i < n; i++) {
  const cellValue = computeCell(cells[i])
  console.log(cellValue === -0 ? 0 : cellValue)
}
