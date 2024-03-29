// Copy script to clipboard
// Cuts code above `// ------ Everything above this line will get cut when running copy script`

const { promises: fs } = require('fs')
const { resolve } = require('path')
const { createHmac } = require('crypto')
const clipboardy = require('clipboardy')
const typescript = require('typescript')

const separator = '// ------ Everything above this line will get cut when running copy script'

const sha256 = str => createHmac('sha256', 'shitty-salt').update(str).digest('hex')

const run = async () => {
  const content = await fs.readFile('ts.ts', { encoding: 'utf8' })

  let script = ''
  if (content.includes(separator)) script = content.split(separator)[1].trim()
  else script = content.trim()

  // Wrap in function
  script = `;(async () => {\n\n${script}\n\n})()`

  // Remove top-level TypeScript return ignore
  script = script.replace(/\/\/ \@ts-ignore\n\s*return/g, 'return')

  if (process.argv[2] === '--js') {
    console.log('Compile TypeScript and copy output')
    script = typescript.transpileModule(script, require(resolve(__dirname, 'tsconfig.json'))).outputText
  }

  console.log(`Script SHA256: ${sha256(script)}.`)

  await clipboardy.write(script)
  console.log('Copied script to clipboard.')
}

run()
