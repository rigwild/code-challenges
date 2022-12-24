/**
 * @param {string[]} positive_feedback
 * @param {string[]} negative_feedback
 * @param {string[]} report
 * @param {number[]} student_id
 * @param {number} k
 * @return {number[]}
 */
var topStudents = function (positive_feedback, negative_feedback, reports, student_id, k) {
  const scores = []

  const tree = {}

  const fn = (arr, score) =>
    arr.forEach(word => {
      let traverse = tree
      for (let i = 0; i < word.length; i++) {
        const isLastLetter = i === word.length - 1
        const letter = word.charAt(i)
        if (!traverse[letter]) traverse[letter] = {}
        if (isLastLetter) traverse[letter].score = score
        traverse = traverse[letter]
      }
    })
  fn(positive_feedback, 3)
  fn(negative_feedback, -1)

  // console.log(JSON.stringify(tree, null, 2))

  reports.forEach((report, i) => {
    const words = report.split(' ')
    let score = 0
    words.forEach(word => {
      let traverse = tree
      for (let i = 0; i < word.length; i++) {
        const isLastLetter = i === word.length - 1
        const letter = word.charAt(i)
        if (isLastLetter && traverse?.[letter]?.score) score += traverse[letter].score
        if (traverse[letter]) traverse = traverse[letter]
        else break
      }
    })
    let id = student_id[i]
    scores.push({ score, id })
  })
  scores.sort((a, b) => {
    const byScore = b.score - a.score
    if (byScore === 0) return a.id - b.id
    return byScore
  })
  console.log(scores)
  const res = []
  for (let i = 0; i < k; i++) {
    res.push(scores[i].id)
  }
  return res
}
