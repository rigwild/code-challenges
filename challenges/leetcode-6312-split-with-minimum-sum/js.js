/**
 * @param {number} num
 * @return {number}
 */
var splitNum = function (num) {
  const nums = ('' + num).split('').sort((a, b) => a - b)
  let l = ''
  let r = ''
  console.log(nums)
  nums.forEach((n, i) => {
    if (i % 2 === 0) l += n
    else r += n
  })
  console.log(l, r)

  return +l + +r
}
