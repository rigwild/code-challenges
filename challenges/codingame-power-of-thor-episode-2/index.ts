import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })

// ------ Everything above this line will get cut when running copy script

const r = () =>
  readline()
    .split(' ')
    .map(x => +x)

const width = 40
const height = 18

// `tx` = Thor's starting X position
// `ty` = Thor's starting Y position
const [tx, ty] = r()

// game loop
while (true) {
  // `h` = The remaining number of hammer strikes.
  // `n` = The number of giants which are still present on the map.
  const [h, n] = r()
  let giants: { x: number; y: number }[] = []
  for (let i = 0; i < n; i++) {
    const [x, y] = r()
    giants.push({ x, y })
  }

  // The movement or action to be carried out: WAIT STRIKE N NE E SE S SW W or N
  console.log('WAIT')
}
