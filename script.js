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
        if ((current.key = key)) {
          current.value = value
          return
        }
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
  get(key) {
    let bucketNum = this.hash(key)
    if (this.buckets[bucketNum] === undefined) {
      return null
    } else {
      let current = this.buckets[bucketNum].head

      while (current.key != key) {
        if (current.next) {
          current = current.next
        } else return null
      }

      return current.value
    }
  }
  has(key) {
    if (this.get(key)) {
      return true
    } else return false
  }
  remove(key) {
    if (this.has(key)) {
      let bucketNum = this.hash(key)
      let current = this.buckets[bucketNum].head
      if (current.next === null) {
        this.buckets[bucketNum].head = null
        this.buckets[bucketNum] = null
      } else {
        while (current.next.key != key) {
          current = current.next
        }
        current.next = null
      }
      this.length--
      return true
    } else return false
  }
  clear() {
    this.buckets = new Array(this.capacity)
    this.length = 0
  }
  keys() {
    let array = []
    for (let bucket in this.buckets) {
      array.push(this.buckets[bucket].key)
      if (this.buckets[bucket].next != null) {
        let current = this.buckets[bucket].next
        while (current) {
          array.push(current.key)
          current = current.next
        }
      }
    }
    return array
  }
  values() {
    let array = []
    for (let bucket in this.buckets) {
      array.push(this.buckets[bucket].value)
      if (this.buckets[bucket].next != null) {
        let current = this.buckets[bucket].next
        while (current) {
          array.push(current.value)
          current = current.next
        }
      }
    }
    return array
  }
  entries() {
    let array = []
    for (let bucket in this.buckets) {
      array.push([this.buckets[bucket].key, this.buckets[bucket].value])
      if (this.buckets[bucket].next != null) {
        let current = this.buckets[bucket].next
        while (current) {
          array.push([current.key, current.value])
          current = current.next
        }
      }
    }
    return array
  }
}

const fruitMap = new HashMap(0.75, 16)

fruitMap.set("apple", "red")
fruitMap.set("banana", "yellow")
fruitMap.set("carrot", "orange")
fruitMap.set("dog", "brown")
fruitMap.set("elephant", "gray")
fruitMap.set("frog", "green")
fruitMap.set("grape", "purple")
fruitMap.set("hat", "black")
fruitMap.set("ice cream", "white")
fruitMap.set("jacket", "blue")
fruitMap.set("kite", "pink")
fruitMap.set("lion", "golden")

console.log(fruitMap.entries())
