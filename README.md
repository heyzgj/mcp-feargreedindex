# CoinMarketCap Universal MCP Server

This project is a Model Context Protocol (MCP) server that provides comprehensive access to CoinMarketCap's cryptocurrency data. It is designed to be easily integrated into Cursor, allowing you to access a wide range of cryptocurrency data directly within the Cursor environment.

## Features

- **Comprehensive API Coverage**: Access to multiple CoinMarketCap API endpoints
- **Smart Caching**: Reduces API calls and improves performance
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Modular Design**: Easy to extend and maintain
- **Detailed Error Handling**: Clear error messages and logging

## Available Tools

### Cryptocurrency Data
- `get_cryptocurrency_listings` - Get latest cryptocurrency listings
- `get_cryptocurrency_quotes` - Get quotes for specific cryptocurrencies
- `get_cryptocurrency_info` - Get metadata for cryptocurrencies
- `get_cryptocurrency_market_pairs` - Get market pairs for a cryptocurrency
- `get_cryptocurrency_ohlcv` - Get historical OHLCV data
- `convert_cryptocurrency` - Convert between cryptocurrencies and fiat currencies

### Exchange Data
- `get_exchange_listings` - Get latest exchange listings
- `get_exchange_info` - Get detailed exchange information
- `get_exchange_map` - Get a map of all exchanges

### Global Market Data
- `get_global_metrics` - Get global cryptocurrency market metrics

### Market Sentiment
- `get_fear_greed_index` - Get Fear & Greed Index data

## How to Add to Cursor MCP

This project is built to seamlessly integrate with Cursor's MCP functionality. Here's how to add it:

1. **Clone the repository and enter the project directory:**

   ```bash
   git clone https://github.com/yourusername/coinmarketcap-mcp.git
   cd coinmarketcap-mcp
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   * Create a `.env` file in the project root directory.
   * Add your CoinMarketCap API key:

     ```
     CMC_API_KEY=YOUR_COINMARKETCAP_API_KEY
     CACHE_ENABLED=true
     CACHE_TTL=300
     ```

     Replace `YOUR_COINMARKETCAP_API_KEY` with your actual API key.

4. **Build and run the server:**
   * **Development environment:**
     ```bash
     npm run dev
     ```
   * **Production environment:**
     ```bash
     npm run build
     npm start
     ```

5. **Add to Cursor:**
   * Open Cursor.
   * Go to Settings > MCP.
   * Add a new server with the following configuration:
     * **Type:** `COMMAND`
     * **Command:** `node ABSOLUTE PATH/dist/index.js`

Now, you can use all the available tools directly in Cursor to access CoinMarketCap data!

## Usage Examples

### Get the latest cryptocurrency listings
```js
get_cryptocurrency_listings({
  limit: 10,
  convert: "USD"
})
```

### Get quotes for specific cryptocurrencies
```js
get_cryptocurrency_quotes({
  symbol: "BTC,ETH,SOL",
  convert: "USD"
})
```

### Get the Fear & Greed Index
```js
get_fear_greed_index({
  limit: 7
})
```

### Get global market metrics
```js
get_global_metrics({
  convert: "USD"
})
```

## Troubleshooting

If you encounter issues:

1. Make sure you have a valid CoinMarketCap API key
2. Check that the `.env` file is correctly configured
3. Review the console logs for detailed error information
4. Ensure your API plan has access to the endpoints you're trying to use

## License

MIT
