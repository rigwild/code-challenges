/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
var findThePrefixCommonArray = function (A, B) {
  const res = []
  for (let i = 0; i < A.length; i++) {
    let commonCount = 0
    const letters = new Set()
    const freqA = {}
    const freqB = {}
    for (let j = 0; j <= i; j++) {
      letters.add(A[j])
      letters.add(B[j])
      if (!freqA[A[j]]) freqA[A[j]] = 0
      freqA[A[j]]++

      if (!freqB[B[j]]) freqB[B[j]] = 0
      freqB[B[j]]++
    }
    letters.forEach(letter => {
      if (freqA[letter] && freqB[letter]) commonCount += Math.min(freqA[letter], freqB[letter])
    })
    res.push(commonCount)
  }
  return res
}
