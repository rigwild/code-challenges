//@ts-check

// console.log = () => {}

/**
 * @param {number[]} nums
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
var maxSum = function (nums, m, k) {
  console.log('###########')

  let _sub = nums.slice(0, k)
  let map = _sub.reduce((acc, cur) => {
    if (!acc[cur]) {
      acc[cur] = 0
    }
    acc[cur]++
    return acc
  }, {})
  let distinctCount = Object.keys(map).length
  let sum = _sub.reduce((acc, cur) => acc + cur, 0)

  let maxSum = distinctCount >= k - (k - m) ? sum : 0

  // console.log(
  //   `0 maxSum=${maxSum}`,
  //   `map=${JSON.stringify(map)}`,
  //   `distinctCount=${distinctCount}`,
  //   `sum=${sum}`,
  //   `m=${m}`,
  //   `k=${k}`
  // )

  for (let i = 1; i < nums.length - k + 1; i++) {
    const left = nums[i - 1]
    const right = nums[i + k - 1]

    if (left === right) {
      // console.log(
      //   `${i} maxSum=${maxSum}`,
      //   `map=${JSON.stringify(map)}`,
      //   `distinctCount=${distinctCount}`,
      //   `sum=${sum}`,
      //   `m=${m}`,
      //   `k=${k}`,
      //   `left=${left}`,
      //   `right=${right}`
      // )
      continue
    }

    const wasLeftDistinct = map[left] === 1
    const isRightDistinct = !(right in map) || map[right] === 0

    map[left]--
    if (map[left] === 0) {
      delete map[left]
    }

    if (!(right in map)) {
      map[right] = 0
    }
    map[right]++

    if (wasLeftDistinct) distinctCount--
    if (isRightDistinct) distinctCount++

    sum = sum - left + right
    if (distinctCount >= k - (k - m)) maxSum = Math.max(maxSum, sum)

    // console.log(
    //   `${i} maxSum=${maxSum}`,
    //   `map=${JSON.stringify(map)}`,
    //   `distinctCount=${distinctCount}`,
    //   `sum=${sum}`,
    //   `m=${m}`,
    //   `k=${k}`,
    //   `left=${left}`,
    //   `right=${right}`
    // )
  }

  return maxSum
}
