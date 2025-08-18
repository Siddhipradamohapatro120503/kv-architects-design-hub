import { API_URL } from './emailService';

/**
 * Interface for API status check result
 */
interface ApiStatusResult {
  isAvailable: boolean;
  responseTime?: number;
  message: string;
  timestamp: string;
}

/**
 * Checks if the API server is available and responding
 * @returns Promise that resolves with API status information
 */
export const checkApiStatus = async (): Promise<ApiStatusResult> => {
  const startTime = performance.now();
  
  try {
    // Use the test endpoint to check API availability
    const response = await fetch(`${API_URL}/test`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Set a short timeout for the status check
      signal: AbortSignal.timeout(5000)
    });

    const responseTime = Math.round(performance.now() - startTime);
    
    if (!response.ok) {
      return {
        isAvailable: false,
        responseTime,
        message: `API server returned error: ${response.status} ${response.statusText}`,
        timestamp: new Date().toISOString()
      };
    }
    
    const data = await response.json();
    
    return {
      isAvailable: true,
      responseTime,
      message: `API server is available (${data.status})`,
      timestamp: data.timestamp || new Date().toISOString()
    };
  } catch (error) {
    const responseTime = Math.round(performance.now() - startTime);
    
    // Determine the specific error type
    let errorMessage = 'Unknown error occurred';
    
    if (error instanceof TypeError && error.message.includes('NetworkError')) {
      errorMessage = 'Network error - API server may be unreachable';
    } else if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      errorMessage = 'Failed to connect to API server - check server status';
    } else if (error instanceof DOMException && error.name === 'AbortError') {
      errorMessage = 'Connection timed out - API server is slow or unreachable';
    } else if (error instanceof Error) {
      errorMessage = `Error: ${error.message}`;
    }
    
    return {
      isAvailable: false,
      responseTime,
      message: errorMessage,
      timestamp: new Date().toISOString()
    };
  }
};

/**
 * Exports the API_URL for use in other services
 */
export { API_URL };
