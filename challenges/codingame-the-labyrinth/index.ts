import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })

// ------ Everything above this line will get cut when running copy script

const rl = readline
const rls = () => rl().split(' ')
const rlsInt = () => rls().map(x => +x)

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

enum CellType {
  WALL = '#',
  EMPTY = '.',
  START = 'T',
  END = 'C',
  UNKNOW = '?'
}

type Cell = { content: CellType; parentPos?: number }

type MapData = Cell[]

// h = laby height
// w = laby width
// A = number of rounds between the time the alarm countdown is activated and the time the alarm goes off.
const [h, w, a] = rlsInt()

console.error(`h=${h}, w=${w}, a=${a}`)

let maze: MapData

const coordTo1d = (x: number, y: number) => x + w * y

const mazeStr = () => {
  let mazeStr = ''
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      mazeStr += maze[coordTo1d(x, y)].content
    }
    mazeStr += '\n'
  }
  return mazeStr
}

/*

  procedure BFS(G, start_v) is
     let Q be a queue
     label start_v as discovered
     Q.enqueue(start_v)
     while Q is not empty do
         v := Q.dequeue()
         if v is the goal then
             return v
         for all edges from v to w in G.adjacentEdges(v) do
             if w is not labeled as discovered then
                 label w as discovered
                 w.parent := v
                 Q.enqueue(w)

*/

const bfs = (map: MapData, startPosition: number) => {
  let q: number[] = []
  let discovered = Array(map.length).fill(false)
  discovered[startPosition] = true
  q.push(startPosition)

  while (q.length) {
    let v = q.shift() as number
    if (map[startPosition].content === CellType.END) return v

    // Top right bottom left
    const adjacent = [v - w, v + 1, v + w, v - 1]
      .filter(x => x >= 0 && x < w * h && v % w != 0 && x % w != 0)
      .map(x => ({ pos: x, cell: map[x] }))
    for (const { pos, cell } of adjacent) {
      // If a wall, mark as discovered and ignore
      if (!discovered[pos]) {
        discovered[pos] = true
        if (cell.content === CellType.WALL) cell.parentPos = v
        q.push(pos)
      }
    }
  }
}

while (true) {
  // Where Kirk is located.
  const [y, x] = rlsInt()

  maze = []
  for (let i = 0; i < h; i++) {
    maze.push(
      ...rl()
        .split('')
        .map(x => ({ content: x as CellType }))
    )
  }

  console.error(mazeStr())
  console.error('After BFS')
  console.error(mazeStr())
  break

  // Kirk's next move (UP DOWN LEFT or RIGHT).
  console.log('RIGHT')
}
