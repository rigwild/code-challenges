import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })

// ------ Everything above this line will get cut when running copy script

const rsInt = () =>
  readline()
    .split(' ')
    .map(x => +x)

// N = The total number of nodes in the level, including the gateways
// L = The number of links
// E = The number of exit gateways
const [n, l, e] = rsInt()

type Vertex = number[]

const nodes: Vertex[] = Array.from({ length: n }, () => [])

for (let i = 0; i < l; i++) {
  // N1 and N2 defines a link between these nodes
  const [n1, n2] = rsInt()
  nodes[n1][n2] = n2
  nodes[n2][n1] = n1
}

const gateways = Array.from({ length: e }, () => +readline())

// game loop
while (true) {
  // The index of the node on which the Skynet agent is positioned this turn
  const si = +readline()

  // console.error(si)
  // console.error(nodes)

  for (let i = 0; i < e; i++) {
    const virus = nodes[si]
    const gateway = gateways[i]

    console.error(virus)
    if (virus[gateway]) {
      // The virus is next to the gateway
      console.log(`${si} ${gateway}`)
      delete virus[gateway]
      break
    } else if (e - 1 === i) {
      const toDelete = virus.findIndex(x => x !== undefined)
      console.log(`${si} ${virus[toDelete]}`)
      delete virus[toDelete]
    }
  }
}
