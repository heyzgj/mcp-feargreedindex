import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { logError } from '../utils/error-handler';

/**
 * Tool registry for registering MCP tools
 */
export class ToolRegistry {
  /**
   * Creates a new instance of ToolRegistry
   * @param server MCP server instance
   */
  constructor(private server: McpServer) {}

  /**
   * Registers a tool with the MCP server
   * @param name Tool name
   * @param paramsSchema Parameter schema as Zod raw shape
   * @param handler Function to handle tool calls
   */
  registerTool(
    name: string,
    paramsSchema: z.ZodRawShape,
    handler: (params: any) => Promise<any>
  ): void {
    this.server.tool(
      name,
      paramsSchema,
      async (params) => {
        try {
          const data = await handler(params);
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify(data, null, 2)
            }]
          };
        } catch (error: any) {
          // Log error
          logError(`tool-${name}`, error);
          
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
  }
} 