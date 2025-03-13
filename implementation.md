# CoinMarketCap 恐惧与贪婪指数 MCP 服务器实现计划

<!-- META
版本: 1.0
上次更新: 2023-10-15
当前技术栈: TypeScript
API密钥: 5b338a09-fe63-4cba-85fa-7228191c8de8
-->

<!-- START_SECTION: INTRODUCTION -->
## 项目介绍

本项目旨在构建一个可扩展的 Model Context Protocol (MCP) 服务器，用于获取和处理 CoinMarketCap 的恐惧与贪婪指数数据。MCP 服务器允许 AI 助手（如 Claude）通过定义的工具与外部 API 进行交互，从而获取实时加密货币市场情绪数据。

### 项目目标

1. 实现一个基础 MCP 服务器，提供恐惧与贪婪指数数据获取功能
2. 设计良好的错误处理和日志记录机制
3. 提供可扩展的架构，便于后续添加更多加密货币相关工具
4. 确保代码可维护性和可测试性

### 技术栈

- **语言**: TypeScript
- **运行时**: Node.js
- **依赖**:
  - @modelcontextprotocol/sdk: MCP 服务器实现
  - axios: HTTP 请求库
  - dotenv: 环境变量管理
  
### API 端点

本项目使用 CoinMarketCap API 的恐惧与贪婪指数历史数据端点:
- 端点: `https://pro-api.coinmarketcap.com/v3/fear-and-greed/historical`
<!-- END_SECTION: INTRODUCTION -->

<!-- START_SECTION: HOW_TO_USE -->
## 如何使用本文档

本文档采用结构化格式，将 MCP 服务器的实现分解为多个清晰的阶段，每个阶段包含可独立执行的原子级步骤。文档设计考虑了 AI 助手的使用场景，便于快速理解和执行。

### 文档结构

- **项目介绍**: 概述项目目标、技术栈和API信息
- **阶段(Phase)**: 项目实现的主要阶段，如环境配置、API实现等
- **步骤(Step)**: 每个阶段内的具体执行步骤，包含命令和代码示例
- **项目结构**: 当前或目标项目的文件结构
- **部署说明**: 如何在不同环境中部署和运行服务器
- **注意事项**: 开发和部署过程中需要注意的问题

### 特殊标记说明

本文档使用特殊标记来标识不同部分，便于 AI 助手理解和更新:

```
<!-- START_SECTION: SECTION_NAME -->
内容...
<!-- END_SECTION: SECTION_NAME -->
```

### 更新文档指令

当需要更新文档内容时，可以使用以下指令格式:

```
更新部分: [SECTION_NAME]
更改说明: [简要说明更改内容]
新内容:
[新的内容...]
```

例如:

```
更新部分: PROJECT_STRUCTURE
更改说明: 添加新的服务文件
新内容:
- src/services/market-sentiment.ts - 市场情绪分析服务
```

### 技术栈变更指令

当需要更改项目的技术栈时，可以使用以下指令:

```
技术栈变更: [当前技术栈] -> [新技术栈]
影响部分: [受影响的部分列表]
```

例如:

```
技术栈变更: TypeScript -> Python
影响部分: PROJECT_INTRODUCTION, PHASE_1, PHASE_2
```
<!-- END_SECTION: HOW_TO_USE -->

<!-- START_SECTION: PROJECT_STRUCTURE -->
## 项目结构

当前项目结构如下:

```
coinmarketcap-mcp-server/
├── src/
│   ├── index.ts                 # 主入口文件
│   ├── config/
│   │   └── config.ts            # 配置文件(API密钥等)
│   ├── services/
│   │   └── coinmarketcap.ts     # CoinMarketCap API调用逻辑
│   ├── types/
│   │   └── index.ts             # 类型定义
│   └── utils/
│       └── error-handler.ts     # 错误处理工具
├── .env                         # 环境变量(不纳入git)
├── .gitignore                   # Git忽略文件
├── package.json                 # 项目依赖
├── tsconfig.json                # TypeScript配置
├── implementation.md            # 实现文档
└── README.md                    # 项目说明
```

