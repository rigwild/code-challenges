/**
 * @param {string[]} strs
 * @return {number}
 */
var maximumValue = function (strs) {
  let maxCount = 0
  strs.forEach(x => {
    if (x.match(/[A-z]/)) maxCount = Math.max(maxCount, x.length)
    else maxCount = Math.max(maxCount, +x)
  })
  return maxCount
}
