import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// API configuration
export const COINMARKETCAP_API_KEY = process.env.CMC_API_KEY || '5b338a09-fe63-4cba-85fa-7228191c8de8';
export const FEAR_GREED_ENDPOINT = 'https://pro-api.coinmarketcap.com/v3/fear-and-greed/historical';

// Server configuration
export const PORT = parseInt(process.env.PORT || '3000', 10); 