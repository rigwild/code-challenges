# leetcode-6288-find-consecutive-integers-from-a-data-stream

https://leetcode.com/problems/find-consecutive-integers-from-a-data-stream

**Type:** Classic

## Run Code Result

### Your input

<!-- prettier-ignore -->
```js
["DataStream","consec","consec","consec","consec"]
[[4,3],[4],[4],[4],[3]]
```

### Your stdout

<!-- prettier-ignore -->
```js
NULL init
FALSE listLength < this.k this.listLength=1 this.k=3
FALSE listLength < this.k this.listLength=2 this.k=3
true true this.sameAsValueCount === this.listLength this.sameAsValueCount=3 this.listLength=3
false false this.sameAsValueCount === this.listLength this.sameAsValueCount=2 this.listLength=3
```

### Your answer

<!-- prettier-ignore -->
```js
[null,false,false,true,false]
```
