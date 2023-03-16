/**
 * @param {number} protonsStart The initial number of protons
 * @param {number} neutronsStart The initial number of neutrons
 * @param {number} protonsTarget The desired number of protons
 * @param {number} neutronsTarget The desired number of neutrons
 * @return {string[]}
 */
function solve(protonsStart, neutronsStart, protonsTarget, neutronsTarget) {
  // Write your code here

  let actions = []
  while (protonsStart !== protonsTarget || neutronsStart !== neutronsTarget) {
    console.error(protonsStart, neutronsStart)
    if (protonsStart < protonsTarget) {
      actions.push('PROTON')
      protonsStart++
    } else if (neutronsStart < neutronsTarget) {
      actions.push('NEUTRON')
      neutronsStart++
    } else {
      actions.push('ALPHA')
      protonsStart -= 2
      neutronsStart -= 2
    }
    // if (actions.length > 20) break
  }

  return actions
}

/* Ignore and do not change the code below */

/**
 * Try a solution
 */
function trySolution(recipe) {
  console.log('' + JSON.stringify(recipe))
}
trySolution(solve(JSON.parse(readline()), JSON.parse(readline()), JSON.parse(readline()), JSON.parse(readline())))

/* Ignore and do not change the code above */
