import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })

// ------ Everything above this line will get cut when running copy script

const N: number = parseInt(readline()) // Number of elements which make up the association table.
const Q: number = parseInt(readline()) // Number Q of file names to be analyzed.

let mimeTypes: { [extension: string]: string } = {}

for (let i = 0; i < N; i++) {
  const [extension, mimeType] = readline().split(' ')
  mimeTypes[extension.toLowerCase()] = mimeType
}

for (let i = 0; i < Q; i++) {
  const FNAME: string = readline() // One file name per line.

  const split = FNAME.split('.')

  if (split.length === 1) {
    console.log('UNKNOWN')
    continue
  }

  const extension = split.slice(-1)[0]
  if (extension.toLowerCase() in mimeTypes) console.log(mimeTypes[extension.toLowerCase()])
  else console.log('UNKNOWN')
}
