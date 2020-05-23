import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })

// ------ Everything above this line will get cut when running copy script

let inputs: string[] = readline().split(' ')
const lightX: number = parseInt(inputs[0]) // the X position of the light of power
const lightY: number = parseInt(inputs[1]) // the Y position of the light of power
let tx: number = parseInt(inputs[2]) // Thor's starting X position
let ty: number = parseInt(inputs[3]) // Thor's starting Y position

// game loop
while (true) {
  const remainingTurns: number = parseInt(readline()) // The remaining amount of turns Thor can move. Do not remove this line.

  let move = ''

  if (ty > lightY) {
    move += 'N'
    ty += -1
  } else if (ty < lightY) {
    move += 'S'
    ty += 1
  }

  if (tx > lightX) {
    move += 'W'
    tx += -1
  } else if (tx < lightX) {
    move += 'E'
    tx += 1
  }

  console.log(move)
}
