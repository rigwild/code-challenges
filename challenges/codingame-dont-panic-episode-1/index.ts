import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })

// ------ Everything above this line will get cut when running copy script

const r = () =>
  readline()
    .split(' ')
    .map(x => parseInt(x, 10))

// `nbFloors` = number of floors
// `width` = width of the area
// `nbRounds` = maximum number of rounds
// `exitFloor` = floor on which the exit is found
// `exitPos` = position of the exit on its floor
// `nbTotalClones` = number of generated clones
// `nbAdditionalElevators` = ignore (always zero)
// `nbElevators` = number of elevators
const [nbFloors, width, nbRounds, exitFloor, exitPos, nbTotalClones, nbAdditionalElevators, nbElevators] = r()

const elevators = new Map<number, number>()
for (let i = 0; i < nbElevators; i++) {
  // `elevatorFloor` = floor on which this elevator is found
  // `elevatorPos` = position of the elevator on its floor
  const [elevatorFloor, elevatorPos] = r()
  elevators.set(elevatorFloor, elevatorPos)
}

console.error(elevators)

// game loop
while (true) {
  // `cloneFloor` = floor of the leading clone
  // `clonePos` = position of the leading clone on its floor
  // `direction` = direction of the leading clone: LEFT or RIGHT
  let [cloneFloorRaw, clonePosRaw, direction] = readline().split(' ')
  const cloneFloor = parseInt(cloneFloorRaw)
  const clonePos = parseInt(clonePosRaw)

  const isOnExitFloor = cloneFloor === exitFloor
  const sameFloorElevatorPos = elevators.get(cloneFloor)
  const posToTarget = isOnExitFloor ? exitPos : (sameFloorElevatorPos as number)
  const targetDirection = clonePos < posToTarget ? 'RIGHT' : 'LEFT'

  // action: WAIT or BLOCK
  if ((clonePos !== posToTarget && targetDirection !== direction) || clonePos === 0 || clonePos === width - 1)
    console.log('BLOCK')
  else console.log('WAIT')
}
