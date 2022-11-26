// Cuts code above `// ------ Everything above this line will get cut when running copy script`
// Minify script
// Copy output to clipboard

const { promises: fs } = require('fs')

const clipboardy = require('clipboardy')
const terser = require('terser')

const file = 'js.js'
const outputMin = 'js.min.js'
const separator = '// ------ Everything above this line will get cut when running copy script'

const run = async () => {
  const content = await fs.readFile(file, { encoding: 'utf8' })
  let script = ''

  // Split polyfill
  if (content.includes(separator)) script = content.split(separator)[1].trim()
  else script = content.trim()

  // Rename SpiderMonkey polyfills
  script = script.replace(/readline/g, '__readline').replace(/print/g, '__print')
  // Add `__readline` and `__print` as variables so they get minified
  script = `const __readline = readline\nconst __print = print\n\n${script}`

  // Minify
  const minified = terser.minify(script, {
    ecma: 2020,
    mangle: {
      toplevel: true,
      eval: true,
    },
    compress: {
      defaults: true,
      passes: 2,
      collapse_vars: true,
      hoist_funs: true,
      unsafe: true,
      arguments: true,
      booleans_as_integers: true,
      ecma: 2020,
      unsafe_arrows: true,
      unsafe_comps: true,
      unsafe_Function: true,
      unsafe_math: true,
      unsafe_symbols: true,
      unsafe_methods: true,
      unsafe_proto: true,
      unsafe_regexp: true,
      unsafe_undefined: true,
    },
    toplevel: true,
  })

  if (minified.error) return console.error(minified)

  // Remove const/var/let and last semicolon
  const final = minified.code.replace(/const |let |var /g, '').replace(/\;$/g, '')

  console.log(`\nMinified (${minified.code.length} chars):`)
  console.log(minified.code)

  console.log(`\nMinified without const/let/var and dangling semicolon (${final.length} chars):`)
  console.log(final)

  await fs.writeFile(outputMin, final)

  await clipboardy.write(final)
  console.log('\nCopied script to clipboard.')
}

run()
