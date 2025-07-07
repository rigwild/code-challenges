export type Vertex = { id: number; links: number[] }

export function dfs(graph: Vertex[], source: Vertex) {
  const visited = graph.reduce<{ [id: number]: boolean }>((acc, cur) => ((acc[cur.id] = false), acc), {})

  const stack = []
  stack.push(source)
  visited[source.id] = true
  while (stack.length) {
    const currentVertex = stack.pop() as Vertex
    console.error(currentVertex)
    currentVertex.links.forEach(_neighbor => {
      const neighbor = graph[_neighbor]
      if (!visited[neighbor.id]) {
        stack.push(neighbor)
        visited[neighbor.id] = true
      }
    })
  }
}
