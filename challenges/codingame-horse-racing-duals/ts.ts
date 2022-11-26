import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })

// ------ Everything above this line will get cut when running copy script

const N = parseInt(readline())

let horses = []

for (let i = 0; i < N; i++) horses.push(parseInt(readline()))

horses.sort((a, b) => a - b)
let smallestDiff = horses[0]

for (let i = 1; i < horses.length; i++) {
  const diff = horses[i] - horses[i - 1]
  if (diff < smallestDiff) smallestDiff = diff
}

console.log(smallestDiff)
