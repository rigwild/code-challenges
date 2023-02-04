function maxCount(banned, n, maxSum) {
  let bannedSet = new Set(banned)
  let count = 0
  let sum = 0
  for (let i = 1; i <= n; i++) {
    if (!bannedSet.has(i) && sum + i <= maxSum) {
      count++
      sum += i
    }
  }
  return count
}
