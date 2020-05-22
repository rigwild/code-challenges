import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })

// ------ Everything above this line will get cut when running copy script

const rsInt = () =>
  readline()
    .split(' ')
    .map(x => +x)

// From https://github.com/trekhleb/javascript-algorithms/blob/ba2d8dc4a8e27659c1420fe52390cb7981df4a94/src/data-structures/priority-queue/PriorityQueue.js
// https://gist.github.com/rigwild/dd3f9ce36f7398a4b0e54fde76a80181
// prettier-ignore
{
  // @ts-ignore
  class Comparator{constructor(a){this.compare=a||Comparator.defaultCompareFunction}static defaultCompareFunction(c,a){return c===a?0:c<a?-1:1}equal(c,a){return 0===this.compare(c,a)}lessThan(c,a){return 0>this.compare(c,a)}greaterThan(c,a){return 0<this.compare(c,a)}lessThanOrEqual(c,a){return this.lessThan(c,a)||this.equal(c,a)}greaterThanOrEqual(c,a){return this.greaterThan(c,a)||this.equal(c,a)}reverse(){const c=this.compare;this.compare=(d,a)=>c(a,d)}}class Heap{constructor(a){if(new.target===Heap)throw new TypeError("Cannot construct Heap instance directly");this.heapContainer=[],this.compare=new Comparator(a)}getLeftChildIndex(a){return 2*a+1}getRightChildIndex(a){return 2*a+2}getParentIndex(a){return Math.floor((a-1)/2)}hasParent(a){return 0<=this.getParentIndex(a)}hasLeftChild(a){return this.getLeftChildIndex(a)<this.heapContainer.length}hasRightChild(a){return this.getRightChildIndex(a)<this.heapContainer.length}leftChild(a){return this.heapContainer[this.getLeftChildIndex(a)]}rightChild(a){return this.heapContainer[this.getRightChildIndex(a)]}parent(a){return this.heapContainer[this.getParentIndex(a)]}swap(a,b){const c=this.heapContainer[b];this.heapContainer[b]=this.heapContainer[a],this.heapContainer[a]=c}peek(){return 0===this.heapContainer.length?null:this.heapContainer[0]}poll(){if(0===this.heapContainer.length)return null;if(1===this.heapContainer.length)return this.heapContainer.pop();const a=this.heapContainer[0];return this.heapContainer[0]=this.heapContainer.pop(),this.heapifyDown(),a}add(a){return this.heapContainer.push(a),this.heapifyUp(),this}remove(a,b=this.compare){const c=this.find(a,b).length;for(let d=0;d<c;d+=1){const c=this.find(a,b).pop();if(c===this.heapContainer.length-1)this.heapContainer.pop();else{this.heapContainer[c]=this.heapContainer.pop();const a=this.parent(c);this.hasLeftChild(c)&&(!a||this.pairIsInCorrectOrder(a,this.heapContainer[c]))?this.heapifyDown(c):this.heapifyUp(c)}}return this}find(a,b=this.compare){const c=[];for(let d=0;d<this.heapContainer.length;d+=1)b.equal(a,this.heapContainer[d])&&c.push(d);return c}isEmpty(){return!this.heapContainer.length}toString(){return this.heapContainer.toString()}heapifyUp(a){for(let b=a||this.heapContainer.length-1;this.hasParent(b)&&!this.pairIsInCorrectOrder(this.parent(b),this.heapContainer[b]);)this.swap(b,this.getParentIndex(b)),b=this.getParentIndex(b)}heapifyDown(a=0){let b=a,c=null;for(;this.hasLeftChild(b)&&(c=this.hasRightChild(b)&&this.pairIsInCorrectOrder(this.rightChild(b),this.leftChild(b))?this.getRightChildIndex(b):this.getLeftChildIndex(b),!this.pairIsInCorrectOrder(this.heapContainer[b],this.heapContainer[c]));)this.swap(b,c),b=c}pairIsInCorrectOrder(a,b){throw new Error(`You have to implement heap pair comparision method for ${a} and ${b} values.`)}}class MinHeap extends Heap{pairIsInCorrectOrder(a,b){return this.compare.lessThanOrEqual(a,b)}}class _PriorityQueue extends MinHeap{constructor(){super(),this.priorities=new Map,this.compare=new Comparator(this.comparePriority.bind(this))}add(a,b=0){return this.priorities.set(a,b),super.add(a),this}remove(a,b){return super.remove(a,b),this.priorities.delete(a),this}changePriority(a,b){return this.remove(a,new Comparator(this.compareValue)),this.add(a,b),this}findByValue(a){return this.find(a,new Comparator(this.compareValue))}hasValue(a){return 0<this.findByValue(a).length}comparePriority(c,a){return this.priorities.get(c)===this.priorities.get(a)?0:this.priorities.get(c)<this.priorities.get(a)?-1:1}compareValue(c,a){return c===a?0:c<a?-1:1}}
  var PriorityQueue = _PriorityQueue
}

