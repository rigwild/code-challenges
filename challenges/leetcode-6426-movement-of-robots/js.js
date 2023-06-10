// **Time Limit Exceeded when submitting.**

Number.prototype.mod = function (n) {
  'use strict'
  return ((this % n) + n) % n
}

// console.log = () => {}

/**
 * @param {number[]} nums
 * @param {string} s
 * @param {number} d
 * @return {number}
 */
var sumDistance = function (nums, s, d) {
  const robots = nums.map((x, i) => ({ index: i, pos: x, dir: s[i] === 'L' ? -1 : 1 }))
  console.log(robots)

  for (let t = 0; t < d; t++) {
    console.log('TIME', t)
    const posWithRobots = {}
    const posWithMultipleRobots = new Set()

    for (const robot of robots) {
      robot.pos += robot.dir

      if (!posWithRobots[robot.pos]) posWithRobots[robot.pos] = []
      posWithRobots[robot.pos].push(robot.index)
      console.log('posWithRobots.length', posWithRobots[robot.pos].length)
      if (posWithRobots[robot.pos].length >= 2) posWithMultipleRobots.add(robot.pos)
    }

    console.log('posWithRobots', posWithRobots)
    console.log('posWithMultipleRobots', posWithMultipleRobots)
    posWithMultipleRobots.forEach(pos => {
      posWithRobots[pos].forEach(robotIndex => {
        robots[robotIndex].dir *= -1
      })
    })
    console.log(robots)
  }

  let length = 0
  for (let i = 0; i < robots.length; i++) {
    for (let j = i + 1; j < robots.length; j++) {
      console.log('distance', robots[i].pos, robots[j].pos, Math.abs(robots[i].pos - robots[j].pos))
      length += Math.abs(robots[i].pos - robots[j].pos)
    }
  }
  console.log(length)
  console.log(length % (10 ** 9 + 7))

  return length.mod(10 ** 9 + 7)
}
