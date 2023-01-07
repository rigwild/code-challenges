/**
 * @param {number[]} vals
 * @param {number[][]} edges
 * @param {number} k
 * @return {number}
 */
var maxStarSum = function (vals, edges, kMax) {
  console.log('##########')
  // console.log = () => {}

  const graph = {}
  vals.forEach((val, i) => {
    graph[i] = {
      val,
      neighbours: new Set(),
    }
  })

  edges.forEach(([a, b]) => {
    graph[a].neighbours.add(b)
    graph[b].neighbours.add(a)
  })

  let maxSum = vals[0]
  Object.keys(graph).forEach(k => {
    console.log('----')
    const neighboursValsDesc = [...graph[k].neighbours]
      .sort((a, b) => graph[b].val - graph[a].val)
      .map(x => graph[x].val)
    console.log(graph[k])
    console.log(neighboursValsDesc)
    let maxSumLocal = graph[k].val
    for (let i = 0; i < neighboursValsDesc.length && i < kMax; i++) {
      console.log('kMax', kMax, 'i', i)
      maxSumLocal = Math.max(maxSumLocal, maxSumLocal + neighboursValsDesc[i])
      console.log(maxSumLocal)
      console.log('maxSumLocal', maxSumLocal)
    }
    maxSum = Math.max(maxSum, maxSumLocal)
    console.log('maxSum', maxSum)
  })

  console.log(graph)

  return maxSum
}
