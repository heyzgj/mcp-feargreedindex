import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// API configuration
export const COINMARKETCAP_API_KEY = process.env.CMC_API_KEY || '';
export const API_BASE_URL = 'https://pro-api.coinmarketcap.com';

// Cache configuration
export const CACHE_ENABLED = process.env.CACHE_ENABLED !== 'false';
export const CACHE_TTL_OVERRIDE = process.env.CACHE_TTL ? parseInt(process.env.CACHE_TTL) : undefined;

// Server configuration
export const PORT = parseInt(process.env.PORT || '3000', 10);
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

// Application configuration
export const APP_NAME = 'CoinMarketCap Universal API';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Provides access to CoinMarketCap cryptocurrency data';
