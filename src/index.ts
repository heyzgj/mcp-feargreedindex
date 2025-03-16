import dotenv from 'dotenv';

// Load environment variables before other imports
dotenv.config();

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { APP_NAME, APP_VERSION, APP_DESCRIPTION, COINMARKETCAP_API_KEY } from './config/config';
import { ToolRegistry } from './tools/base';
import { registerCryptocurrencyTools } from './tools/cryptocurrency';
import { registerExchangeTools } from './tools/exchange';
import { registerGlobalTools } from './tools/global';
import { registerFearGreedTools } from './tools/fear-greed';
import { BaseApiService } from './services/base';

// Display startup information
console.log(`=== ${APP_NAME} ===`);
console.log('Environment:', process.env.NODE_ENV || 'development');
console.log('API Key (masked):', COINMARKETCAP_API_KEY ? '****' + COINMARKETCAP_API_KEY.substring(COINMARKETCAP_API_KEY.length - 4) : 'Not set');

// Initialize MCP server
const server = new McpServer({
  name: APP_NAME,
  version: APP_VERSION,
  description: APP_DESCRIPTION
});

// Create tool registry
const registry = new ToolRegistry(server);

// Register all tools
registerCryptocurrencyTools(registry);
registerExchangeTools(registry);
registerGlobalTools(registry);
registerFearGreedTools(registry);

// Use STDIO transport
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
      
      // Use base service for validation
      const baseService = new BaseApiService();
      const isValid = await baseService.validateApiKey();
      
      if (isValid) {
        console.log('API key validation successful!');
      } else {
        console.warn('API key validation failed!');
        console.warn('Continuing anyway...');
      }
    } catch (error: any) {
      console.warn('API key validation warning:', error.message);
      console.warn('Continuing anyway...');
    }
    
    // Connect transport
    await server.connect(transport);
    console.log('MCP Server (STDIO) started!');
    console.log('Available tools:');
    console.log('- get_fear_greed_index');
    console.log('- get_cryptocurrency_listings');
    console.log('- get_cryptocurrency_quotes');
    console.log('- get_cryptocurrency_info');
    console.log('- get_cryptocurrency_market_pairs');
    console.log('- get_cryptocurrency_ohlcv');
    console.log('- convert_cryptocurrency');
    console.log('- get_global_metrics');
    console.log('- get_exchange_listings');
    console.log('- get_exchange_info');
    console.log('- get_exchange_map');
  } catch (error: any) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
})();


