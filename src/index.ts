import dotenv from 'dotenv';

// Load environment variables before other imports
dotenv.config();

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { fetchFearGreedIndex, validateFearGreedParams } from './services/coinmarketcap';
import { logError } from './utils/error-handler';
import { z } from 'zod';
import axios from 'axios';
import { COINMARKETCAP_API_KEY } from './config/config';

// Display startup information
console.log('=== MCP Fear & Greed Index Server ===');
console.log('Environment:', process.env.NODE_ENV || 'development');
console.log('API Key (masked):', COINMARKETCAP_API_KEY ? '****' + COINMARKETCAP_API_KEY.substring(COINMARKETCAP_API_KEY.length - 4) : 'Not set');

// initialize mcp server
const server = new McpServer({
  name: "CoinMarketCap Fear & Greed Index",
  version: "1.0.0",
  description: "Provides access to CoinMarketCap's Fear & Greed Index data"
});

// register tool
server.tool(
  'get_fear_greed_index',
  {
    start: z.number().int().positive().optional().describe('Starting point of data retrieval (optional)'),
    limit: z.number().int().min(1).max(100).optional().default(10).describe('Number of records to return (default: 10, max: 100)')
  },
  async (params) => {
    try {
      // Validate parameters
      validateFearGreedParams(params);
      
      // Fetch data
      console.log('Fetching Fear & Greed data with params:', params);
      const data = await fetchFearGreedIndex(params);
      
      // Return results
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify(data, null, 2)
        }]
      };
    } catch (error: any) {
      // Log error
      logError('get_fear_greed_index', error);
      
      // Return error message
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

// Start the server
(async () => {
  try {
    // Validate API key
    if (!COINMARKETCAP_API_KEY) {
      console.error('Error: CoinMarketCap API key is not set');
      process.exit(1);
    }
    
    // Try to validate if the API key is valid
    try {
      console.log('Validating API key...');
      
      // Use key info endpoint for validation
      const response = await axios.get('https://pro-api.coinmarketcap.com/v1/key/info', {
        headers: {
          'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY
        }
      });
      
      console.log('API key validation successful!');
      console.log('API Plan:', response.data?.data?.plan?.name || 'Unknown');
    } catch (error: any) {
      console.warn('API key validation warning:', error.message);
      console.warn('Continuing anyway...');
    }
    
    // Connect transport
    await server.connect(transport);
    console.log('MCP Server (STDIO) started!');
    console.log('Tool available: get_fear_greed_index');
  } catch (error: any) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
})();


