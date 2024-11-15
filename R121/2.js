/**
 * A Least Recently Used (LRU) Cache implementation.
 */
class LRUCache {
  #capacity;

  /**
   * Creates a new LRU Cache instance with the given capacity.
   * @param {number} capacity - The maximum number of items the cache can hold.
   * @throws {TypeError} If the capacity is not a non-negative integer.
   */
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity < 0) {
      throw new TypeError("Invalid capacity");
    }

    this.#capacity = capacity;
    this.misses = 0;
    this.hits = 0;
    this.cache = new Map();

    return Object.seal(this);
  }

  get info() {
    return Object.freeze({
      misses: this.misses,
      hits: this.hits,
      capacity: this.capacity,
      size: this.size,
    });
  }

  get size() {
    return this.cache.size;
  }

  get capacity() {
    return this.#capacity;
  }

  set capacity(newCapacity) {
    if (newCapacity < 0) {
      throw new RangeError("Capacity should be greater than 0");
    }

    if (newCapacity < this.capacity) {
      let diff = this.capacity - newCapacity;

      while (diff--) {
        this.#removeLeastRecentlyUsed();
      }
    }

    this.#capacity = newCapacity;
  }

  #removeLeastRecentlyUsed() {
    // Use the keys() iterator to get the first key (least recently used)
    const leastRecentlyUsedKey = this.cache.keys().next().value;
    this.cache.delete(leastRecentlyUsedKey);
  }

  /**
   * Checks if the cache has the given key.
   * @param {string} key - The key to check.
   * @returns {boolean} True if the key exists in the cache, false otherwise.
   */
  has(key) {
    key = String(key);
    return this.cache.has(key);
  }

  /**
   * Sets the value for the given key in the cache.
   * If the key already exists, its value is updated.
   * If the cache is full, the least recently used item is removed.
   * @param {string} key - The key to set.
   * @param {*} value - The value to set.
   */
  set(key, value) {
    key = String(key);

    if (this.size === this.capacity) {
      this.#removeLeastRecentlyUsed();
    }

    this.cache.set(key, value);
  }

  /**
   * Gets the value for the given key from the cache.
   * If the key exists, its value is returned and the key is marked as recently used.
   * If the key does not exist, null is returned.
   * @param {string} key - The key to get.
   * @returns {*} The value associated with the key, or null if not found.
   */
  get(key) {
    key = String(key);

    if (this.cache.has(key)) {
      const value = this.cache.get(key);

      // Refresh the cache to update the order of the key
      this.cache.delete(key);
      this.cache.set(key, value);

      this.hits++;
      return value;
    }

    this.misses++;
    return null;
  }

  /**
   * Parses a JSON string and populates the cache with its data.
   * @param {string} json - The JSON string to parse.
   * @returns {LRUCache} The populated cache instance.
   */
  parse(json) {
    const { misses, hits, cache } = JSON.parse(json);

    this.misses += misses ?? 0;
    this.hits += hits ?? 0;

    for (const key in cache) {
      this.set(key, cache[key]);
    }

    return this;
  }

  /**
   * Converts the cache to a JSON string.
   * @param {number} [indent] - The indentation level for the JSON string.
   * @returns {string} The JSON string representation of the cache.
   */
  toString(indent) {
    const replacer = (_, value) => {
      if (value instanceof Set) {
        return [...value];
      }

      if (value instanceof Map) {
        return Object.fromEntries(value);
      }

      return value;
    };

    return JSON.stringify(this, replacer, indent);
  }
}

// Example usage:

const cache = new LRUCache(3); // Create a cache with capacity 3

cache.set("key1", "value1");
cache.set("key2", "value2");
cache.set("key3", "value3");

console.log(cache.get("key1")); // 'value1'
console.log(cache.get("key2")); // 'value2'

cache.set("key4", "value4"); // key3 is removed because it's the least recently used

console.log(cache.get("key3")); // null
console.log(cache.get("key4")); // 'value4'

console.log(cache.info);
// Output:
// {
//   misses: 1,
//   hits: 3,
//   capacity: 3,
//   size: 3
// }

const json = cache.toString();
console.log(json);
// Output:
// {"misses":1,"hits":3,"cache":{"key1":"value1","key2":"value2","key4":"value4"}}

const newCache = new LRUCache(3);
newCache.parse(json);

console.log(newCache.info);
// Output:
// {
//   misses: 1,
//   hits: 3,
//   capacity: 3,
//   size: 3
// }
