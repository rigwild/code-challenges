// Copy script to clipboard
// Cuts code above `// ------ Everything above this line will get cut when running copy script`

const { promises: fsp } = require('fs')
const { resolve: r } = require('path')
const { createHmac } = require('crypto')
const clipboardy = require('clipboardy')
const typescript = require('typescript')

const file = r(__dirname, 'index.ts')
const separator = '// ------ Everything above this line will get cut when running copy script'

const sha256 = str => createHmac('sha256', 'shitty-salt').update(str).digest('hex')

const run = async () => {
  const content = await fsp.readFile(file, { encoding: 'utf8' })

  let script = ''
  if (content.includes(separator)) script = content.split(separator)[1].trim()
  else script = content.trim()

  // Wrap in function
  script = `;(() => {\n\n${script}\n\n})()`

  // Remove top-level TypeScript return ignore
  script = script.replace(/\/\/ \@ts-ignore\n\s*return/g, 'return')

  if (process.argv.find(x => x === '--js')) {
    console.log('Compile TypeScript')
    script = typescript.transpileModule(script, require('./tsconfig.json')).outputText
  }
  if (process.argv.find(x => x === '--copy')) {
    await clipboardy.write(script)
    console.log('Copied script to clipboard.')
  }
  if (process.argv.find(x => x === '--dist')) {
    // Output file (for CodinGame IDE sync)
    if (
      !(await fsp.access(r(__dirname, 'dist')).then(
        () => true,
        () => false
      ))
    )
      await fsp.mkdir(r(__dirname, 'dist'))
    await fsp.writeFile(r(__dirname, 'dist', 'index.js'), script)
  }

  console.log(`Script SHA256: ${sha256(script)}.`)
}

run()
