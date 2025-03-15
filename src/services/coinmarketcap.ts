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
    // Debug logs
    console.log('=== API Request Debug Info ===');
    console.log('API Key (masked):', COINMARKETCAP_API_KEY ? '****' + COINMARKETCAP_API_KEY.substring(COINMARKETCAP_API_KEY.length - 4) : 'Not set');
    console.log('Endpoint:', FEAR_GREED_ENDPOINT);
    console.log('Params:', params);
    
    // Check if API key is provided
    if (!COINMARKETCAP_API_KEY) {
      throw new Error('CoinMarketCap API key is not configured');
    }

    // Set up request configuration
    const config = {
      headers: {
        'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY,
        'Accept': 'application/json'
      },
      params: {
        start: params.start,
        limit: params.limit || 10 // Default limit is 10
      }
    };

    // Make API request
    console.log('Making API request...');
    const response = await axios.get<FearGreedResponse>(FEAR_GREED_ENDPOINT, config);
    
    // Log success
    console.log('API request successful!');
    console.log('Status:', response.status);
    console.log('Data preview:', {
      status: response.data.status,
      dataCount: response.data.data?.length || 0
    });
    
    // Return response data
    return response.data;
  } catch (error: any) {
    // Log detailed error for debugging
    console.error('=== API Request Error ===');
    console.error('Error message:', error.message);
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Status text:', error.response.statusText);
      console.error('Response data:', error.response.data);
      console.error('Response headers:', error.response.headers);
    }
    
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
