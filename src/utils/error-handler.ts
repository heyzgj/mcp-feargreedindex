/**
 * Format error message for consistent error reporting
 */
export function formatErrorMessage(error: any): string {
  if (error.response) {
    // API response contains error information
    const { status, data } = error.response;
    return `API Error (${status}): ${data.status?.error_message || JSON.stringify(data)}`;
  } else if (error.request) {
    // Request was made but no response received
    return `No response received: ${error.message}`;
  } else {
    // Error occurred during request setup
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