// Copy script to clipboard
// Cuts code above `// ------ Everything above this line will get cut when running copy script`

const { promises: fsp } = require('fs')
const { resolve: r } = require('path')
const { createHmac } = require('crypto')

const clipboardy = require('clipboardy')

const file = r(__dirname, 'index.ts')
const separator = '// ------ Everything above this line will get cut when running copy script'

const sha256 = str => createHmac('sha256', 'shitty-salt').update(str).digest('hex')

const run = async () => {
  const content = await fsp.readFile(file, { encoding: 'utf8' })

  let script = ''
  if (content.includes(separator)) script = content.split(separator)[1].trim()
  else script = content.trim()

  console.log(`Script SHA256: ${sha256(script)}.`)

  await clipboardy.write(script)
  console.log('Copied script to clipboard.')
}

run()
