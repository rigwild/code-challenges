import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })

// ------ Everything above this line will get cut when running copy script

// w = width of the building.
// h = height of the building.
// n = maximum number of turns before game over.
const rl = readline
const rls = () => rl().split(' ')
let [w, h, n, x, y] = [...rls(), rl(), ...rls()].map(x => +x)

let boxUp = 0
let boxLeft = 0
let boxDown = h - 1
let boxRight = w - 1

// game loop
while (true) {
  // the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL)
  const b: string = rl()

  if (b.includes('U')) boxDown = y - 1
  if (b.includes('D')) boxUp = y + 1
  if (b.includes('L')) boxRight = x - 1
  if (b.includes('R')) boxLeft = x + 1

  x = Math.round((boxRight + boxLeft) / 2)
  y = Math.round((boxUp + boxDown) / 2)

  // the location of the next window Batman should jump to.
  console.log(`${x} ${y}`)
}
