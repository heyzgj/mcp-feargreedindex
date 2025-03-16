/**
 * Common status object included in all CoinMarketCap API responses
 */
export interface CMCStatus {
  timestamp: string;
  error_code: number;
  error_message: string | null;
  elapsed: number;
  credit_count: number;
  notice?: string;
}

/**
 * Base response interface for all CoinMarketCap API responses
 */
export interface CMCBaseResponse {
  status: CMCStatus;
}

/**
 * Fear and Greed Index API response
 */
export interface FearGreedResponse extends CMCBaseResponse {
  data: FearGreedData[];
}

export interface FearGreedData {
  timestamp: string;
  value: number;
  value_classification: string;
  time_until_update?: string;
}

/**
 * Parameters for cryptocurrency listings endpoint
 */
export interface CryptoListingsParams {
  start?: number;
  limit?: number;
  price_min?: number;
  price_max?: number;
  market_cap_min?: number;
  market_cap_max?: number;
  volume_24h_min?: number;
  volume_24h_max?: number;
  circulating_supply_min?: number;
  circulating_supply_max?: number;
  percent_change_24h_min?: number;
  percent_change_24h_max?: number;
  convert?: string;
  convert_id?: string;
  sort?: string;
  sort_dir?: string;
  cryptocurrency_type?: string;
  tag?: string;
  aux?: string;
}

/**
 * Cryptocurrency listings API response
 */
export interface CryptoListingsResponse extends CMCBaseResponse {
  data: CryptocurrencyInfo[];
}

/**
 * Cryptocurrency information
 */
export interface CryptocurrencyInfo {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank: number;
  num_market_pairs: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  infinite_supply: boolean;
  last_updated: string;
  date_added: string;
  tags: string[];
  platform: Platform | null;
  self_reported_circulating_supply: number | null;
  self_reported_market_cap: number | null;
  quote: {
    [currency: string]: Quote;
  };
}

/**
 * Cryptocurrency platform information
 */
interface Platform {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  token_address: string;
}

/**
 * Cryptocurrency quote information
 */
interface Quote {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  last_updated: string;
}

/**
 * Parameters for Global Metrics endpoint
 */
export interface GlobalMetricsParams {
  convert?: string;
  convert_id?: string;
}

/**
 * Global Metrics API response
 */
export interface GlobalMetricsResponse extends CMCBaseResponse {
  data: {
    active_cryptocurrencies: number;
    total_cryptocurrencies: number;
    active_market_pairs: number;
    active_exchanges: number;
    total_exchanges: number;
    eth_dominance: number;
    btc_dominance: number;
    defi_volume_24h: number;
    defi_volume_24h_reported: number;
    defi_market_cap: number;
    defi_24h_percentage_change: number;
    stablecoin_volume_24h: number;
    stablecoin_volume_24h_reported: number;
    stablecoin_market_cap: number;
    stablecoin_24h_percentage_change: number;
    derivatives_volume_24h: number;
    derivatives_volume_24h_reported: number;
    derivatives_24h_percentage_change: number;
    quote: {
      [currency: string]: {
        total_market_cap: number;
        total_volume_24h: number;
        total_volume_24h_reported: number;
        altcoin_volume_24h: number;
        altcoin_volume_24h_reported: number;
        altcoin_market_cap: number;
        last_updated: string;
      };
    };
    last_updated: string;
  };
}

/**
 * Parameters for Exchange listings endpoint
 */
export interface ExchangeListingsParams {
  start?: number;
  limit?: number;
  sort?: string;
  sort_dir?: string;
  market_type?: string;
  aux?: string;
}

/**
 * Exchange listings API response
 */
export interface ExchangeListingsResponse extends CMCBaseResponse {
  data: ExchangeInfo[];
}

/**
 * Exchange information
 */
export interface ExchangeInfo {
  id: number;
  name: string;
  slug: string;
  num_market_pairs: number;
  fiats: {
    name: string;
    symbol: string;
  }[];
  traffic_score: number;
  rank: number;
  exchange_score: number;
  liquidity_score: number;
  last_updated: string;
  quote: {
    [currency: string]: {
      volume_24h: number;
      volume_24h_adjusted: number;
      volume_7d: number;
      volume_30d: number;
      percent_change_volume_24h: number;
      percent_change_volume_7d: number;
      percent_change_volume_30d: number;
      effective_liquidity_24h: number;
      derivative_volume_usd: number;
      spot_volume_usd: number;
      last_updated: string;
    };
  };
} 