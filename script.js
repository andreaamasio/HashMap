class Node {
  constructor(key, value, next = null) {
    this.key = key
    this.value = value
    this.next = next
  }
}

class HashMap {
  constructor(loadFactor, capacity) {
    this.loadFactor = loadFactor
    this.capacity = capacity
    this.length = 0
    this.buckets = new Array(this.capacity)
  }

  hash(key) {
    let hashCode = 0

    const primeNumber = 31
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity
    }

    return hashCode
  }
  set(key, value) {
    let bucketNum = this.hash(key)

    if (this.buckets[bucketNum] === undefined) {
      let node = new Node(key, value)
      this.buckets[bucketNum] = node
      this.buckets[bucketNum].head = node
    } else {
      let current = this.buckets[bucketNum].head
      while (current.next) {
        current = current.next
      }
      current.next = new Node(key, value)
    }
    this.length++
    this.checkCapacity()
  }
  checkCapacity() {
    let maxEntriesNumber = this.loadFactor * this.capacity
    if (this.length > maxEntriesNumber) {
      growHashMap()
    }
  }
  growHashMap() {
    return
  }
  get(key) {}
}

const fruitMap = new HashMap(0.75, 16)
fruitMap.set("banana", 100)
fruitMap.set("banana", 200)
console.log(fruitMap.buckets[5])
//console.log(fruitMap.buckets[5])
//console.log(fruitMap.buckets)