此结构可能随着项目的发展而变化。文档将随着结构变化相应更新。
<!-- END_SECTION: PROJECT_STRUCTURE -->

<!-- START_SECTION: IMPLEMENTATION_PHASES -->
## 实现阶段

本文档将 CoinMarketCap 恐惧与贪婪指数 MCP 服务器的实现分解为多个阶段（Phase），每个阶段包含独立的、原子级别的可执行步骤。

<!-- START_SECTION: PHASE_1 -->
## Phase 1: 项目初始化与环境配置

### Step 1.1: 创建项目目录结构
```bash
# 创建主项目目录
mkdir coinmarketcap-mcp-server
cd coinmarketcap-mcp-server

# 创建源代码目录
mkdir -p src/config src/services src/types src/utils
```

### Step 1.2: 初始化 npm 项目
```bash
# 初始化 package.json
npm init -y

# 编辑 package.json 添加项目信息
# 使用编辑器如 VS Code 或 vim 编辑 package.json
```

### Step 1.3: 安装核心依赖
```bash
# 安装生产依赖
npm install @modelcontextprotocol/sdk axios dotenv

# 安装开发依赖
npm install --save-dev typescript @types/node ts-node nodemon
```

### Step 1.4: 配置 TypeScript
```bash
# 创建 tsconfig.json 文件
npx tsc --init

# 编辑 tsconfig.json，配置如下内容
```

tsconfig.json 内容:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Step 1.5: 添加启动脚本
编辑 package.json，添加以下脚本：
```json
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js",
  "dev": "nodemon --exec ts-node src/index.ts"
}
```

### Step 1.6: 创建 .gitignore 文件
```bash
# 创建 .gitignore 文件
touch .gitignore

# 编辑 .gitignore 文件
```

.gitignore 内容:
```
node_modules/
dist/
.env
.DS_Store
*.log
```

### Step 1.7: 创建环境变量文件
```bash
# 创建 .env 文件
touch .env

# 编辑 .env 文件
```

.env 内容:
```
CMC_API_KEY=5b338a09-fe63-4cba-85fa-7228191c8de8
PORT=3000
```
<!-- END_SECTION: PHASE_1 -->

<!-- START_SECTION: PHASE_2 -->
## Phase 2: 类型定义与配置文件实现

### Step 2.1: 创建类型定义文件
```bash
# 创建类型定义文件
touch src/types/index.ts
```

编辑 src/types/index.ts：
```typescript
// Fear and Greed Index API response
export interface FearGreedResponse {
  status: {
    timestamp: string;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
  };
  data: FearGreedData[];
}

export interface FearGreedData {
  timestamp: string;
  value: number;
  value_classification: string;
}

// Parameters for the MCP tool
export interface FearGreedParams {
  start?: number;
  limit?: number;
}
```

### Step 2.2: 创建配置文件
```bash
# 创建配置文件
touch src/config/config.ts
```

编辑 src/config/config.ts：
```typescript
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// API configuration
export const COINMARKETCAP_API_KEY = process.env.CMC_API_KEY || '5b338a09-fe63-4cba-85fa-7228191c8de8';
export const FEAR_GREED_ENDPOINT = 'https://pro-api.coinmarketcap.com/v3/fear-and-greed/historical';

// Server configuration
export const PORT = parseInt(process.env.PORT || '3000', 10);
```

### Step 2.3: 创建错误处理工具
```bash
# 创建错误处理工具文件
touch src/utils/error-handler.ts
```

编辑 src/utils/error-handler.ts：
```typescript
/**
 * Format error message for consistent error reporting
 */
export function formatErrorMessage(error: any): string {
  if (error.response) {
    // API响应中包含错误信息
    const { status, data } = error.response;
    return `API Error (${status}): ${data.status?.error_message || JSON.stringify(data)}`;
  } else if (error.request) {
    // 请求已发送但没有收到响应
    return `No response received: ${error.message}`;
  } else {
    // 请求设置过程中发生错误
    return `Request error: ${error.message}`;
  }
}

/**
 * Log error details for debugging
 */
export function logError(context: string, error: any): void {
  console.error(`[ERROR] ${context}:`);
  
  if (error.response) {
    console.error(`Status: ${error.response.status}`);
    console.error(`Data:`, error.response.data);
  } else if (error.request) {
    console.error(`No response received:`, error.request);
  } else {
    console.error(`Error:`, error.message);
  }
  
  console.error(`Stack:`, error.stack);
}
```
<!-- END_SECTION: PHASE_2 -->

