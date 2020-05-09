import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })
const print = console.log.bind(console)

// ------ Everything above this line will get cut when running copy script

// ------ UTILS

// Log args and return them
function _d<T>(arg: T): T
function _d<T>(...args: T[]): T[]
function _d(...args: any) {
  console.error(...args)
  return args
}

// Read input, log it and return it. `toString()` for SpiderMonkey compatibility.
const _readline = () => _d(readline()).toString()

// ------ SCRIPT

const n: number = parseInt(readline()) // the number of temperatures to analyse

if (n === 0) {
  console.log('0')
  // @ts-ignore
  return 
}

const inputs: string[] = readline().split(' ')

let closestToZero = 99999
for (let i = 0; i < n; i++) {
  const t: number = parseInt(inputs[i]) // a temperature expressed as an integer ranging from -273 to 5526
  if (Math.abs(closestToZero) === Math.abs(t)){
    if (closestToZero < 0 && t < 0) {}
    else closestToZero = Math.abs(closestToZero)
  }
  if (Math.abs(closestToZero) > Math.abs(t)) closestToZero = t
}

console.log(closestToZero)
