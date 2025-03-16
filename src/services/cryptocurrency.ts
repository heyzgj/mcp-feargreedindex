import { API_ENDPOINTS, CACHE_TTL, DEFAULT_PARAMS } from '../config/constants';
import { 
  CryptoListingsParams, 
  CryptoListingsResponse,
  CryptocurrencyInfo
} from '../types/api';
import { BaseApiService } from './base';

/**
 * Service for interacting with CoinMarketCap cryptocurrency API endpoints
 */
export class CryptocurrencyService extends BaseApiService {
  /**
   * Gets the latest cryptocurrency listings
   * @param params Query parameters
   * @returns Cryptocurrency listings
   */
  async getListings(params: CryptoListingsParams = {}): Promise<CryptoListingsResponse> {
    const actualParams = {
      limit: params.limit || DEFAULT_PARAMS.LIMIT,
      convert: params.convert || DEFAULT_PARAMS.CONVERT,
      ...params
    };
    
    return this.get<CryptoListingsResponse>(
      API_ENDPOINTS.CRYPTO_LISTINGS, 
      actualParams, 
      CACHE_TTL.SHORT
    );
  }

  /**
   * Gets latest quotes for specified cryptocurrencies
   * @param symbol Comma-separated cryptocurrency symbols (e.g. "BTC,ETH")
   * @param convert Currency to convert to (e.g. "USD")
   * @returns Latest quotes
   */
  async getQuotes(symbol: string, convert = DEFAULT_PARAMS.CONVERT) {
    return this.get(
      API_ENDPOINTS.CRYPTO_QUOTES, 
      { symbol, convert },
      CACHE_TTL.SHORT
    );
  }

  /**
   * Gets metadata for specified cryptocurrencies
   * @param symbol Comma-separated cryptocurrency symbols (e.g. "BTC,ETH")
   * @returns Cryptocurrency metadata
   */
  async getInfo(symbol: string) {
    return this.get(
      API_ENDPOINTS.CRYPTO_INFO, 
      { symbol },
      CACHE_TTL.LONG
    );
  }
  
  /**
   * Gets market pairs for a cryptocurrency
   * @param symbol Cryptocurrency symbol (e.g. "BTC")
   * @param limit Number of results to return
   * @returns Market pairs
   */
  async getMarketPairs(symbol: string, limit = DEFAULT_PARAMS.LIMIT) {
    return this.get(
      API_ENDPOINTS.CRYPTO_MARKET_PAIRS,
      { symbol, limit },
      CACHE_TTL.MEDIUM
    );
  }
  
  /**
   * Gets historical OHLCV data for a cryptocurrency
   * @param symbol Cryptocurrency symbol (e.g. "BTC")
   * @param convert Currency to convert to (e.g. "USD")
   * @param timeStart Start time as ISO string
   * @param timeEnd End time as ISO string
   * @param interval Time interval (e.g. "daily")
   * @returns Historical OHLCV data
   */
  async getHistoricalOHLCV(
    symbol: string,
    convert = DEFAULT_PARAMS.CONVERT,
    timeStart?: string,
    timeEnd?: string,
    interval = 'daily'
  ) {
    return this.get(
      API_ENDPOINTS.CRYPTO_OHLCV_HISTORICAL,
      { symbol, convert, time_start: timeStart, time_end: timeEnd, interval },
      CACHE_TTL.LONG
    );
  }
  
  /**
   * Gets price performance statistics for a cryptocurrency
   * @param symbol Cryptocurrency symbol (e.g. "BTC")
   * @param convert Currency to convert to (e.g. "USD")
   * @returns Price performance statistics
   */
  async getPricePerformance(symbol: string, convert = DEFAULT_PARAMS.CONVERT) {
    return this.get(
      API_ENDPOINTS.CRYPTO_PRICE_PERFORMANCE,
      { symbol, convert },
      CACHE_TTL.MEDIUM
    );
  }
  
  /**
   * Converts an amount of one cryptocurrency to another currency
   * @param amount Amount to convert
   * @param symbol Source cryptocurrency symbol (e.g. "BTC")
   * @param convert Currency to convert to (e.g. "USD")
   * @returns Converted amount
   */
  async convertPrice(amount: number, symbol: string, convert: string) {
    return this.get(
      API_ENDPOINTS.PRICE_CONVERSION,
      { amount, symbol, convert },
      CACHE_TTL.SHORT
    );
  }
} 