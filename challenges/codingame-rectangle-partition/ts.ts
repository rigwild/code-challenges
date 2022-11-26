import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })

// ------ Everything above this line will get cut when running copy script

const rsInt = () =>
  readline()
    .split(' ')
    .map(x => +x)

const [w, h, countX, countY] = rsInt()

const xArr = [0, ...rsInt(), w]
const yArr = [0, ...rsInt(), h]

console.error(w, h)
console.error(xArr)
console.error(yArr)

let allWidths: number[] = []
let allHeights: number[] = []

console.error()

// Get all widths
for (let i = xArr.length - 1; i > 0; i--)
  for (let j = xArr.length - 1; j >= 0; j--) if (xArr[i] - xArr[j] > 0) allWidths.push(xArr[i] - xArr[j])

// Get all heights
for (let i = yArr.length - 1; i > 0; i--)
  for (let j = yArr.length - 1; j >= 0; j--) if (yArr[i] - yArr[j] > 0) allHeights.push(yArr[i] - yArr[j])

console.error('allWidths:', allWidths)
console.error('allHeights:', allHeights)

// Check if same value found
let count = 0

allWidths.forEach(x => (count += allHeights.filter(y => x === y).length))

console.log(count)
