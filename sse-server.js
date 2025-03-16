import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";

const server = new McpServer({
  name: "demo-sse",
  version: "1.0.0"
});

// 这里随便做一个汇率换算的工具
server.tool("exchange",
  "人民币汇率换算",
  { rmb: z.number() },
  async ({ rmb }) => {
    const usdRate = 0.14; // 示例：1 人民币 = 0.14 美元
    const hkdRate = 1.09; // 示例：1 人民币 = 1.09 港币
    return {
      content: [{
        type: "text",
        text: `${rmb} RMB = ${(rmb * usdRate).toFixed(2)} USD, ${(rmb * hkdRate).toFixed(2)} HKD`
      }]
    };
  }
);

const app = express();

// 用于保存所有 SSE 会话
const sessions = {};

// 1) 处理 SSE 连接
app.get("/sse", async (req, res) => {
  console.log(`New SSE connection from ${req.ip}`);
  // 告诉 SSEServerTransport，后续的 POST 路径是 "/messages"
  const sseTransport = new SSEServerTransport("/messages", res);

  // 每次连接都会生成一个 sessionId
  const sessionId = sseTransport.sessionId;
  // 记录当前会话
  sessions[sessionId] = { transport: sseTransport, response: res };

  // 让 MCP Server 与 sseTransport 建立连接
  await server.connect(sseTransport);
});

// 2) 处理后续数据的 POST 请求
app.post("/messages", async (req, res) => {
  // Cursor 发起请求时会带上一个 sessionId
  const sessionId = req.query.sessionId;
  const session = sessions[sessionId];

  if (!session) {
    return res.status(404).send("Session not found");
  }

  // 让 sseTransport 处理本次 POST
  await session.transport.handlePostMessage(req, res);
});

app.listen(3001, () => {
  console.log("SSE MCP server listening on port 3001");
});