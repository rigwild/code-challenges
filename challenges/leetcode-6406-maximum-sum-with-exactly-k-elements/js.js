/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximizeSum = function (nums, k) {
  nums.sort((a, b) => a - b)
  let sum = 0
  for (let i = 0; i < k; i++) {
    // console.log(nums)
    sum += nums[nums.length - 1]
    nums[nums.length - 1]++
  }
  return sum
}
