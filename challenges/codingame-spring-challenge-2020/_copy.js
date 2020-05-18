// Copy script to clipboard
// Cuts code above `// ------ Everything above this line will get cut when running copy script`
// Prepend with a hash of the content, so you can make sure your clipboard was updated.
// `// <hash>\n`

const { promises: fsp } = require('fs')
const { resolve: r } = require('path')
const { createHmac } = require('crypto')

const files = ['Player.java', 'Pacmap.java', 'Pac.java', 'PacMapCell.java']

const addHash = true

const sha256 = str => createHmac('sha256', 'shitty-salt').update(str).digest('hex')

const run = async () => {
  let script = ''

  let imports = []
  let scripts = []
  console.error(files)
  ;(await Promise.all(files.map(file => fsp.readFile(r(__dirname, 'src', file), { encoding: 'utf8' })))).map(
    content => {
      let _imports = '',
        _script = ''
      if (content.includes('// imports')) {
        const cut = content.split('// imports').map(x => x.trim())
        _imports = cut[0]
        _script = cut[1]
      } else _scripts = content.trim()

      imports.push(_imports)
      scripts.push(_script.split('// cut')[0])
    }
  )

  imports.forEach(x => (script += `\n${x}`))
  scripts.forEach(x => (script += `\n${x}`))
  script += '\n}'

  if (addHash) {
    const hash = sha256(script)
    script = `// ${hash}\n\n${script}`
    console.error(`Script SHA256: ${hash}.`)
  }

  console.log(script)
  console.error('Copied script to clipboard.')
}

run()
