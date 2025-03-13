import axios from 'axios';
import { COINMARKETCAP_API_KEY, FEAR_GREED_ENDPOINT } from '../config/config';
import { FearGreedParams, FearGreedResponse } from '../types';
import { formatErrorMessage, logError } from '../utils/error-handler';

/**
 * Fetches Fear and Greed Index data from CoinMarketCap API
 * @param params Query parameters for data retrieval
 * @returns Promise containing Fear and Greed Index data
 */
export async function fetchFearGreedIndex(params: FearGreedParams): Promise<FearGreedResponse> {
  try {
    // Set up request configuration
    const config = {
      headers: {
        'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY,
        'Accept': 'application/json'
      },
      params: {
        start: params.start,
        limit: params.limit || 50 // Default limit is 50
      }
    };

    // Make API request
    const response = await axios.get<FearGreedResponse>(FEAR_GREED_ENDPOINT, config);
    
    // Return response data
    return response.data;
  } catch (error: any) {
    // Log error for debugging
    logError('fetchFearGreedIndex', error);
    
    // Throw formatted error
    throw new Error(formatErrorMessage(error));
  }
}

/**
 * Validates Fear and Greed Index parameters
 * @param params Parameters to validate
 * @throws Error if parameters are invalid
 */
export function validateFearGreedParams(params: FearGreedParams): void {
  if (params.limit !== undefined) {
    if (params.limit < 1 || params.limit > 100) {
      throw new Error('Limit must be between 1 and 100');
    }
  }

  if (params.start !== undefined) {
    if (params.start < 1) {
      throw new Error('Start must be greater than 0');
    }
  }
} 