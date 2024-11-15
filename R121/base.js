class LRUCache {
  // LRU Cache to store a given capacity of data
  #capacity;

  /**
   * @param {number} capacity - the capacity of LRUCache
   * @returns {LRUCache} - sealed
   */
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity < 0) {
      throw new TypeError("Invalid capacity");
    }

    this.#capacity = ~~capacity;
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

  /**
   * delete oldest key existing in map by the help of iterator
   */
  #removeLeastRecentlyUsed() {
    this.cache.delete(this.cache.keys().next().value);
  }

  /**
   * @param {string} key
   * @returns {*}
   */
  has(key) {
    key = String(key);

    return this.cache.has(key);
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    key = String(key);
    // Sets the value for the input key and if the key exists it updates the existing key
    if (this.size === this.capacity) {
      console.log("Deleted");
      this.#removeLeastRecentlyUsed();
    }

    this.cache.set(key, value);
  }

  /**
   * @param {string} key
   * @returns {*}
   */
  get(key) {
    key = String(key);
    // Returns the value for the input key. Returns null if key is not present in cache
    if (this.cache.has(key)) {
      const value = this.cache.get(key);

      // refresh the cache to update the order of key
      this.cache.delete(key);
      this.cache.set(key, value);

      this.hits++;
      return value;
    }

    this.misses++;
    return null;
  }

  /**
   * @param {JSON} json
   * @returns {LRUCache}
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
   * @param {number} indent
   * @returns {JSON} - string
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

const cache = new LRUCache(3);
console.log(cache.info); // { misses: 0, hits: 0, capacity: 3, size: 0 }

cache.get("misses"); // null
console.log(cache.info.misses); // 1

cache.set("a", 1); // Agrega "a":1
cache.set("b", 2); // Agrega "b":2
cache.set("c", 3); // Agrega "c":3

console.log(cache.size); // 3

cache.set("d", 4); // Agrega "d":4 y elimina "a"

console.log(cache.get("a")); // null

console.log(cache.get("b")); // 2
console.log(cache.cache);

cache.set("b", 20); // Actualiza "b" a 20
cache.set("b", 21); // Actualiza "b" a 20
console.log(cache.get("b")); // 20
console.log(cache, cache.cache);
/*
cache.capacity = 2;
console.log(cache.size); // 2
console.log(cache.get("c")); // null, ya que "c" se eliminó
console.log(cache.get("d")); // 4, sigue en la caché */

/* const json = cache.toString(2);
const restoredCache = new LRUCache(3).parse(json);
console.log(restoredCache.info); // Mismos `hits`, `misses`, `capacity` y `size` que el cache original

try {
  new LRUCache(-1);
} catch (error) {
  console.log(error.message); // "Invalid capacity"
}

cache.get("b"); // Presente en cache, hits += 1
cache.get("nonexistent"); // Ausente en cache, misses += 1
console.log(cache.info.hits); // Debe ser 1
console.log(cache.info.misses); // Debe ser 1 */
