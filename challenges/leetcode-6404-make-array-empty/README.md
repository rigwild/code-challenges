# leetcode-6404-make-array-empty

https://leetcode.com/problems/make-array-empty

**Type:** Classic

## Run Code Result

### Your input

<!-- prettier-ignore -->
```js
[3,4,-1]
[1,2,4,3]
[1,2,3]
```

### Your stdout

<!-- prettier-ignore -->
```js
{ '3': 1, '4': 1, '-1': 1 } [ 4, 3, -1 ]
[ 3, 4, -1 ] { '3': 1, '4': 1, '-1': 1 } [ 4, 3, -1 ]
[ 4, -1, 3 ] { '3': 1, '4': 1, '-1': 1 } [ 4, 3, -1 ]
[ -1, 3, 4 ] { '3': 1, '4': 1, '-1': 1 } [ 4, 3, -1 ]
[ 3, 4 ] { '3': 1, '4': 1 } [ 4, 3 ]
[ 4 ] { '4': 1 } [ 4 ]
{ '1': 1, '2': 1, '3': 1, '4': 1 } [ 4, 3, 2, 1 ]
[ 1, 2, 4, 3 ] { '1': 1, '2': 1, '3': 1, '4': 1 } [ 4, 3, 2, 1 ]
[ 2, 4, 3 ] { '2': 1, '3': 1, '4': 1 } [ 4, 3, 2 ]
[ 4, 3 ] { '3': 1, '4': 1 } [ 4, 3 ]
[ 3, 4 ] { '3': 1, '4': 1 } [ 4, 3 ]
[ 4 ] { '4': 1 } [ 4 ]
{ '1': 1, '2': 1, '3': 1 } [ 3, 2, 1 ]
[ 1, 2, 3 ] { '1': 1, '2': 1, '3': 1 } [ 3, 2, 1 ]
[ 2, 3 ] { '2': 1, '3': 1 } [ 3, 2 ]
[ 3 ] { '3': 1 } [ 3 ]
```

### Your answer

Correct but **Time Limit Exceeded**

<!-- prettier-ignore -->
```js
5
5
3
```
