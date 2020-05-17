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

// ------ SCRIPT
