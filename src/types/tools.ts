/**
 * Parameters for the Fear and Greed Index tool
 */
export interface FearGreedParams {
  start?: number;
  limit?: number;
}

/**
 * Parameters for cryptocurrency listings tool
 */
export interface CryptoListingsToolParams {
  start?: number;
  limit?: number;
  convert?: string;
}

/**
 * Parameters for cryptocurrency quotes tool
 */
export interface CryptoQuotesToolParams {
  symbol: string;
  convert?: string;
}

/**
 * Parameters for cryptocurrency info tool
 */
export interface CryptoInfoToolParams {
  symbol: string;
}

/**
 * Parameters for global metrics tool
 */
export interface GlobalMetricsToolParams {
  convert?: string;
}

/**
 * Parameters for exchange listings tool
 */
export interface ExchangeListingsToolParams {
  start?: number;
  limit?: number;
  sort?: string;
}

/**
 * Parameters for exchange info tool
 */
export interface ExchangeInfoToolParams {
  id?: string;
  slug?: string;
}

/**
 * Parameters for cryptocurrency convert tool
 */
export interface CryptoConvertToolParams {
  amount: number;
  symbol: string;
  convert: string;
} 