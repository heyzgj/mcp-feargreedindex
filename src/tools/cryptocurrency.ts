import { z } from 'zod';
import { CryptocurrencyService } from '../services/cryptocurrency';
import { ToolRegistry } from './base';

/**
 * Registers cryptocurrency-related tools with the MCP server
 * @param registry Tool registry instance
 */
export function registerCryptocurrencyTools(registry: ToolRegistry): void {
  const service = new CryptocurrencyService();

  // 获取加密货币列表
  registry.registerTool(
    'get_cryptocurrency_listings',
    {
      start: z.number().int().positive().optional().describe('Starting point for data retrieval (default: 1)'),
      limit: z.number().int().min(1).max(100).optional().describe('Number of results to return (default: 10, max: 100)'),
      convert: z.string().optional().describe('Currency to convert prices to (default: USD)')
    },
    (params) => service.getListings(params)
  );

  // 获取特定加密货币报价
  registry.registerTool(
    'get_cryptocurrency_quotes',
    {
      symbol: z.string().describe('Cryptocurrency symbol(s), comma-separated (e.g., "BTC,ETH")'),
      convert: z.string().optional().describe('Currency to convert price to (default: USD)')
    },
    (params) => service.getQuotes(params.symbol, params.convert)
  );

  // 获取加密货币元数据
  registry.registerTool(
    'get_cryptocurrency_info',
    {
      symbol: z.string().describe('Cryptocurrency symbol(s), comma-separated (e.g., "BTC,ETH")')
    },
    (params) => service.getInfo(params.symbol)
  );

  // 获取加密货币市场交易对
  registry.registerTool(
    'get_cryptocurrency_market_pairs',
    {
      symbol: z.string().describe('Cryptocurrency symbol (e.g., "BTC")'),
      limit: z.number().int().min(1).max(100).optional().describe('Number of results to return (default: 10, max: 100)')
    },
    (params) => service.getMarketPairs(params.symbol, params.limit)
  );

  // 获取加密货币历史OHLCV数据
  registry.registerTool(
    'get_cryptocurrency_ohlcv',
    {
      symbol: z.string().describe('Cryptocurrency symbol (e.g., "BTC")'),
      convert: z.string().optional().describe('Currency to convert to (default: USD)'),
      time_start: z.string().optional().describe('Start time in ISO 8601 format'),
      time_end: z.string().optional().describe('End time in ISO 8601 format'),
      interval: z.string().optional().describe('Time interval (e.g., "daily", "hourly", "5m")')
    },
    (params) => service.getHistoricalOHLCV(
      params.symbol, 
      params.convert, 
      params.time_start, 
      params.time_end, 
      params.interval
    )
  );

  // 加密货币价格转换
  registry.registerTool(
    'convert_cryptocurrency',
    {
      amount: z.number().positive().describe('Amount to convert'),
      symbol: z.string().describe('Source cryptocurrency symbol (e.g., "BTC")'),
      convert: z.string().describe('Target currency to convert to (e.g., "USD", "EUR", "ETH")')
    },
    (params) => service.convertPrice(params.amount, params.symbol, params.convert)
  );
} 