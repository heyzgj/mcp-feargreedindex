/**
 * Formats error messages for consistent output
 * @param error The error object
 * @returns Formatted error message string
 */
export function formatErrorMessage(error: any): string {
  // If it's an Axios error with a response
  if (error.response) {
    const { status, data } = error.response;
    
    // Format API errors
    if (status === 401) {
      return `API Error (${status}): API key missing or invalid`;
    } else if (status === 429) {
      return `API Error (${status}): Rate limit exceeded`;
    } else if (status >= 500) {
      return `API Error (${status}): Server error`;
    }
    
    // Return error message from API if available
    const errorMessage = data.status?.error_message || JSON.stringify(data);
    return `API Error (${status}): ${errorMessage}`;
  }
  
  // For connection errors
  if (error.code === 'ECONNREFUSED') {
    return 'Connection refused. API server may be down.';
  }
  
  // For request timeout
  if (error.code === 'ETIMEDOUT') {
    return 'Request timed out. Please try again later.';
  }
  
  // For network errors
  if (error.message && error.message.includes('Network Error')) {
    return 'Network error. Please check your internet connection.';
  }
  
  // Default error message
  return error.message || 'An unknown error occurred';
}

/**
 * Logs errors with detailed information for debugging
 * @param source Source of the error
 * @param error The error object
 */
export function logError(source: string, error: any): void {
  console.error(`[ERROR] ${source}:`, error.message);
  
  // Log additional details for API errors
  if (error.response) {
    console.error('Status:', error.response.status);
    console.error('Headers:', error.response.headers);
    console.error('Data:', JSON.stringify(error.response.data, null, 2));
  }
  
  // Log request details if available
  if (error.config) {
    console.error('Request URL:', error.config.url);
    console.error('Request Method:', error.config.method);
    
    // Log parameters but mask sensitive data
    if (error.config.params) {
      console.error('Request Params:', error.config.params);
    }
    
    // Don't log full headers as they may contain API keys
    if (error.config.headers) {
      const safeHeaders = { ...error.config.headers };
      if (safeHeaders['X-CMC_PRO_API_KEY']) {
        safeHeaders['X-CMC_PRO_API_KEY'] = '****';
      }
      console.error('Request Headers:', safeHeaders);
    }
  }
}


