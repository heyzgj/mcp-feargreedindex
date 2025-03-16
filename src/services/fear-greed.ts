import { API_ENDPOINTS, CACHE_TTL, DEFAULT_PARAMS } from '../config/constants';
import { FearGreedResponse } from '../types/api';
import { FearGreedParams } from '../types/tools';
import { BaseApiService } from './base';

/**
 * Service for accessing Fear & Greed Index data from CoinMarketCap
 */
export class FearGreedService extends BaseApiService {
  /**
   * Gets historical Fear & Greed Index data
   * @param params Query parameters
   * @returns Fear & Greed Index data
   */
  async getFearGreedIndex(params: FearGreedParams = {}): Promise<FearGreedResponse> {
    // Validate parameters
    this.validateFearGreedParams(params);
    
    const actualParams = {
      limit: params.limit || DEFAULT_PARAMS.LIMIT,
      start: params.start || 1
    };
    
    return this.get<FearGreedResponse>(
      API_ENDPOINTS.FEAR_GREED, 
      actualParams,
      CACHE_TTL.MEDIUM
    );
  }
  
  /**
   * Validates Fear & Greed parameters
   * @param params Parameters to validate
   */
  private validateFearGreedParams(params: FearGreedParams): void {
    if (params.limit !== undefined) {
      if (!Number.isInteger(params.limit) || params.limit < 1 || params.limit > 100) {
        throw new Error('Limit must be an integer between 1 and 100');
      }
    }

    if (params.start !== undefined) {
      if (!Number.isInteger(params.start) || params.start < 1) {
        throw new Error('Start must be a positive integer');
      }
    }
  }
} 