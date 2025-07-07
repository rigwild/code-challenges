import PriorityQueue from './PriorityQueue'

export type Vertex = { id: number; links: number[] }

export function dijkstra(graph: Vertex[], source: Vertex) {
  // https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/graph/dijkstra/dijkstra.js
  const distances: { [id: number]: number } = {}
  const visited: { [id: number]: boolean } = {}
  const previous: { [id: number]: number | null } = {}

  const queue = new PriorityQueue()

  graph.forEach(v => {
    distances[v.id] = Infinity
    previous[v.id] = null
  })

  distances[source.id] = 0
  queue.add(source.id, 0)

  while (!queue.isEmpty()) {
    const currentNode = queue.poll() as number

    graph[currentNode].links
      .filter(x => !visited[x])
      .forEach(neighbor => {
        const existingDistanceToNeighbor = distances[neighbor]
        const distanceToNeighborFromCurrent = distances[currentNode] + 1

        if (distanceToNeighborFromCurrent < existingDistanceToNeighbor) {
          distances[neighbor] = distanceToNeighborFromCurrent

          if (queue.hasValue(neighbor)) queue.changePriority(neighbor, distances[neighbor])

          previous[neighbor] = currentNode
        }

        if (!queue.hasValue(neighbor)) queue.add(neighbor, distances[neighbor])
      })
    visited[currentNode] = true
  }
  return { distances, previous }
}
