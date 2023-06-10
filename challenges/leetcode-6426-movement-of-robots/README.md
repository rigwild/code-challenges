# leetcode-6426-movement-of-robots

https://leetcode.com/problems/movement-of-robots

**Type:** Classic

## Run Code Result

### Your input

<!-- prettier-ignore -->
```js
[-2,0,2]
"RLL"
3
[1,0]
"RL"
2
```

### Your stdout

<!-- prettier-ignore -->
```js
#######
#######
#######
[
  { index: 0, pos: -2, dir: 1 },
  { index: 1, pos: 0, dir: -1 },
  { index: 2, pos: 2, dir: -1 }
]
TIME 0
posWithRobots.length 1
posWithRobots.length 2
posWithRobots.length 1
posWithRobots { '1': [ 2 ], '-1': [ 0, 1 ] }
posWithMultipleRobots Set(1) { -1 }
[
  { index: 0, pos: -1, dir: -1 },
  { index: 1, pos: -1, dir: 1 },
  { index: 2, pos: 1, dir: -1 }
]
TIME 1
posWithRobots.length 1
posWithRobots.length 1
posWithRobots.length 2
posWithRobots { '0': [ 1, 2 ], '-2': [ 0 ] }
posWithMultipleRobots Set(1) { 0 }
[
  { index: 0, pos: -2, dir: -1 },
  { index: 1, pos: 0, dir: -1 },
  { index: 2, pos: 0, dir: 1 }
]
TIME 2
posWithRobots.length 1
posWithRobots.length 1
posWithRobots.length 1
posWithRobots { '1': [ 2 ], '-3': [ 0 ], '-1': [ 1 ] }
posWithMultipleRobots Set(0) {}
[
  { index: 0, pos: -3, dir: -1 },
  { index: 1, pos: -1, dir: -1 },
  { index: 2, pos: 1, dir: 1 }
]
distance -3 -1 2
distance -3 1 4
distance -1 1 2
#######
#######
#######
[ { index: 0, pos: 1, dir: 1 }, { index: 1, pos: 0, dir: -1 } ]
TIME 0
posWithRobots.length 1
posWithRobots.length 1
posWithRobots { '2': [ 0 ], '-1': [ 1 ] }
posWithMultipleRobots Set(0) {}
[ { index: 0, pos: 2, dir: 1 }, { index: 1, pos: -1, dir: -1 } ]
TIME 1
posWithRobots.length 1
posWithRobots.length 1
posWithRobots { '3': [ 0 ], '-2': [ 1 ] }
posWithMultipleRobots Set(0) {}
[ { index: 0, pos: 3, dir: 1 }, { index: 1, pos: -2, dir: -1 } ]
distance 3 -2 5
```

### Your answer

**Time Limit Exceeded when submitting.**

<!-- prettier-ignore -->
```js
8
5
```
