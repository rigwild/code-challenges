// console.log = () => {}

class MyNode {
  next?: MyNode

  constructor(public value: number) {}
}

class DataStream {
  sameAsValueCount: number
  listLength: number

  // @ts-ignore
  firstNode: MyNode
  // @ts-ignore
  lastNode: MyNode

  constructor(public value: number, public k: number) {
    this.value = value
    this.k = k
    this.sameAsValueCount = 0
    this.listLength = 0
    console.log('NULL init')
  }

  consec(num: number): boolean {
    const newNode = new MyNode(num)
    if (!this.lastNode) {
      // FIRST INIT
      this.lastNode = new MyNode(num)
      this.firstNode = this.lastNode
      this.listLength = 1
    } else {
      this.lastNode.next = newNode
      this.lastNode = newNode
      this.listLength++
    }
    if (num === this.value) this.sameAsValueCount++

    if (this.listLength < this.k) {
      console.log('FALSE listLength < this.k', `this.listLength=${this.listLength}`, `this.k=${this.k}`)
      return false
    } else if (this.listLength > this.k) {
      const oldFirstNode = this.firstNode
      this.firstNode = oldFirstNode.next!
      this.listLength--
      if (oldFirstNode.value === this.value) this.sameAsValueCount--
    }

    // Check if conseq
    console.log(
      this.sameAsValueCount === this.listLength,
      this.sameAsValueCount === this.k,
      'this.sameAsValueCount === this.listLength',
      `this.sameAsValueCount=${this.sameAsValueCount}`,
      `this.listLength=${this.listLength}`
    )
    return this.sameAsValueCount === this.listLength && this.sameAsValueCount === this.k
  }
}

/**
 * Your DataStream object will be instantiated and called as such:
 * var obj = new DataStream(value, k)
 * var param_1 = obj.consec(num)
 */
