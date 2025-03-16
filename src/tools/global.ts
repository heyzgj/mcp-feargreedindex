import { z } from 'zod';
import { GlobalMetricsService } from '../services/global';
import { ToolRegistry } from './base';

/**
 * Registers global market metrics tools with the MCP server
 * @param registry Tool registry instance
 */
export function registerGlobalTools(registry: ToolRegistry): void {
  const service = new GlobalMetricsService();

  // 获取全球加密货币市场指标
  registry.registerTool(
    'get_global_metrics',
    {
      convert: z.string().optional().describe('Currency to convert metrics to (default: USD)')
    },
    (params) => service.getGlobalMetrics(params)
  );
} 