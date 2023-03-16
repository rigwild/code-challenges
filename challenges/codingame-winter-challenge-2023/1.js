/**
 * @param {string} s1 the first line of the page, composed of uppercase letters only
 * @param {string} s2 the second line, composed of uppercase letters and of the same length as s1
 * @return {string} the decrypted message, created by alternating the letters of s1 and s2
 */
function decrypt(s1, s2) {
  // Write your code here
  let str = ''
  for (let i = 0; i < s1.length; i++) {
    str += s1.charAt(i)
    str += s2.charAt(i)
  }
  return str
}

/* Ignore and do not change the code below */

/**
 * Try a solution
 * @param message the decrypted message, created by alternating the letters of s1 and s2
 */
function trySolution(message) {
  console.log('' + JSON.stringify(message))
}
trySolution(decrypt(JSON.parse(readline()), JSON.parse(readline())))

/* Ignore and do not change the code above */
