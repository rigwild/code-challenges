const { promises: fs } = require('fs')
const { resolve } = require('path')

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
\`\`\`

## Challenges

### Grouped by type
${Object.entries(challengesByType)
  .map(
    ([type, challenges]) => `
#### ${type}

| Name | Platform |
| ---- | -------- |
${challenges.map(x => `| [\`${x.name}\`](./challenges/${x.raw}) | ${x.platform} |`).join('\n')}`
  )
  .join('\n')}

___

### Grouped by platform
${Object.entries(challengesByPlatform)
  .map(
    ([platform, challenges]) => `
#### ${platform}

| Name | Type |
| ---- | ---- |
${challenges.map(x => `| [\`${x.name}\`](./challenges/${x.raw}) | ${x.type} |`).join('\n')}`
  )
  .join('\n')}

___

### All challenges

| Name | Platform | Type |
| ---- | -------- | ---- |
${challenges.map(x => `| [\`${x.name}\`](./challenges/${x.raw}) | ${x.platform} | ${x.type} |`).join('\n')}

## License

\`\`\`
DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
Version 2, December 2004

Copyright (C) rigwild <me@rigwild.dev>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

0. You just DO WHAT THE FUCK YOU WANT TO.
\`\`\`
`

const setup = async () => {
  const challengesPath = resolve(__dirname, 'challenges')
  const challengesRaw = (await fs.readdir(challengesPath)).sort((a, b) =>
    a.replace(/^.*?-/, '').localeCompare(b.replace(/^.*?-/, ''))
  )

  let challenges = []

  for (const aChallenge of challengesRaw) {
    const s = aChallenge.split('-')
    const name = s.slice(1).join('-')
    const platform = s[0]
    const challengeReadme = await fs.readFile(resolve(challengesPath, aChallenge, 'README.md'), { encoding: 'utf-8' })
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

  await fs.writeFile(resolve(__dirname, 'README.md'), `${result.trim()}\n`)
}
setup()
