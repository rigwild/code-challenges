import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })

// ------ Everything above this line will get cut when running copy script

let str: string = readline()

str = str.toLowerCase()

str = str.slice(0, 1).toUpperCase() + str.slice(1)

str = str.replace(/\s*\.+[\s\,]*/g, '. ')
console.error(str)
str = str.replace(/\s*\,+[\s\,]*/g, ', ')
console.error(str)

str = str.replace(/\s\s/g, ' ')
console.error(str)

str = str.replace(/\.\s([a-z])/g, (_, a) => `. ${a.toUpperCase()}`)
console.error(str)

str = str.trim()
console.error(str)

console.log(str)
