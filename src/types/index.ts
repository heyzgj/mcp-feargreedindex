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
  time_until_update?: string;
}

// Parameters for the MCP tool
export interface FearGreedParams {
  start?: number;
  limit?: number;
} 