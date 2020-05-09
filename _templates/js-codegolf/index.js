const readlineSync = require('readline-sync')

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })
const print = console.log.bind(console)

// ------ Everything above this line will get cut when running copy script

// ------ UTILS

// Log args and return them
function _d(...args) {
  console.error(...args)
  return args
}

// Read input, log it and return it. `toString()` for SpiderMonkey compatibility.
const _readline = () => _d(readline()).toString()

// ------ SCRIPT

const binaries = [...readline()].flatMap(x => [...'00'.concat(x.charCodeAt(0).toString(2)).slice(-7)])

const encode = {
  '0': '00',
  '1': '0'
}

let currentSign = binaries[0]
let output = encode[currentSign] + ' ' + '0'

for (var i = 1; i < binaries.length; i++) {
  var nextBit = binaries[i]
  output += nextBit != currentSign ? ' ' + encode[nextBit] + ' ' + '0' : '0'
  currentSign = nextBit
}

print(output)
