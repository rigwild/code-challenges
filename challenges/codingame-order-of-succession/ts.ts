import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })

// ------ Everything above this line will get cut when running copy script

class Vertex {
  public links: Vertex[] = []

  constructor(
    public id: number,
    public name: string,
    public parent: string,
    public birth: number,
    public death: string,
    public religion: string,
    public gender: string
  ) {}

  public addLink(toLink: Vertex) {
    if (this.name === toLink.parent) this.links.push(toLink)
    else this.links.forEach(aLink => aLink.addLink(toLink))
  }

  public toString(): string {
    return this.links.length > 0 ? `${this.name} [${this.links.map(x => x.toString()).join(', ')}]` : `${this.name}`
  }

  public getTreeOutput(): Vertex[] {
    const output: Vertex[] = []
    if (this.death === '-' && this.religion !== 'Catholic') output.push(this)

    this.links
      .sort((a, b) => {
        if (a.gender === b.gender) return a.birth - b.birth
        return a.gender === 'M' ? -1 : 1
      })
      .forEach(aLink => output.push(...aLink.getTreeOutput()))

    return output
  }
}

let root: Vertex = null as any

const n: number = parseInt(readline())
for (let i = 0; i < n; i++) {
  const [name, parent, birth, death, religion, gender] = readline().split(' ')

  const v = new Vertex(i, name, parent, +birth, death, religion, gender)
  if (!root) root = v
  else root.addLink(v)
}

// console.error(root.toString())
root
  .getTreeOutput()
  .map(x => x.name)
  .forEach(x => console.log(x))
