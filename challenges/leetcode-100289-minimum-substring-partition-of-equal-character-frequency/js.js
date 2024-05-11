// @ts-check

// Bruteforce
// Time Limit Exceeded

/**
 * @param {string} s
 * @return {number}
 */
var minimumSubstringsInPartition = function (s) {
  const partitions = minimumSubstringsInPartition2(s, 0, [], [])
  console.log(s)
  console.log(partitions)

  let minPartitionsCount = s.length
  for (let i = partitions.length - 1; i >= 0; i--) {
    if (partitions[i].every(groupInPartition => isBalancedStr(groupInPartition)) && partitions[i].length < minPartitionsCount) {
      // console.log(partitions[i])
      minPartitionsCount = partitions[i].length
    }
  }
  return minPartitionsCount
}

/**
 * @param {string} s
 * @param {number} start
 * @param {string[]} currentPartition
 * @param {string[][]} partitions
 * @return {string[][]}
 */
var minimumSubstringsInPartition2 = function (s, start, currentPartition, partitions) {
  if (start === s.length) {
    partitions.push([...currentPartition])
  }

  for (let end = start + 1; end <= s.length; end++) {
    currentPartition.push(s.slice(start, end))
    minimumSubstringsInPartition2(s, end, currentPartition, partitions)
    currentPartition.pop()
  }
  return partitions
}

function isBalancedStr(str) {
  const freqs = {}
  for (const letter of str) {
    if (!freqs[letter]) freqs[letter] = 0
    freqs[letter]++
  }

  const keys = Object.keys(freqs)
  if (keys.length <= 1) return true

  for (let i = 0; i < keys.length - 1; i++) {
    if (freqs[keys[i]] !== freqs[keys[i + 1]]) return false
  }
  return true
}
