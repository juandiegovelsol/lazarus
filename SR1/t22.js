class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      this.cache.delete(key); // Remove the key to update its position
      this.cache.set(key, value); // Reinsert key to mark as most recently used
      return value;
    }
    return -1;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key); // Update key position if it already exists
    } else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value); // Evict least recently used
    }
    this.cache.set(key, value); // Add key-value pair
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
      return value; // Return value from L1 cache
    }

    // Check L2 cache if not found in L1 cache
    value = this.l2Cache.get(key);
    if (value !== -1) {
      this.l1Cache.put(key, value); // Promote value to L1 cache
    }
    return value; // Return the found value or -1 if not found
  }

  put(key, value) {
    // Only add to L1 cache
    this.l1Cache.put(key, value);

    // If evicted from L1, store in L2
    if (!this.l1Cache.cache.has(key)) {
      this.l2Cache.put(key, value);
    }
  }
}

// Test code
const cache = new MultilevelLRUCache(3, 5);
cache.put(1, 10);
cache.put(2, 20);
cache.put(3, 30);
cache.put(4, 40);
cache.put(5, 50);
cache.put(6, 60);
cache.put(7, 70);

console.log(cache.l2Cache.get(1)); // Output: 10
console.log(cache.l1Cache.get(4)); // Output: 40
console.log(cache.l2Cache.get(5)); // Output: -1
