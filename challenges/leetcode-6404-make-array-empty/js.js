// console.log = () => {}

// Correct but time limit exceeded
/**
 * @param {number[]} nums
 * @return {number}
 */
var countOperationsToEmptyArray = function (nums) {
  const freq = {}
  nums.forEach(x => (freq[x] = (freq[x] || 0) + 1))
  let smallest = Object.keys(freq)
    .map(x => +x)
    .sort((a, b) => b - a)
  console.log(freq, smallest)

  let count = 0
  while (nums.length > 0) {
    console.log(nums, freq, smallest)
    if (nums.length === 1) {
      nums.shift()
      count++
      continue
    }

    count++

    if (nums.length === 1) continue

    const first = nums.shift()

    if (first === smallest[smallest.length - 1]) {
      freq[first]--
      if (freq[first] <= 0) {
        delete freq[first]
        smallest.pop()
      }
    } else {
      nums.push(first)
    }
    // if (count > 150) return count
  }
  return count
}

//

// Incorrect, but I think it's close
/**
 * @param {number[]} nums
 * @return {number}
 */
var countOperationsToEmptyArray2 = function (nums) {
  console.log('€€€€€€€€€€€€€€€€')

  let smallest = nums.map((x, xi) => ({ num: x, index: xi })).sort((a, b) => b.num - a.num)
  let visited = nums.map(_ => false)

  let count = 0
  let visitedCount = 0
  console.log(nums, smallest, visited, visitedCount)

  while (visitedCount < visited.length) {
    // Stop it from looping forever

    // if (count > 150) return count

    console.log(nums, smallest, visited, visitedCount)

    if (visitedCount === visited.length - 1) {
      visitedCount++
      count++
      continue
    }

    if (smallest[0].index < smallest[1].index) {
      let countBetween = 0
      for (let i = smallest[0].index; i <= smallest[1].index; i++) {
        console.log(2)
        if (!visited[i]) countBetween++
      }
      count += countBetween
      visitedCount++
      visited[smallest[0].index] = true
      smallest.shift()
    } else {
      let countBetween = 0
      for (let i = smallest[0].index; i < visited.length; i++) {
        console.log(3)
        if (!visited[i]) countBetween++
      }
      for (let i = 0; i <= smallest[1].index; i++) {
        console.log(4)
        if (!visited[i]) countBetween++
      }
      count += countBetween
      visitedCount++
      visited[smallest[0].index] = true
      smallest.shift()
    }
  }
  return count
}
