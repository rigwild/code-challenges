/**
 * @param {string} customers
 * @return {number}
 */
var bestClosingTime = function (customers) {
  let penalty = 0
  for (let i = 0; i < customers.length; i++) {
    if (customers.charAt(i) === 'Y') penalty++
  }
  console.log(penalty)

  let minPenalty = penalty
  let minPenaltyEarliestHour = 0

  console.log(0, penalty, '---', minPenalty, 0)
  for (let i = 1; i < customers.length + 1; i++) {
    if (customers.charAt(i - 1) === 'N') penalty++
    if (customers.charAt(i - 1) === 'Y') penalty--
    if (penalty < minPenalty) {
      minPenalty = penalty
      minPenaltyEarliestHour = i
    }
    console.log(i, penalty, '---', minPenalty, minPenaltyEarliestHour)
  }

  return minPenaltyEarliestHour
}
