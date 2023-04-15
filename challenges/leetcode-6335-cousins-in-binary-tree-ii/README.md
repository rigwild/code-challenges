# leetcode-6335-cousins-in-binary-tree-ii

https://leetcode.com/problems/cousins-in-binary-tree-ii

**Type:** Classic

## Run Code Result

### Your input

<!-- prettier-ignore -->
```js
[5,4,9,1,10,null,7]
[3,1,2]
```

### Your stdout

<!-- prettier-ignore -->
```js
DURING1 {}
DURING2 {}
DURING1 { '1': [ [ 4, 9 ] ] }
DURING2 {}
DURING1 { '1': [ [ 4, 9 ] ], '2': [ [ 1, 10 ] ] }
DURING2 {}
DURING1 { '1': [ [ 4, 9 ] ], '2': [ [ 1, 10 ] ], '3': [ [ 0, 0 ] ] }
DURING2 {}
DURING1 { '1': [ [ 4, 9 ] ], '2': [ [ 1, 10 ] ], '3': [ [ 0, 0 ], [ 0, 0 ] ] }
DURING2 {}
DURING1 {
  '1': [ [ 4, 9 ] ],
  '2': [ [ 1, 10 ], [ 0, 7 ] ],
  '3': [ [ 0, 0 ], [ 0, 0 ] ]
}
DURING2 {}
[5,4,9,1,10,null,7]
valsByDepthBySibling BEFORE {
  '1': [ [ 4, 9 ] ],
  '2': [ [ 1, 10 ], [ 0, 7 ] ],
  '3': [ [ 0, 0 ], [ 0, 0 ], [ 0, 0 ] ]
}
sumsByDepthBySibling BEFORE {}
{ v: 2 }
sumsByDepthBySibling AFTER { '0': 0, '1': 13, '2': 18 }
WTF { '0': 0, '1': 13, '2': 18 }
WTF { '0': 0, '1': 13, '2': 18 }
WTF { '0': 0, '1': 13, '2': 18 }
WTF { '0': 0, '1': 13, '2': 18 }
WTF { '0': 0, '1': 13, '2': 18 }
WTF { '0': 0, '1': 13, '2': 18 }
[0,0,0,7,7,null,11]
----------------
DURING1 {}
DURING2 {}
DURING1 { '1': [ [ 1, 2 ] ] }
DURING2 {}
DURING1 { '1': [ [ 1, 2 ] ], '2': [ [ 0, 0 ] ] }
DURING2 {}
[3,1,2]
valsByDepthBySibling BEFORE { '1': [ [ 1, 2 ] ], '2': [ [ 0, 0 ], [ 0, 0 ] ] }
sumsByDepthBySibling BEFORE {}
{ v: 1 }
sumsByDepthBySibling AFTER { '0': 0, '1': 3 }
WTF { '0': 0, '1': 3 }
WTF { '0': 0, '1': 3 }
WTF { '0': 0, '1': 3 }
[0,0,0]
----------------
```

### Your answer

<!-- prettier-ignore -->
```js
[0,0,0,7,7,null,11]
[0,0,0]
```
