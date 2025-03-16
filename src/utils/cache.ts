/**
 * Simple in-memory cache manager
 * Provides caching functionality to reduce API calls
 */
export class CacheManager {
  private cache: Map<string, { data: any; expiry: number }> = new Map();

  /**
   * Retrieves data from cache if available and not expired
   * @param key Cache key
   * @returns Cached data or null if not found or expired
   */
  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key);
    if (!item) return null;

    if (item.expiry < Date.now()) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  /**
   * Stores data in cache with expiration
   * @param key Cache key
   * @param data Data to cache
   * @param ttlSeconds Time to live in seconds
   */
  async set(key: string, data: any, ttlSeconds: number): Promise<void> {
    const expiry = Date.now() + ttlSeconds * 1000;
    this.cache.set(key, { data, expiry });
  }

  /**
   * Clears all cached data
   */
  clear(): void {
    this.cache.clear();
  }
  
  /**
   * Removes a specific item from cache
   * @param key Cache key to remove
   */
  remove(key: string): void {
    this.cache.delete(key);
  }
} 