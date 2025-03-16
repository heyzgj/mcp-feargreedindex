import { API_ENDPOINTS, CACHE_TTL, DEFAULT_PARAMS } from '../config/constants';
import { ExchangeListingsParams, ExchangeListingsResponse } from '../types/api';
import { BaseApiService } from './base';

/**
 * Service for accessing exchange data from CoinMarketCap
 */
export class ExchangeService extends BaseApiService {
  /**
   * Gets the latest exchange listings
   * @param params Query parameters
   * @returns Exchange listings
   */
  async getListings(params: ExchangeListingsParams = {}): Promise<ExchangeListingsResponse> {
    const actualParams = {
      limit: params.limit || DEFAULT_PARAMS.LIMIT,
      ...params
    };
    
    return this.get<ExchangeListingsResponse>(
      API_ENDPOINTS.EXCHANGE_LISTINGS, 
      actualParams,
      CACHE_TTL.MEDIUM
    );
  }
  
  /**
   * Gets detailed metadata for specified exchanges
   * @param id Comma-separated exchange IDs (e.g. "1,2")
   * @param slug Comma-separated exchange slugs (e.g. "binance,coinbase")
   * @returns Exchange metadata
   */
  async getInfo(id?: string, slug?: string) {
    if (!id && !slug) {
      throw new Error('Either id or slug parameter is required');
    }
    
    const params: Record<string, any> = {};
    if (id) params.id = id;
    if (slug) params.slug = slug;
    
    return this.get(
      API_ENDPOINTS.EXCHANGE_INFO, 
      params,
      CACHE_TTL.LONG
    );
  }
  
  /**
   * Gets a map of all exchanges
   * @param limit Number of exchanges to return
   * @param start Starting point for pagination
   * @returns Exchange map
   */
  async getMap(limit = DEFAULT_PARAMS.LIMIT, start = 1) {
    return this.get(
      API_ENDPOINTS.EXCHANGE_MAP,
      { limit, start },
      CACHE_TTL.VERY_LONG
    );
  }
} 