type Vertex = { id: number; links: number[]; isGateway: boolean }

// N = The total number of nodes in the level, including the gateways
// L = The number of links
// E = The number of exit gateways
const [n, l, e] = rsInt()

const nodes: Vertex[] = Array.from({ length: n }, (_, i) => ({ id: i, links: [], isGateway: false }))

for (let i = 0; i < l; i++) {
  // N1 and N2 defines a link between these nodes
  const [n1, n2] = rsInt()
  nodes[n1].links.push(n2)
  nodes[n2].links.push(n1)
}

const gateways = Array.from({ length: e }, () => +readline())
gateways.forEach(x => (nodes[x].isGateway = true))

// game loop
while (true) {
  // The index of the node on which the Skynet agent is positioned this turn
  const si = +readline()
  const virus = nodes[si]

  // if (si === 17 && n >= 48) {
  //   const a = nodes[22]
  //   const b = nodes[0]
  //   console.log(`${a.id} ${b.id}`)
  //   a.links.splice(a.links.indexOf(b.id), 1)
  //   b.links.splice(b.links.indexOf(a.id), 1)
  //   continue
  // }

  console.error(si)
  console.error(nodes)

  // If the virus is next to a gateway, cut its link
  const gatewayNextToVirus = nodes.filter(x => x.isGateway).find(x => x.links.includes(si))
  if (gatewayNextToVirus) {
    console.error('Next to virus:', gatewayNextToVirus.id)
    virus.links.splice(virus.links.indexOf(gatewayNextToVirus.id), 1)
    gatewayNextToVirus.links.splice(gatewayNextToVirus.links.indexOf(virus.id), 1)
    console.log(`${virus.id} ${gatewayNextToVirus.id}`)
    continue
  }

  const distances: { [id: number]: number } = {}
  const visited: { [id: number]: boolean } = {}
  const previous: { [id: number]: number | null } = {}

  const queue = new PriorityQueue()

  nodes.forEach(v => {
    distances[v.id] = Infinity
    previous[v.id] = null
  })

  distances[virus.id] = 0
  visited[virus.id] = true
  queue.add(virus.id, 0)

  let found = false
  while (!queue.isEmpty() && !found) {
    const currentNode = queue.poll()
    for (const neighbor of nodes[currentNode].links) {
      const gatewaysLinksCount = nodes[neighbor].links.filter(x => nodes[x].isGateway).length
      if (!visited[neighbor] && !nodes[neighbor].isGateway && gatewaysLinksCount >= 1) {
        visited[neighbor] = true
        if (gatewaysLinksCount == 2) {
          const gateway = nodes[neighbor].links.filter(x => nodes[x].isGateway)[0]
          if (gateway) {
            nodes[gateway].links.splice(nodes[gateway].links.indexOf(nodes[neighbor].id), 1)
            nodes[neighbor].links.splice(nodes[neighbor].links.indexOf(nodes[gateway].id), 1)
            console.log(`${nodes[gateway].id} ${nodes[neighbor].id}`)
            found = true
            break
          }
        } else queue.add(neighbor)
      }
    }
  }
  if (found) continue

  const firstCuttable = nodes.find(x => x.isGateway && x.links.length >= 1) as Vertex
  const a = firstCuttable
  const b = nodes[firstCuttable.links[0]]
  console.error('Nothing to cut, simply cut the first available', a.id, b.id)
  console.log(`${a.id} ${b.id}`)
  a.links.splice(a.links.indexOf(b.id), 1)
  b.links.splice(b.links.indexOf(a.id), 1)
}
