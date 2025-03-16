import { z } from 'zod';
import { FearGreedService } from '../services/fear-greed';
import { ToolRegistry } from './base';

/**
 * Registers Fear & Greed Index tools with the MCP server
 * @param registry Tool registry instance
 */
export function registerFearGreedTools(registry: ToolRegistry): void {
  const service = new FearGreedService();

  // 获取恐慧与贪婪指数
  registry.registerTool(
    'get_fear_greed_index',
    {
      start: z.number().int().positive().optional().describe('Starting point of data retrieval (optional)'),
      limit: z.number().int().min(1).max(100).optional().default(10).describe('Number of records to return (default: 10, max: 100)')
    },
    (params) => service.getFearGreedIndex(params)
  );
} 