#!/usr/bin/env zx
// @ts-check
import 'zx/globals'

// console.log(argv)
const toKebabCase = str =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\s+]/gi, '-')
    .replace(/\-+/g, '-')
    .replace(/^\-|\-$/g, '')
    .toLowerCase()

let name = await question('Puzzle/question/challenge name: ')
if (!name) throw new Error('Name is required')

let url = ''
if (argv.leetcode) {
  const matches = name.match(/\d+\. (.*)/)
  if (!matches) throw new Error('Invalid leetcode name')
  const nameWithoutId = matches[1]
  url = `https://leetcode.com/problems/${toKebabCase(nameWithoutId)}`
} else {
  url = await question('Full URL: ')
}
if (!url) throw new Error('URL is required')

const templates = ['ts', 'ts-full', 'js', 'js-codegolf', 'js-leetcode']
let template = ''
const argvTemplate = argv.template
if (argvTemplate) {
  if (!templates.includes(argvTemplate)) throw new Error(`Invalid template: ${argvTemplate}`)
  template = argvTemplate
}
if (!template) {
  template =
    (await question('Template to use (ts, ts-full, js, js-codegolf, js-leetcode) [js-leetcode]: ', {
      choices: templates,
    })) || 'js-leetcode'
}

name = toKebabCase(name)

if (url.includes('leetcode')) name = `leetcode-${name}`
else if (url.includes('codingame')) name = `codingame-${name}`

const challengePath = path.resolve(__dirname, 'challenges', name)
const challengeReadmePath = path.resolve(challengePath, 'README.md')

await fs.copy(path.resolve(__dirname, '_templates', template), challengePath)

let README = await fs.readFile(challengeReadmePath, { encoding: 'utf-8' })
README = README.replace('codingame-temperatures', name)
README = README.replace('https://www.codingame.com/training/easy/temperatures', url)
await fs.writeFile(challengeReadmePath, README, { encoding: 'utf-8' })

console.log()
console.log('name:', name)
console.log('url :', url)
console.log()
console.log(`Initialized challenge at challenges/${name}`)