<!-- START_SECTION: PHASE_3 -->
## Phase 3: CoinMarketCap 服务实现

### Step 3.1: 创建 CoinMarketCap 服务文件
```bash
# 创建服务文件
touch src/services/coinmarketcap.ts
```

编辑 src/services/coinmarketcap.ts：
```typescript
import axios from 'axios';
import { COINMARKETCAP_API_KEY, FEAR_GREED_ENDPOINT } from '../config/config';
import { FearGreedParams, FearGreedResponse } from '../types';
import { formatErrorMessage, logError } from '../utils/error-handler';

/**
 * Fetches Fear and Greed Index data from CoinMarketCap API
 * @param params Query parameters
 * @returns Fear and Greed Index data
 */
export async function fetchFearGreedIndex(params: FearGreedParams): Promise<FearGreedResponse> {
  try {
    // Set up request configuration
    const config = {
      headers: {
        'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY,
        'Accept': 'application/json'
      },
      params: {
        start: params.start,
        limit: params.limit || 50
      }
    };

    // Make API request
    const response = await axios.get<FearGreedResponse>(FEAR_GREED_ENDPOINT, config);
    
    // Return response data
    return response.data;
  } catch (error: any) {
    // Log error for debugging
    logError('fetchFearGreedIndex', error);
    
    // Throw formatted error
    throw new Error(formatErrorMessage(error));
  }
}
```
<!-- END_SECTION: PHASE_3 -->

<!-- START_SECTION: PHASE_4 -->
## Phase 4: MCP 服务器实现

### Step 4.1: 创建主入口文件
```bash
# 创建主入口文件
touch src/index.ts
```

编辑 src/index.ts：
```typescript
import { MCPServer } from '@modelcontextprotocol/sdk';
import { fetchFearGreedIndex } from './services/coinmarketcap';
import { FearGreedParams } from './types';
import { PORT } from './config/config';

// Create MCP server instance
const server = new MCPServer();

// Define Fear and Greed Index tool
server.defineTool({
  name: 'get_fear_greed_index',
  description: 'Gets historical Fear and Greed Index data from CoinMarketCap',
  parameters: {
    type: 'object',
    properties: {
      start: {
        type: 'number',
        description: 'Starting point of data retrieval (optional)',
      },
      limit: {
        type: 'number',
        description: 'Number of records to return (default: 50, max: 100)',
      },
    },
    required: [],
  },
  handler: async (params: FearGreedParams) => {
    try {
      // Fetch data from CoinMarketCap
      const data = await fetchFearGreedIndex(params);
      
      // Return successful response
      return {
        type: 'success',
        data: data,
      };
    } catch (error: any) {
      // Return error response
      return {
        type: 'error',
        message: error.message,
      };
    }
  },
});

// Start the server
server.listen(PORT, () => {
  console.log(`MCP Server running on port ${PORT}`);
  console.log(`Tool available: get_fear_greed_index`);
});
```
<!-- END_SECTION: PHASE_4 -->

<!-- START_SECTION: PHASE_5 -->
## Phase 5: 测试与验证

### Step 5.1: 构建项目
```bash
# 构建项目
npm run build
```

### Step 5.2: 运行服务器
```bash
# 运行开发模式
npm run dev

# 或运行生产模式
npm run build
npm start
```

### Step 5.3: 手动测试
使用 cURL 或 Postman 测试 MCP 服务器：

```bash
# 使用 cURL 发送请求
curl -X POST http://localhost:3000/tools/get_fear_greed_index -H "Content-Type: application/json" -d '{"params":{"limit":10}}'
```
<!-- END_SECTION: PHASE_5 -->

