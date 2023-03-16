Number.prototype.mod = function (n) {
  'use strict'
  return ((this % n) + n) % n
}

/**
 * @param {string} firstA A first sentence (containing every letter from A to Z) in the alphabet A
 * @param {string} firstB The same sentence as firstA, translated in the alphabet B
 * @param {string} secondB A second sentence (containing every letter from A to Z) in the alphabet B
 * @param {string} secondC The same sentence as secondB, translated in the alphabet C
 * @param {string} secretC The secret message in alphabet C to be deciphered
 * @return {string} The message secretC translated to the alphabet A
 */
function decrypt(firstA, firstB, secondB, secondC, secretC) {
  // Write your code here

  const atob = {}
  const btoc = {}

  for (let i = 0; i < firstA.length; i++) {
    const a = firstA.charAt(i)
    const b = firstB.charAt(i)
    atob[b] = a.charCodeAt() - b.charCodeAt()
  }

  for (let i = 0; i < secondB.length; i++) {
    const b = secondB.charAt(i)
    const c = secondC.charAt(i)
    btoc[c] = b.charCodeAt() - c.charCodeAt()
  }

  // console.log(atob)
  // console.log(btoc)

  // const cChar = secretC.charAt(0)
  // console.log(cChar)
  // console.log(btoc[cChar])
  // console.log(atob[cChar])
  // console.log(String.fromCharCode(cChar.charCodeAt() + btoc[cChar]))
  // console.log(String.fromCharCode(cChar.charCodeAt() + btoc[cChar] + atob[cChar]))
  // console.log(String.fromCharCode(cChar.charCodeAt() + btoc[cChar] + atob[cChar] - 26))
  // let val = cChar.charCodeAt() - 65 + btoc[cChar] + atob[cChar]
  // val = val.mod(26)
  // console.log(val)
  // console.log(String.fromCharCode(val + 65))

  // console.log(String.fromCharCode((firstB.charAt(0).charCodeAt() - 65 + atob[firstB.charAt(0)]).mod(26) + 65))
  // console.log(String.fromCharCode((secondC.charAt(0).charCodeAt() - 65 + btoc[secondC.charAt(0)]).mod(26) + 65))

  let result = []
  for (let i = 0; i < secretC.length; i++) {
    if (secretC.charAt(i) === ' ') {
      result.push(' ')
      continue
    }
    let code = (secretC.charAt(i).charCodeAt() - 65 + btoc[secretC.charAt(i)]).mod(26) + 65
    code = (code - 65 + atob[String.fromCharCode(code)]).mod(26) + 65
    result.push(String.fromCharCode(code))
  }
  return result.join('')
}

/* Ignore and do not change the code below */

/**
 * Try a solution
 * @param message The message secretC translated to the alphabet A
 */
function trySolution(message) {
  console.log('' + JSON.stringify(message))
}
trySolution(
  decrypt(
    JSON.parse(readline()),
    JSON.parse(readline()),
    JSON.parse(readline()),
    JSON.parse(readline()),
    JSON.parse(readline())
  )
)

/* Ignore and do not change the code above */
