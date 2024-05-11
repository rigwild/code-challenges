// @ts-check

/**
 * @param {number[][]} points
 * @param {string} s
 * @return {number}
 */
var maxPointsInsideSquare = function (points, s) {
  const pointsBySquareSize = points
    .map(([x, y]) => Math.max(Math.abs(x), Math.abs(y)))
    .map((distance, i) => ({ distance, tag: s[i] }))
    .sort((a, b) => a.distance - b.distance)
    .reduce((acc, cur) => {
      if (!acc[cur.distance]) acc[cur.distance] = []

      acc[cur.distance].push(cur.tag)
      return acc
    }, {})

  const seenTags = new Set()
  let pointsInSquare = 0
  console.log('-----')
  console.log(pointsBySquareSize)
  for (const pointsAtSquareSize of Object.values(pointsBySquareSize)) {
    console.log(pointsInSquare)
    let addPointsToCount = true

    // Check if contains duplicates
    for (const point of pointsAtSquareSize) {
      if (seenTags.has(point)) {
        addPointsToCount = false
        break
      } else {
        seenTags.add(point)
      }
    }

    if (addPointsToCount) {
      pointsInSquare += pointsAtSquareSize.length
    } else {
      break
    }
  }

  return pointsInSquare
}
