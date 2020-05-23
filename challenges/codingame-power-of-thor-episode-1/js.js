'use strict'
function _d(...args) {
  console.error(...args)
  return args
}
// Read input, log it and return it. `toString()` for SpiderMonkey compatibility.
const _readline = () => _d(readline()).toString()
// ------ SCRIPT
let inputs = readline().split(' ')
const lightX = parseInt(inputs[0]) // the X position of the light of power
const lightY = parseInt(inputs[1]) // the Y position of the light of power
let tx = parseInt(inputs[2]) // Thor's starting X position
let ty = parseInt(inputs[3]) // Thor's starting Y position
// game loop
while (true) {
  const remainingTurns = parseInt(readline()) // The remaining amount of turns Thor can move. Do not remove this line.
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
  _d(tx, ty)
  console.log(move)
}
