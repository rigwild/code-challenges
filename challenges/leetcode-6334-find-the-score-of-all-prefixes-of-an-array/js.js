/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findPrefixScore = function (nums) {
  let res = []
  let max = nums[0]
  let sum = 0
  for (let i = 0; i < nums.length; i++) {
    max = Math.max(max, nums[i])
    res.push(nums[i] + sum + max)
    sum = nums[i] + sum + max
  }
  return res
}
