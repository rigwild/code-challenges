/**
 * @param {number[]} nums
 * @return {number[]}
 */
var separateDigits = function (nums) {
  return nums.map(x => (x + '').split('')).flat()
}
