# leetcode-100289-minimum-substring-partition-of-equal-character-frequency

https://leetcode.com/problems/minimum-substring-partition-of-equal-character-frequency

**Type:** Classic

## Run Code Result

### Your input

<!-- prettier-ignore -->
```js
"abababaccddb"
```

### Your stdout

<!-- prettier-ignore -->
```js
abababaccddb
[
   ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'c', 'c', 'd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'c', 'c', 'd', 'db'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'c', 'c', 'dd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'c', 'c', 'ddb'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'c', 'cd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'c', 'cd', 'db'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'c', 'cdd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'c', 'cddb'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'cc', 'd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'cc', 'd', 'db'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'cc', 'dd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'cc', 'ddb'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'ccd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'ccd', 'db'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'ccdd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'ccddb'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'ac', 'c', 'd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'ac', 'c', 'd', 'db'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'ac', 'c', 'dd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'ac', 'c', 'ddb'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'ac', 'cd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'ac', 'cd', 'db'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'ac', 'cdd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'ac', 'cddb'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'acc', 'd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'acc', 'd', 'db'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'acc', 'dd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'acc', 'ddb'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'accd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'accd', 'db'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'accdd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'b', 'accddb'],
  ['a', 'b', 'a', 'b', 'a', 'ba', 'c', 'c', 'd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'ba', 'c', 'c', 'd', 'db'],
  ['a', 'b', 'a', 'b', 'a', 'ba', 'c', 'c', 'dd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'ba', 'c', 'c', 'ddb'],
  ['a', 'b', 'a', 'b', 'a', 'ba', 'c', 'cd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'ba', 'c', 'cd', 'db'],
  ['a', 'b', 'a', 'b', 'a', 'ba', 'c', 'cdd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'ba', 'c', 'cddb'],
  ['a', 'b', 'a', 'b', 'a', 'ba', 'cc', 'd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'ba', 'cc', 'd', 'db'],
  ['a', 'b', 'a', 'b', 'a', 'ba', 'cc', 'dd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'ba', 'cc', 'ddb'],
  ['a', 'b', 'a', 'b', 'a', 'ba', 'ccd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'ba', 'ccd', 'db'],
  ['a', 'b', 'a', 'b', 'a', 'ba', 'ccdd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'ba', 'ccddb'],
  ['a', 'b', 'a', 'b', 'a', 'bac', 'c', 'd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'bac', 'c', 'd', 'db'],
  ['a', 'b', 'a', 'b', 'a', 'bac', 'c', 'dd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'bac', 'c', 'ddb'],
  ['a', 'b', 'a', 'b', 'a', 'bac', 'cd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'bac', 'cd', 'db'],
  ['a', 'b', 'a', 'b', 'a', 'bac', 'cdd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'bac', 'cddb'],
  ['a', 'b', 'a', 'b', 'a', 'bacc', 'd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'bacc', 'd', 'db'],
  ['a', 'b', 'a', 'b', 'a', 'bacc', 'dd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'bacc', 'ddb'],
  ['a', 'b', 'a', 'b', 'a', 'baccd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'baccd', 'db'],
  ['a', 'b', 'a', 'b', 'a', 'baccdd', 'b'],
  ['a', 'b', 'a', 'b', 'a', 'baccddb'],
  ['a', 'b', 'a', 'b', 'ab', 'a', 'c', 'c', 'd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'ab', 'a', 'c', 'c', 'd', 'db'],
  ['a', 'b', 'a', 'b', 'ab', 'a', 'c', 'c', 'dd', 'b'],
  ['a', 'b', 'a', 'b', 'ab', 'a', 'c', 'c', 'ddb'],
  ['a', 'b', 'a', 'b', 'ab', 'a', 'c', 'cd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'ab', 'a', 'c', 'cd', 'db'],
  ['a', 'b', 'a', 'b', 'ab', 'a', 'c', 'cdd', 'b'],
  ['a', 'b', 'a', 'b', 'ab', 'a', 'c', 'cddb'],
  ['a', 'b', 'a', 'b', 'ab', 'a', 'cc', 'd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'ab', 'a', 'cc', 'd', 'db'],
  ['a', 'b', 'a', 'b', 'ab', 'a', 'cc', 'dd', 'b'],
  ['a', 'b', 'a', 'b', 'ab', 'a', 'cc', 'ddb'],
  ['a', 'b', 'a', 'b', 'ab', 'a', 'ccd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'ab', 'a', 'ccd', 'db'],
  ['a', 'b', 'a', 'b', 'ab', 'a', 'ccdd', 'b'],
  ['a', 'b', 'a', 'b', 'ab', 'a', 'ccddb'],
  ['a', 'b', 'a', 'b', 'ab', 'ac', 'c', 'd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'ab', 'ac', 'c', 'd', 'db'],
  ['a', 'b', 'a', 'b', 'ab', 'ac', 'c', 'dd', 'b'],
  ['a', 'b', 'a', 'b', 'ab', 'ac', 'c', 'ddb'],
  ['a', 'b', 'a', 'b', 'ab', 'ac', 'cd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'ab', 'ac', 'cd', 'db'],
  ['a', 'b', 'a', 'b', 'ab', 'ac', 'cdd', 'b'],
  ['a', 'b', 'a', 'b', 'ab', 'ac', 'cddb'],
  ['a', 'b', 'a', 'b', 'ab', 'acc', 'd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'ab', 'acc', 'd', 'db'],
  ['a', 'b', 'a', 'b', 'ab', 'acc', 'dd', 'b'],
  ['a', 'b', 'a', 'b', 'ab', 'acc', 'ddb'],
  ['a', 'b', 'a', 'b', 'ab', 'accd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'ab', 'accd', 'db'],
  ['a', 'b', 'a', 'b', 'ab', 'accdd', 'b'],
  ['a', 'b', 'a', 'b', 'ab', 'accddb'],
  ['a', 'b', 'a', 'b', 'aba', 'c', 'c', 'd', 'd', 'b'],
  ['a', 'b', 'a', 'b', 'aba', 'c', 'c', 'd', 'db'],
  ['a', 'b', 'a', 'b', 'aba', 'c', 'c', 'dd', 'b'],
  ['a', 'b', 'a', 'b', 'aba', 'c', 'c', 'ddb'],
  ... 1948 more items
]
```

### Your answer

Time Limit Exceeded on submit!

<!-- prettier-ignore -->
```js
2
```
