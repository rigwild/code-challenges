import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })

// ------ Everything above this line will get cut when running copy script

const L = parseInt(readline())
const H = parseInt(readline())
const T = readline().toLowerCase()

const regex = new RegExp(`.{1,${L}}`, 'g')
for (let i = 0; i < H; i++) {
  const letters = readline().match(regex) as string[]
  console.log(
    T.split('')
      .map(x => letters[x.charCodeAt(0) - 97] || letters[letters.length - 1])
      .join('')
  )
}
