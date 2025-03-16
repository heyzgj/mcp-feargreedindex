/**
 * CoinMarketCap API Endpoints
 */
export const API_ENDPOINTS = {
  // Fear and Greed Index
  FEAR_GREED: '/v3/fear-and-greed/historical',
  
  // Cryptocurrency endpoints
  CRYPTO_LISTINGS: '/v1/cryptocurrency/listings/latest',
  CRYPTO_QUOTES: '/v2/cryptocurrency/quotes/latest',
  CRYPTO_INFO: '/v2/cryptocurrency/info',
  CRYPTO_MARKET_PAIRS: '/v2/cryptocurrency/market-pairs/latest',
  CRYPTO_OHLCV_HISTORICAL: '/v2/cryptocurrency/ohlcv/historical',
  CRYPTO_PRICE_PERFORMANCE: '/v2/cryptocurrency/price-performance-stats/latest',
  
  // Global metrics endpoints
  GLOBAL_METRICS: '/v1/global-metrics/quotes/latest',
  
  // Exchange endpoints
  EXCHANGE_LISTINGS: '/v1/exchange/listings/latest',
  EXCHANGE_INFO: '/v2/exchange/info',
  EXCHANGE_MAP: '/v1/exchange/map',
  
  // Tools
  PRICE_CONVERSION: '/v2/tools/price-conversion',
  
  // API key validation
  KEY_INFO: '/v1/key/info'
};

/**
 * Default cache TTL in seconds
 */
export const CACHE_TTL = {
  SHORT: 60,          // 1 minute
  MEDIUM: 300,        // 5 minutes
  LONG: 3600,         // 1 hour
  VERY_LONG: 86400    // 24 hours
};

/**
 * Default parameter values
 */
export const DEFAULT_PARAMS = {
  LIMIT: 10,
  CONVERT: 'USD'
}; 