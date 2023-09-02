/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var canBeEqual = function (s1, s2) {
  if (s1 === s2) return true

  let copy
  let temp

  copy = s1.split('')
  temp = copy[0]
  copy[0] = copy[2]
  copy[2] = temp
  console.log(copy.join(''))
  if (copy.join('') === s2) return true

  copy = s1.split('')
  temp = copy[1]
  copy[1] = copy[3]
  copy[3] = temp
  console.log(copy.join(''))
  if (copy.join('') === s2) return true

  copy = s1.split('')
  temp = copy[0]
  copy[0] = copy[2]
  copy[2] = temp
  temp = copy[1]
  copy[1] = copy[3]
  copy[3] = temp
  console.log(copy.join(''))
  if (copy.join('') === s2) return true

  return false
}
