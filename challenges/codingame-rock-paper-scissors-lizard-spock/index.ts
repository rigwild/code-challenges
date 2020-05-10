import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })
const print = console.log.bind(console)
const printErr = console.error.bind(console)

// ------ Everything above this line will get cut when running copy script

enum Sign {
  Rock = 'R',
  Paper = 'P',
  Scissors = 'C',
  Lizard = 'L',
  Spock = 'S'
}

type Player = { id: number; sign: Sign; winHistory: number[]; lost: boolean }

const whoWin = (a: Player, b: Player) => {
  if (a.sign === Sign.Lizard && b.sign === Sign.Paper) return a
  if (a.sign === Sign.Lizard && b.sign === Sign.Spock) return a
  if (a.sign === Sign.Paper && b.sign === Sign.Rock) return a
  if (a.sign === Sign.Paper && b.sign === Sign.Spock) return a
  if (a.sign === Sign.Rock && b.sign === Sign.Lizard) return a
  if (a.sign === Sign.Rock && b.sign === Sign.Scissors) return a
  if (a.sign === Sign.Scissors && b.sign === Sign.Lizard) return a
  if (a.sign === Sign.Scissors && b.sign === Sign.Paper) return a
  if (a.sign === Sign.Spock && b.sign === Sign.Rock) return a
  if (a.sign === Sign.Spock && b.sign === Sign.Scissors) return a
  if (a.sign === b.sign && a.id < b.id) return a
  return b
}

let players: Player[] = []

const n = parseInt(readline())
for (let i = 0; i < n; i++) {
  const inputs = readline().split(' ')
  players.push({ id: parseInt(inputs[0]), sign: inputs[1] as Sign, winHistory: [], lost: false })
}

printErr('Init players')
printErr(players)

while (players.length > 1) {
  for (let i = 0, m = players.length; i < m; i += 2) {
    const p1 = players[i]
    const p2 = players[i + 1]
    printErr('p1 ' + JSON.stringify(p1))
    printErr('p2 ' + JSON.stringify(p2))
    const p1Won = whoWin(p1, p2).id === p1.id
    printErr(`p1=(id=${p1.id}, ${p1.sign}) vs p2=(id=${p2.id}, ${p2.sign}) -> ${p1 ? 'p1' : 'p2'}`)
    if (p1Won) {
      p1.winHistory.push(p2.id)
      p2.lost = true
    } else {
      p2.winHistory.push(p1.id)
      p1.lost = true
    }
  }
  players = players.filter(x => !x.lost)
  printErr(players)
}

console.log(players[0].id)
console.log(players[0].winHistory.join(' '))
