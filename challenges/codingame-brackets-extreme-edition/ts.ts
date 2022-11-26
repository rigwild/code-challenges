import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })

// ------ Everything above this line will get cut when running copy script

const str = readline()

const stack = []

const charsOpen = '[{('.split('')
const charsClose = ']})'.split('')

let isGood = true

for (let i = 0; i < str.length; i++) {
  // console.error(str[i])

  if (charsOpen.includes(str[i])) {
    stack.push(str[i])
  } else if (charsClose.includes(str[i])) {
    const lastOpen = stack.pop() as string
    console.error(lastOpen, str[i])
    if (charsClose.indexOf(str[i]) !== charsOpen.indexOf(lastOpen)) {
      isGood = false
      break
    }
  }
  console.error()
}

console.error(stack)

console.log(isGood && stack.length === 0)
