# MCP Server for Fear and Greed Index

This project is a Model Context Protocol (MCP) server that provides CoinMarketCap's Fear and Greed Index data. It is designed to be easily integrated into Cursor, allowing you to access historical Fear and Greed Index values directly within the Cursor environment.

## How to Add to Cursor MCP

This project is built to seamlessly integrate with Cursor's MCP functionality. Here's how to add it:

1. **Clone the repository and enter the project directory:**

   ```bash
   git clone https://github.com/yourusername/mcp-feargreedindex.git
   cd mcp-feargreedindex
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
     PORT=3000
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

Now, you can use the `get_fear_greed_index` tool directly in Cursor to access Fear and Greed Index data!

## Usage

In Cursor, you can call the tool with the following parameters:

```js
// Get the latest Fear and Greed Index
get_fear_greed_index({
  limit: 1
})

// Get multiple historical records
get_fear_greed_index({
  limit: 10
})

// Get data from a specific starting point
get_fear_greed_index({
  start: 2,
  limit: 5
})
```

## API Response Format

The data returned by the tool is formatted as follows:

```json
{
  "status": {
    "timestamp": "2023-04-12T12:00:00.000Z",
    "error_code": 0,
    "error_message": null,
    "elapsed": 15,
    "credit_count": 1
  },
  "data": [
    {
      "timestamp": "2023-04-11T12:00:00.000Z",
      "value": 50,
      "value_classification": "Neutral"
    },
    ...
  ]
}
```

## Troubleshooting

If you encounter issues:

1. Make sure you have a valid CoinMarketCap API key
2. Check that the `.env` file is correctly configured
3. Review the console logs for detailed error information
