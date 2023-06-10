/**
 * @param {number} n
 * @return {boolean}
 */
var isFascinating = function (n) {
  const res = `${n}${2 * n}${3 * n}`.split('').map(x => +x)
  // console.log(res)
  const seen = new Set()
  for (const x of res) {
    if (x === 0 || seen.has(x)) return false

    seen.add(x)
  }
  return true
}
