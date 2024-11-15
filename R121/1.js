class LRUCache {
  #capacity;
  #cache;
  #misses;
  #hits;

  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity < 0) {
      throw new TypeError("Invalid capacity");
    }

    this.#capacity = capacity;
    this.#cache = new Map();
    this.#misses = 0;
    this.#hits = 0;
  }

  get info() {
    return {
      misses: this.#misses,
      hits: this.#hits,
      capacity: this.#capacity,
      size: this.#cache.size,
    };
  }

  get size() {
    return this.#cache.size;
  }

  get capacity() {
    return this.#capacity;
  }

  set capacity(newCapacity) {
    if (newCapacity < 0) {
      throw new RangeError("Capacity should be greater than 0");
    }

    if (newCapacity < this.#capacity) {
      let diff = this.#capacity - newCapacity;

      while (diff--) {
        this.#removeLeastRecentlyUsed();
      }
    }

    this.#capacity = newCapacity;
  }

  #removeLeastRecentlyUsed() {
    this.#cache.delete(this.#cache.keys().next().value);
  }

  has(key) {
    if (typeof key !== "string") {
      throw new TypeError("Key must be a string");
    }

    return this.#cache.has(key);
  }

  set(key, value) {
    if (typeof key !== "string") {
      throw new TypeError("Key must be a string");
    }

    if (this.#cache.size === this.#capacity) {
      this.#removeLeastRecentlyUsed();
    }

    this.#cache.set(key, value);
  }

  get(key) {
    if (typeof key !== "string") {
      throw new TypeError("Key must be a string");
    }

    if (this.#cache.has(key)) {
      const value = this.#cache.get(key);

      this.#cache.delete(key);
      this.#cache.set(key, value);

      this.#hits++;
      return value;
    }

    this.#misses++;
    return null;
  }

  parse(json) {
    const data = JSON.parse(json);

    if (!data || typeof data !== "object") {
      throw new Error("Invalid JSON");
    }

    this.#misses += data.misses ?? 0;
    this.#hits += data.hits ?? 0;

    for (const key in data.cache) {
      this.set(key, data.cache[key]);
    }

    return this;
  }

  toString(indent) {
    const replacer = (_, value) => {
      if (value instanceof Map) {
        return Object.fromEntries(value);
      }

      return value;
    };

    return JSON.stringify(this, replacer, indent);
  }
}
