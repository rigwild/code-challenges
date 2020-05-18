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
      const match = /(?:public )?class/.exec(content)
      if (match) {
        _imports = content.slice(0, match.index).trim()
        _script = `public static class ${content.slice(match.index + match[0].length).trim()}`
      } else _scripts = content.trim()

      imports.push(_imports)
      scripts.push(_script.split('// cut')[0])
    }
  )

  imports.forEach(x => (script += `\n${x}`))
  scripts.forEach(x => (script += `\n${x}`))
  script += '\n}'
  script = script.replace(/public static class /, 'class ')

  if (addHash) {
    const hash = sha256(script)
    script = `// ${hash}\n\n${script}`
    console.error(`Script SHA256: ${hash}.`)
  }

  console.log(script)
  console.error('Copied script to clipboard.')
}

run()
