import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })

// ------ Everything above this line will get cut when running copy script

enum Sign {
  Rock = 'R',
  Paper = 'P',
  Scissors = 'C',
  Lizard = 'L',
  Spock = 'S'
}

type Cell = { sign: Sign; futureSign?: Sign }

const whoWin = (a: Sign, b: Sign) => {
  if (a === Sign.Scissors && b === Sign.Paper) return a
  if (a === Sign.Paper && b === Sign.Rock) return a
  if (a === Sign.Rock && b === Sign.Lizard) return a
  if (a === Sign.Lizard && b === Sign.Spock) return a
  if (a === Sign.Spock && b === Sign.Scissors) return a
  if (a === Sign.Scissors && b === Sign.Lizard) return a
  if (a === Sign.Lizard && b === Sign.Paper) return a
  if (a === Sign.Paper && b === Sign.Spock) return a
  if (a === Sign.Spock && b === Sign.Rock) return a
  if (a === Sign.Rock && b === Sign.Scissors) return a
  if (a === b) return a // We don't care as it just propagates the sign on the map
  return b
}

let map: Cell[] = []

const [w, h, n] = readline()
  .split(' ')
  .map(x => parseInt(x))

for (let y = 0; y < h; y++)
  map.push(
    ...readline()
      .split('')
      .map((sign, x) => ({ sign: sign as Sign }))
  )

console.error('Init map')
console.error(map)

for (let i = 0; i < n; i++) {
  for (let pos = 0; pos < w * h; pos++) {
    const posSign = map[pos].sign
    // Find neighbors
    let attackers: Sign[] = []
    if (pos % w !== 0) attackers.push(map[pos - 1].sign) // left
    if ((pos + 1) % w !== 0) attackers.push(map[pos + 1].sign) // right
    if (pos - w >= 0) attackers.push(map[pos - w].sign) // top
    if (pos + w < w * h) attackers.push(map[pos + w].sign) // bottom
    // Remove duplicate signs and same sign as pos
    attackers = [...new Set(attackers)].filter(x => x !== posSign)
    console.error(`Attackers signs for ${pos} (${posSign}):`, attackers)

    // Find which sign wins the war
    let fighters = attackers.filter(x => whoWin(posSign, x) !== posSign)
    console.error(`Signs that can beat ${pos} (${posSign}):`, fighters)
    console.error(`Before war for ${pos} (${posSign}):`, fighters)
    while (fighters.length > 1) {
      // console.error(`p1=(id=${p1.id}, ${p1.sign}) vs p2=(id=${p2.id}, ${p2.sign}) -> ${p1 ? 'p1' : 'p2'}`)
      fighters = [whoWin(fighters[0], fighters[1]), ...fighters.slice(2)]
      console.error(`Pending war for ${pos} (${posSign}):`, fighters)
    }
    const warWinner = fighters[0] || posSign
    console.error(`Winner of war for ${pos} (${posSign}):`, warWinner)
    map[pos].futureSign = warWinner
  }
  console.error()

  // Apply new signs to cells
  map = map.map(x => ({ sign: x.futureSign as Sign }))
}

const rows = map
  .map(x => x.sign)
  .join('')
  .match(new RegExp(`.{1,${w}}`, 'g')) as string[]
rows.forEach(x => console.log(x))
