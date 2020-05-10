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

const N: number = parseInt(readline()) // Number of elements which make up the association table.
const Q: number = parseInt(readline()) // Number Q of file names to be analyzed.

let mimeTypes: { [extension: string]: string } = {}

for (let i = 0; i < N; i++) {
  const [extension, mimeType] = readline().split(' ')
  mimeTypes[extension.toLowerCase()] = mimeType
}

for (let i = 0; i < Q; i++) {
  const FNAME: string = readline() // One file name per line.

  const split = FNAME.split('.')

  if (split.length === 1) {
    console.log('UNKNOWN')
    continue
  }

  const extension = split.slice(-1)[0]
  if (extension.toLowerCase() in mimeTypes) console.log(mimeTypes[extension.toLowerCase()])
  else console.log('UNKNOWN')
}
