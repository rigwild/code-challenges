// console.log = () => {}

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkStrings = function (s1, s2) {
  if (s1 === s2) return true

  s1 = s1.split('')
  s2 = s2.split('')

  // console.log('###########')
  // console.log('s1', s1)
  // console.log('s2', s2)

  // // for (let d = 0; d < s1.length; d++) {
  // for (let i = 0; i < s1.length; i++) {
  //   console.log(`    BEFORE i=${i}, s1=${s1}, s2=${s2}`)
  //   if (s1[i] === s2[i]) continue

  //   for (let j = i + 2; j < s1.length; j += 2) {
  //     console.log(`           j=${j}, s1=${s1}, s1[j]=${s1[j]}, s2[i]=${s2[i]}`)
  //     if (s1[j] === s2[i]) {
  //       const temp = s1[i]
  //       s1[i] = s1[j]
  //       s1[j] = temp
  //       break
  //     }
  //   }
  //   console.log(`    AFTER  i=${i}, s1=${s1}, s2=${s2}`)
  // }
  // // }

  // console.log('s1', s1)
  // console.log('s2', s2)
  // return s1.join('') === s2.join('')

  let s1_even = []
  let s2_even = []

  let s1_odd = []
  let s2_odd = []

  for (let i = 0; i < s1.length; i += 2) {
    s1_even.push(s1[i])
    s2_even.push(s2[i])

    if (i < s1.length - 1) {
      s1_odd.push(s1[i + 1])
      s2_odd.push(s2[i + 1])
    }
  }

  console.log(`s1_even=${s1_even}`)
  console.log(`s2_even=${s2_even}`)
  s1_even.sort()
  s2_even.sort()
  console.log(`sorted - s1_even=${s1_even}`)
  console.log(`sorted - s2_even=${s2_even}`)

  console.log(`s1_odd=${s1_odd}`)
  console.log(`s2_odd=${s2_odd}`)
  s1_odd.sort()
  s2_odd.sort()
  console.log(`sorted - s1_odd=${s1_odd}`)
  console.log(`sorted - s2_odd=${s2_odd}`)

  return s1_even.join('') === s2_even.join('') && s1_odd.join('') === s2_odd.join('')
}
