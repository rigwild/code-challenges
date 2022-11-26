import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })

// ------ Everything above this line will get cut when running copy script

const n: number = parseInt(readline())

class _Node<K> extends Map<K, _Node<K>> {
  private children: Map<K, _Node<K>> = new Map()

  constructor(private content: K) {
    super()
  }

  public addChild(content: K) {
    this.children.set(content, new _Node(content))
  }

  public hasChild(content: K) {
    return this.children.has(content)
  }

  public getChild(content: K) {
    return this.children.get(content)
  }

  public count() {
    let c = 1
    for (const aChild of this.children.values()) c += aChild.count()
    return c
  }

  public toString() {
    let str = this.content + ' '
    for (const aChild of this.children.values()) str += aChild.toString()
    return str
  }
}

const trees: Map<number, _Node<number>> = new Map()

for (let i = 0; i < n; i++) {
  const telephone: number[] = readline()
    .split('')
    .map(x => +x)

  // Init tree if it does not exists yet
  if (!trees.has(telephone[0])) trees.set(telephone[0], new _Node(telephone[0]))

  // Insert digits in tree
  for (let y = 1, t = trees.get(telephone[0]) as _Node<number>; y < telephone.length; y++) {
    // Init node if it does not exists yet
    if (!t.hasChild(telephone[y])) t.addChild(telephone[y])

    t = t.getChild(telephone[y]) as _Node<number>
  }
}

// console.error(trees)

let count = 0
for (const aTree of trees.values()) count += aTree.count()

// The number of elements (referencing a number) stored in the structure.
console.log(count)
