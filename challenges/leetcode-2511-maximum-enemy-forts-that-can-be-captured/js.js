/**
 * @param {number[]} forts
 * @return {number}
 */
var captureForts = function (forts) {
  let emptys = []
  let ours = []
  let enemys = []
  forts.forEach((x, i) => {
    if (x === -1) emptys.push(i)
    if (x === 0) enemys.push(i)
    if (x === 1) ours.push(i)
  })
  console.log(emptys)
  console.log(ours)
  console.log(enemys)

  let max = 0
  emptys.forEach(iEmpty => {
    for (const iOur of ours.values()) {
      let count = 0
      let canMove = true
      console.log(iEmpty, iOur)
      if (iOur < iEmpty) {
        for (let i = iOur + 1; i < iEmpty; i++) {
          if (forts[i] === 0) count++
          else {
            canMove = false
            break
          }
        }
      } else if (iOur > iEmpty) {
        for (let i = iOur - 1; i > iEmpty; i--) {
          if (forts[i] === 0) count++
          else {
            canMove = false
            break
          }
        }
      }
      if (!canMove) continue
      max = Math.max(max, count)
    }
  })
  return max
}
