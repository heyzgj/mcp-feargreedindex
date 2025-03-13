# MCP Server for Fear and Greed Index

This project is a Model Context Protocol (MCP) server that provides Fear and Greed Index data from CoinMarketCap. It's designed to be easily integrated with Cursor, allowing you to access historical Fear and Greed Index values directly within your Cursor environment.

## Project GitHub Repository

[https://github.com/heyzgj/mcp-feargreedindex](https://github.com/heyzgj/mcp-feargreedindex)

## How to Add to Cursor MCP

This project is built to be seamlessly integrated with Cursor's MCP feature. Here's how to add it:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/heyzgj/mcp-feargreedindex.git
    cd mcp-feargreedindex
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    *   Create a `.env` file in the project root.
    *   Add your CoinMarketCap API key and port:

        ```
        CMC_API_KEY=YOUR_COINMARKETCAP_API_KEY
        PORT=3000
        ```

        Replace `YOUR_COINMARKETCAP_API_KEY` with your actual API key.

4.  **Build and run the server:**
    *   **Development:**
        ```bash
        npm run dev
        ```
    *   **Production:**
        ```bash
        npm run build
        npm start
        ```

5.  **Add to Cursor:**
    *   Open Cursor.
    *   Go to Settings > Model Context Protocol.
    *   Add a new server with the following configuration:
        *   **Server URL:** `http://localhost:3000` (or your server's address)
        *   **Tool Name:** `get_fear_greed_index`

Now, you can use the `get_fear_greed_index` tool directly within Cursor to access Fear and Greed Index data!
