console.log = () => {}
/**
 * @param {string} s
 * @return {number}
 */
var longestSemiRepetitiveSubstring = function (s) {
  console.log('###')
  const currentFreqs = {}
  let left = 0
  let right = 1
  let sizeMax = 1

  for (left = 0; left < s.length; left++) {
    for (right = left + 1; right <= s.length; right++) {
      const str = s.slice(left, right).split('')

      let seenPair = false
      let size = 0
      console.log('START', str)

      for (let i = 0; i < str.length; i++) {
        console.log(str, str[i], i)
        if (str[i] === str[i + 1]) {
          if (!seenPair) {
            seenPair = true
            size++
          } else {
            size++
            break
          }
        } else {
          size++
        }
      }
      // if (str.length >= 2 && str[str.length - 2] !== str[str.length - 1]) {
      //     size++
      // }
      console.log('END', str, size)
      sizeMax = Math.max(sizeMax, size)
    }
  }

  return sizeMax
}
