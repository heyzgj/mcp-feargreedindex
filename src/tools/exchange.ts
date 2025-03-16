import { z } from 'zod';
import { ExchangeService } from '../services/exchange';
import { ToolRegistry } from './base';

/**
 * Registers exchange-related tools with the MCP server
 * @param registry Tool registry instance
 */
export function registerExchangeTools(registry: ToolRegistry): void {
  const service = new ExchangeService();

  // 获取交易所列表
  registry.registerTool(
    'get_exchange_listings',
    {
      start: z.number().int().positive().optional().describe('Starting point for data retrieval (default: 1)'),
      limit: z.number().int().min(1).max(100).optional().describe('Number of results to return (default: 10, max: 100)'),
      sort: z.string().optional().describe('Sort field (e.g., "volume_24h")'),
      sort_dir: z.string().optional().describe('Sort direction ("asc" or "desc")')
    },
    (params) => service.getListings(params)
  );

  // 获取交易所详细信息
  registry.registerTool(
    'get_exchange_info',
    {
      id: z.string().optional().describe('Exchange ID(s), comma-separated (e.g., "1,2")'),
      slug: z.string().optional().describe('Exchange slug(s), comma-separated (e.g., "binance,coinbase")')
    },
    (params) => {
      if (!params.id && !params.slug) {
        throw new Error('Either id or slug parameter is required');
      }
      return service.getInfo(params.id, params.slug);
    }
  );

  // 获取交易所映射
  registry.registerTool(
    'get_exchange_map',
    {
      limit: z.number().int().min(1).max(100).optional().describe('Number of results to return (default: 10, max: 100)'),
      start: z.number().int().positive().optional().describe('Starting point for data retrieval (default: 1)')
    },
    (params) => service.getMap(params.limit, params.start)
  );
} 