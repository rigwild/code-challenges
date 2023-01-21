/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var getCommon = function (nums1, nums2) {
  nums1.sort((a, b) => a - b)
  nums2.sort((a, b) => a - b)
  let i1 = 0
  let i2 = 0
  // console.log(nums1, nums2)
  while (nums1[i1] !== nums2[i2] && i1 < nums1.length && i2 < nums2.length) {
    // console.log(nums1[i1], nums2[i2])
    if (nums1[i1] > nums2[i2]) i2++
    else if (nums1[i1] < nums2[i2]) i1++
  }
  return nums1[i1] === nums2[i2] ? nums1[i1] : -1
}
