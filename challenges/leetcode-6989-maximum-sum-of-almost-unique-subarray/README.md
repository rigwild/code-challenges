# leetcode-6989-maximum-sum-of-almost-unique-subarray

https://leetcode.com/problems/maximum-sum-of-almost-unique-subarray

**Type:** Classic

## Run Code Result

### Your input

<!-- prettier-ignore -->
```js
[2,6,7,3,1,7]
3
4
[5,9,9,2,4,5,4]
1
3
[9,9,2,5,4,5,4]
1
3
[1,2,1,2,1,2,1]
3
3
[1,1,1,3]
2
2
```

### Your stdout

When logging is uncommented - if you log them you will exceed the time limit here

<!-- prettier-ignore -->
```js
###########
0 maxSum=18 map={"2":1,"3":1,"6":1,"7":1} distinctCount=4 sum=18 m=3 k=4
1 maxSum=18 map={"1":1,"3":1,"6":1,"7":1} distinctCount=4 sum=17 m=3 k=4 left=2 right=1
2 maxSum=18 map={"1":1,"3":1,"7":2} distinctCount=3 sum=18 m=3 k=4 left=6 right=7
###########
0 maxSum=23 map={"5":1,"9":2} distinctCount=2 sum=23 m=1 k=3
1 maxSum=23 map={"2":1,"9":2} distinctCount=2 sum=20 m=1 k=3 left=5 right=2
2 maxSum=23 map={"2":1,"4":1,"9":1} distinctCount=3 sum=15 m=1 k=3 left=9 right=4
3 maxSum=23 map={"2":1,"4":1,"5":1} distinctCount=3 sum=11 m=1 k=3 left=9 right=5
4 maxSum=23 map={"4":2,"5":1} distinctCount=2 sum=13 m=1 k=3 left=2 right=4
###########
0 maxSum=20 map={"2":1,"9":2} distinctCount=2 sum=20 m=1 k=3
1 maxSum=20 map={"2":1,"5":1,"9":1} distinctCount=3 sum=16 m=1 k=3 left=9 right=5
2 maxSum=20 map={"2":1,"4":1,"5":1} distinctCount=3 sum=11 m=1 k=3 left=9 right=4
3 maxSum=20 map={"4":1,"5":2} distinctCount=2 sum=14 m=1 k=3 left=2 right=5
4 maxSum=20 map={"4":2,"5":1} distinctCount=2 sum=13 m=1 k=3 left=5 right=4
###########
0 maxSum=0 map={"1":2,"2":1} distinctCount=2 sum=4 m=3 k=3
1 maxSum=0 map={"1":1,"2":2} distinctCount=2 sum=5 m=3 k=3 left=1 right=2
2 maxSum=0 map={"1":2,"2":1} distinctCount=2 sum=4 m=3 k=3 left=2 right=1
3 maxSum=0 map={"1":1,"2":2} distinctCount=2 sum=5 m=3 k=3 left=1 right=2
4 maxSum=0 map={"1":2,"2":1} distinctCount=2 sum=4 m=3 k=3 left=2 right=1
###########
0 maxSum=0 map={"1":2} distinctCount=1 sum=2 m=2 k=2
1 maxSum=0 map={"1":2} distinctCount=1 sum=2 m=2 k=2 left=1 right=1
2 maxSum=4 map={"1":1,"3":1} distinctCount=2 sum=4 m=2 k=2 left=1 right=3
```

### Your answer

<!-- prettier-ignore -->
```js
18
23
20
0
4
```
