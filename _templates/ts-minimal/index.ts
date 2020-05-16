import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })

// ------ Everything above this line will get cut when running copy script

// Log args and return them
function _d<T>(arg: T): T
function _d<T>(...args: T[]): T[]
function _d(...args: any) {
  console.error(...args)
  return args
}

const _readline = () => _d(readline()).toString()
const rls = () => readline().split(' ')
const rlsInt = () => rls().map(x => +x)

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
  if (Math.abs(closestToZero) === Math.abs(t)) {
    if (closestToZero < 0 && t < 0) {
    } else closestToZero = Math.abs(closestToZero)
  }
  if (Math.abs(closestToZero) > Math.abs(t)) closestToZero = t
}

console.log(closestToZero)
