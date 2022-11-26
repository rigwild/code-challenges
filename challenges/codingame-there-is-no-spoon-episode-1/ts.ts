import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })

// ------ Everything above this line will get cut when running copy script

const [width, height] = [readline(), readline()].map(x => +x)

let mp: string[] = []
for (let i = 0; i < height; i++) mp.push(...readline().split(''))

// @ts-ignore
const nodesIndexes = mp.flatMap((x, i) => (x === '0' ? i : []))

console.error(width, '*', height)
console.error(mp)
console.error('found active nodes', nodesIndexes)

const _1dToCoords = (pos: number) => [pos % width, pos / width].map(Math.floor)

nodesIndexes.forEach(nodePos => {
  // Current node
  let node = _1dToCoords(nodePos)
  console.error('\nnode', node)

  // find nearest right
  let right = [-1, -1]
  for (let i = nodePos + 1; i % width !== 0; i++) {
    console.error('i', i)
    console.error('i % width', i % width)
    if (mp[i] === '0') {
      right = _1dToCoords(i)
      break
    }
  }
  console.error('right', right)

  // find nearest bottom
  let bottom = [-1, -1]
  for (let i = nodePos + width; i < mp.length; i += width) {
    console.error('i', i)
    if (mp[i] === '0') {
      bottom = _1dToCoords(i)
      break
    }
  }
  console.error('bottom', bottom)

  // Three coordinates: a node, its right neighbor, its bottom neighbor
  console.log([...node, ...right, ...bottom].join(' '))
})
