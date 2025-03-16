import { API_ENDPOINTS, CACHE_TTL, DEFAULT_PARAMS } from '../config/constants';
import { GlobalMetricsParams, GlobalMetricsResponse } from '../types/api';
import { BaseApiService } from './base';

/**
 * Service for accessing global cryptocurrency market metrics
 */
export class GlobalMetricsService extends BaseApiService {
  /**
   * Gets latest global cryptocurrency market metrics
   * @param params Query parameters
   * @returns Global metrics data
   */
  async getGlobalMetrics(params: GlobalMetricsParams = {}): Promise<GlobalMetricsResponse> {
    const actualParams = {
      convert: params.convert || DEFAULT_PARAMS.CONVERT,
      ...params
    };
    
    return this.get<GlobalMetricsResponse>(
      API_ENDPOINTS.GLOBAL_METRICS, 
      actualParams,
      CACHE_TTL.SHORT
    );
  }
} 