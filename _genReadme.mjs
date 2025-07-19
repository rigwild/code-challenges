// @ts-check

import * as url from 'url'
import * as path from 'path'
import * as fs from 'fs/promises'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const readme = (challenges, challengesByPlatform, challengesByType) => `
# code-challenges

This is a collection of some of my submissions to code challenges/contests.

## TOC

- [Grouped by type](#grouped-by-type)
  - [Classic](#classic)
  - [Code Golf](#code-golf)
  - [Contest](#contest)
- [Grouped by platform](#grouped-by-platform)
  - [CodinGame](#codingame)
  - [LeetCode](#leetcode)
- [All challenges](#all-challenges)

## Add a challenge

\`\`\`sh
pnpm i
zx _initChallenge.mjs
zx _initChallenge.mjs --leetcode
\`\`\`

## Generate README

\`\`\`sh
zx _genReadme.mjs
\`\`\`

## Challenges

${Object.entries(challengesByPlatform)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(
    ([platform, challenges]) => `
### ${platform}

| Name | Type |
| ---- | ---- |
${challenges.map(x => `| [\`${x.name}\`](./challenges/${x.raw}) | ${x.type} |`).join('\n')}`
  )
  .join('\n')}

## License

\`\`\`
DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
Version 2, December 2004

Copyright (C) rigwild

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

0. You just DO WHAT THE FUCK YOU WANT TO.
\`\`\`
`

const setup = async () => {
  const challengesPath = path.resolve(__dirname, 'challenges')
  const extractNumber = filename => {
    // Handles cases like "leetcode-100289-minimum-substring-partition-of-equal-character-frequency"
    // Grabs the first sequence of digits after the platform
    const match = filename.match(/^[^-]+-(\d+)/)
    return match ? Number(match[1]) : Infinity
  }

  const challengesRaw = (await fs.readdir(challengesPath)).sort((a, b) => {
    const numA = extractNumber(a)
    const numB = extractNumber(b)
    // fallback to string comparison if no number
    if (numA !== numB) return numA - numB
    return a.localeCompare(b)
  })

  let challenges = []

  for (const aChallenge of challengesRaw) {
    const s = aChallenge.split('-')
    const name = s.slice(1).join('-')
    const platform = s[0]
    const challengeReadme = await fs.readFile(path.resolve(challengesPath, aChallenge, 'README.md'), { encoding: 'utf-8' })
    const type = challengeReadme.match(/\*\*Type\:\*\*\s(.*)/)[1]

    challenges.push({ name, platform, type, raw: aChallenge })
  }

  const challengesByPlatform = challenges.reduce((acc, cur) => {
    acc[cur.platform] = (acc[cur.platform] || []).concat(cur)
    return acc
  }, {})

  const challengesByType = challenges.reduce((acc, cur) => {
    acc[cur.type] = (acc[cur.type] || []).concat(cur)
    return acc
  }, {})

  const result = readme(challenges, challengesByPlatform, challengesByType)

  console.log(challengesRaw)
  console.log(challenges)
  console.log(challengesByPlatform)
  console.log()
  console.log(result)

  await fs.writeFile(path.resolve(__dirname, 'README.md'), `${result.trim()}\n`)
}
setup()
