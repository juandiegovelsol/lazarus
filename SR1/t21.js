class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return -1;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
  }
}

class MultilevelLRUCache {
  constructor(l1Capacity, l2Capacity) {
    this.l1Cache = new LRUCache(l1Capacity);
    this.l2Cache = new LRUCache(l2Capacity);
  }

  get(key) {
    let value = this.l1Cache.get(key);
    if (value !== -1) {
      return value;
    }
    value = this.l2Cache.get(key);
    if (value !== -1) {
      this.l1Cache.put(key, value);
    }
    return value;
  }

  put(key, value) {
    this.l1Cache.put(key, value);
    this.l2Cache.put(key, value);
  }
}

// Test code
const cache = new MultilevelLRUCache(3, 5);
cache.put(1, 10);
cache.put(2, 20);
cache.put(3, 30.222);
cache.put(4, 40);
cache.put(5, 50);
cache.put(6, 60);
cache.put(7, 70);

console.log(cache.get(1)); // Output: 10
console.log(cache.get(2)); // Output: 40
console.log(cache.get(3)); // Output: -1
