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

const L = parseInt(readline())
const H = parseInt(readline())
const T = readline().toLowerCase()

const regex = new RegExp(`.{1,${L}}`, 'g')
for (let i = 0; i < H; i++) {
  const letters = readline().match(regex) as string[]
  console.log(
    T.split('')
      .map(x => letters[x.charCodeAt(0) - 97] || letters[letters.length - 1])
      .join('')
  )
}