<!-- START_SECTION: PHASE_6 -->
## Phase 6: 扩展与优化（可选）

### Step 6.1: 添加更多加密货币工具
```bash
# 创建新的服务文件
touch src/services/crypto-prices.ts
```

### Step 6.2: 实现缓存机制
```bash
# 安装 Redis 客户端 (可选)
npm install redis

# 创建缓存服务
mkdir -p src/services/cache
touch src/services/cache/index.ts
```

### Step 6.3: 添加日志系统
```bash
# 安装日志库
npm install winston

# 创建日志配置
touch src/utils/logger.ts
```

### Step 6.4: 添加监控和健康检查
```bash
# 安装 Express
npm install express
npm install --save-dev @types/express

# 创建健康检查路由
touch src/utils/health-check.ts
```
<!-- END_SECTION: PHASE_6 -->
<!-- END_SECTION: IMPLEMENTATION_PHASES -->

<!-- START_SECTION: DEPLOYMENT -->
## 部署说明

### 本地开发环境
1. 克隆仓库
2. 安装依赖：`npm install`
3. 创建 .env 文件并设置 API 密钥
4. 运行开发服务器：`npm run dev`

### 生产环境部署
1. 构建项目：`npm run build`
2. 确保 .env 文件正确配置
3. 使用 PM2 或类似工具启动：`pm2 start dist/index.js`
<!-- END_SECTION: DEPLOYMENT -->

<!-- START_SECTION: NOTES -->
## 注意事项

1. API 密钥安全：不要将 API 密钥硬编码或提交到版本控制系统中
2. 错误处理：确保所有异步操作都有适当的错误处理
3. 速率限制：CoinMarketCap API 有速率限制，考虑实现缓存以减少 API 调用
4. CORS：如果需要从浏览器访问，请确保正确配置 CORS 策略
<!-- END_SECTION: NOTES -->

<!-- START_SECTION: CHANGE_HISTORY -->
## 变更历史

| 日期 | 版本 | 描述 | 作者 |
|------|------|------|------|
| 2023-10-15 | 1.0 | 初始版本 | CursorAI |
| 2024-03-12 | 1.1 | 完成 Phase 1: 项目初始化与环境配置 | CursorAI |
| 2024-03-12 | 1.2 | 完成 Phase 2: 类型定义与配置文件实现 | CursorAI |
| 2024-03-12 | 1.3 | 完成 Phase 3: CoinMarketCap 服务实现 | CursorAI |
| 2024-03-12 | 1.4 | 完成 Phase 4: MCP 服务器实现 | CursorAI |
<!-- END_SECTION: CHANGE_HISTORY -->

<!-- START_SECTION: PROGRESS -->
## 项目进度

### ✅ Phase 1: 项目初始化与环境配置
- [x] Step 1.1: 创建项目目录结构
- [x] Step 1.2: 初始化 npm 项目
- [x] Step 1.3: 安装核心依赖
- [x] Step 1.4: 配置 TypeScript
- [x] Step 1.5: 添加启动脚本
- [x] Step 1.6: 创建 .gitignore 文件
- [x] Step 1.7: 创建环境变量文件

### ✅ Phase 2: 类型定义与配置文件实现
- [x] Step 2.1: 创建类型定义文件
- [x] Step 2.2: 创建配置文件
- [x] Step 2.3: 创建错误处理工具

### ✅ Phase 3: CoinMarketCap 服务实现
- [x] Step 3.1: 创建 CoinMarketCap 服务文件
- [x] Step 3.2: 实现 Fear and Greed Index 数据获取功能
- [x] Step 3.3: 添加参数验证

### ✅ Phase 4: MCP 服务器实现
- [x] Step 4.1: 创建主入口文件
- [x] Step 4.2: 配置 MCP 服务器
- [x] Step 4.3: 定义并实现工具

### ⏳ Phase 5: 测试与验证
- [ ] Step 5.1: 构建项目
- [ ] Step 5.2: 运行服务器
- [ ] Step 5.3: 手动测试

### 📝 Phase 6: 扩展与优化（可选）
<!-- END_SECTION: PROGRESS --> 