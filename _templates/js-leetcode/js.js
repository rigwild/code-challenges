const readlineSync = require('readline-sync')

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })

// ------ Everything above this line will get cut when running copy script

const n = parseInt(readline()) // the number of temperatures to analyse

if (n === 0) {
  console.log('0')
  return
}

const inputs = readline().split(' ')

let closestToZero = 99999
for (let i = 0; i < n; i++) {
  const t = parseInt(inputs[i]) // a temperature expressed as an integer ranging from -273 to 5526
  if (Math.abs(closestToZero) === Math.abs(t)) {
    if (closestToZero < 0 && t < 0) {
    } else closestToZero = Math.abs(closestToZero)
  }
  if (Math.abs(closestToZero) > Math.abs(t)) closestToZero = t
}

console.log(closestToZero)
