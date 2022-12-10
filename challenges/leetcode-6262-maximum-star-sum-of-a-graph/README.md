# leetcode-6262-maximum-star-sum-of-a-graph

https://leetcode.com/problems/maximum-star-sum-of-a-graph

**Type:** Classic

## Run Code Result

### Your input

<!-- prettier-ignore -->
```js
[1,2,3,4,10,-10,-20]
[[0,1],[1,2],[1,3],[3,4],[3,5],[3,6]]
2
```

### Your stdout

<!-- prettier-ignore -->
```js
##########
----
{ val: 1, neighbours: Set(1) { 1 } }
[ 2 ]
kMax 2 i 0
3
maxSumLocal 3
maxSum 3
----
{ val: 2, neighbours: Set(3) { 0, 2, 3 } }
[ 4, 3, 1 ]
kMax 2 i 0
6
maxSumLocal 6
kMax 2 i 1
9
maxSumLocal 9
maxSum 9
----
{ val: 3, neighbours: Set(1) { 1 } }
[ 2 ]
kMax 2 i 0
5
maxSumLocal 5
maxSum 9
----
{ val: 4, neighbours: Set(4) { 1, 4, 5, 6 } }
[ 10, 2, -10, -20 ]
kMax 2 i 0
14
maxSumLocal 14
kMax 2 i 1
16
maxSumLocal 16
maxSum 16
----
{ val: 10, neighbours: Set(1) { 3 } }
[ 4 ]
kMax 2 i 0
14
maxSumLocal 14
maxSum 16
----
{ val: -10, neighbours: Set(1) { 3 } }
[ 4 ]
kMax 2 i 0
-6
maxSumLocal -6
maxSum 16
----
{ val: -20, neighbours: Set(1) { 3 } }
[ 4 ]
kMax 2 i 0
-16
maxSumLocal -16
maxSum 16
{
  '0': { val: 1, neighbours: Set(1) { 1 } },
  '1': { val: 2, neighbours: Set(3) { 0, 2, 3 } },
  '2': { val: 3, neighbours: Set(1) { 1 } },
  '3': { val: 4, neighbours: Set(4) { 1, 4, 5, 6 } },
  '4': { val: 10, neighbours: Set(1) { 3 } },
  '5': { val: -10, neighbours: Set(1) { 3 } },
  '6': { val: -20, neighbours: Set(1) { 3 } }
}
```

### Your answer

<!-- prettier-ignore -->
```js
16
```
