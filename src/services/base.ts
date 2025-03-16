import axios, { AxiosInstance } from 'axios';
import { COINMARKETCAP_API_KEY, API_BASE_URL, CACHE_ENABLED, CACHE_TTL_OVERRIDE } from '../config/config';
import { CACHE_TTL } from '../config/constants';
import { CacheManager } from '../utils/cache';
import { formatErrorMessage, logError } from '../utils/error-handler';

/**
 * Base API service providing common functionality for CoinMarketCap API calls
 */
export class BaseApiService {
  protected axios: AxiosInstance;
  protected cache: CacheManager;

  /**
   * Creates a new instance of BaseApiService
   */
  constructor() {
    this.axios = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY,
        'Accept': 'application/json'
      }
    });
    this.cache = new CacheManager();
  }

  /**
   * Makes a GET request to the specified API endpoint
   * Implements caching to reduce API calls
   * 
   * @param endpoint API endpoint
   * @param params Query parameters
   * @param cacheTime Time to cache results in seconds
   * @returns Response data
   */
  protected async get<T>(endpoint: string, params = {}, cacheTime = CACHE_TTL.MEDIUM): Promise<T> {
    try {
      // If cache is enabled, check for cached data
      if (CACHE_ENABLED) {
        const cacheKey = `${endpoint}:${JSON.stringify(params)}`;
        const actualCacheTime = CACHE_TTL_OVERRIDE || cacheTime;
        const cachedData = await this.cache.get<T>(cacheKey);
        
        if (cachedData) {
          return cachedData;
        }
        
        // If not cached or expired, make the API request
        const response = await this.axios.get<T>(endpoint, { params });
        
        // Cache the result
        await this.cache.set(cacheKey, response.data, actualCacheTime);
        return response.data;
      }
      
      // If cache is disabled, make a direct API request
      const response = await this.axios.get<T>(endpoint, { params });
      return response.data;
    } catch (error: any) {
      // Log error for debugging
      logError(`API-GET-${endpoint}`, error);
      
      // Throw formatted error
      throw new Error(formatErrorMessage(error));
    }
  }
  
  /**
   * Validates the API key
   * @returns True if API key is valid
   */
  async validateApiKey(): Promise<boolean> {
    try {
      const response = await this.axios.get('/v1/key/info');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
} 