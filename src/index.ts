import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { fetchFearGreedIndex, validateFearGreedParams } from './services/coinmarketcap';
import { logError } from './utils/error-handler';
import { z } from 'zod';

// initialize mcp server
const server = new McpServer({
  name: "CoinMarketCap Fear & Greed Index",
  version: "1.0.0"
});

// register tool
server.tool(
  'get_fear_greed_index',
  {
    start: z.number().optional().describe('Starting point of data retrieval (optional)'),
    limit: z.number().optional().describe('Number of records to return (default: 50, max: 100)')
  },
  async (params) => {
    try {
      validateFearGreedParams(params);
      const data = await fetchFearGreedIndex(params);
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify(data, null, 2)
        }]
      };
    } catch (error: any) {
      logError('get_fear_greed_index', error);
      return {
        content: [{ 
          type: "text", 
          text: `Error: ${error.message}`
        }],
        isError: true
      };
    }
  }
);

// use STDIO transport
const transport = new StdioServerTransport();

(async () => {
  await server.connect(transport);
  console.log(`MCP Server (STDIO) started!`);
  console.log(`Tool available: get_fear_greed_index`);
})();