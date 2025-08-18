interface LeadData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeframe: string;
  date?: string;
  status?: string;
}

// Email configuration
const EMAIL_CONFIG = {
  adminEmail: "kvassociatemarketing@gmail.com",
  forwardEmail: "kvassociateblw@gmail.com"
};

// API URL for the email service - dynamically set based on environment
// For production: Nginx routes /api/* to the backend server with path rewriting
// For local: Direct connection to the API server
export const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3001/api'
  : 'https://kvassociate.in/api'; // Using the main domain with HTTPS for production

/**
 * Send a notification email to the admin when a new lead is captured
 * @param leadData Lead information submitted by the user
 * @returns Promise that resolves when email is sent
 */
export const sendLeadNotification = async (leadData: LeadData): Promise<boolean> => {
  try {
    // Add timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    let response: Response | null = null;
    
    try {
      response = await fetch(`${API_URL}/send-lead-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...leadData,
          adminEmail: EMAIL_CONFIG.adminEmail,
          forwardEmail: EMAIL_CONFIG.forwardEmail
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        console.info('API request timed out - storing lead in localStorage for later submission');
        // Store the lead in localStorage for later submission attempts
        const pendingLeads = JSON.parse(localStorage.getItem('kvPendingLeads') || '[]');
        pendingLeads.push({
          type: 'notification',
          data: leadData,
          timestamp: Date.now()
        });
        localStorage.setItem('kvPendingLeads', JSON.stringify(pendingLeads));
        
        // Return true since we've handled the error by storing in localStorage
        return true;
      }
      throw error;
    }

    if (!response || !response.ok) {
      if (response) {
        const errorText = await response.text();
        console.error('Server responded with status:', response.status, 'Response:', errorText);
        
        // Handle specific error codes
        if (response.status === 504) {
          console.warn('Gateway timeout - storing lead in localStorage for later submission');
          // Store the lead in localStorage for later submission attempts
          const pendingLeads = JSON.parse(localStorage.getItem('kvPendingLeads') || '[]');
          pendingLeads.push({
            type: 'notification',
            data: leadData,
            timestamp: Date.now()
          });
          localStorage.setItem('kvPendingLeads', JSON.stringify(pendingLeads));
          return true; // Return true to prevent showing error to user
        }
        
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return false;
    }

    const result = await response.json();
    return result.success === true;
  } catch (error: any) {
    console.error('Error in sendLeadNotification:', error);
    // Return true if we've handled the error by storing in localStorage
    return Boolean(error.message === 'Request timed out' || localStorage.getItem('kvPendingLeads'));
  }
};

/**
 * Send a confirmation email to the lead
 * @param leadData Lead information submitted by the user
 * @returns Promise that resolves when email is sent
 */
export const sendLeadConfirmation = async (leadData: LeadData): Promise<boolean> => {
  try {
    // Add timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    let response: Response | null = null;
    
    try {
      response = await fetch(`${API_URL}/send-lead-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        console.info('API request timed out - storing lead confirmation in localStorage for later submission');
        // Store the lead confirmation in localStorage for later submission attempts
        const pendingLeads = JSON.parse(localStorage.getItem('kvPendingLeads') || '[]');
        pendingLeads.push({
          type: 'confirmation',
          data: leadData,
          timestamp: Date.now()
        });
        localStorage.setItem('kvPendingLeads', JSON.stringify(pendingLeads));
        
        // Return true since we've handled the error by storing in localStorage
        return true;
      }
      throw error;
    }

    if (!response || !response.ok) {
      if (response) {
        const errorText = await response.text();
        console.error('Server responded with status:', response.status, 'Response:', errorText);
        
        // Handle specific error codes
        if (response.status === 504) {
          console.info('Gateway timeout - storing lead confirmation in localStorage for later submission');
          // Store the lead in localStorage for later submission attempts
          const pendingLeads = JSON.parse(localStorage.getItem('kvPendingLeads') || '[]');
          pendingLeads.push({
            type: 'confirmation',
            data: leadData,
            timestamp: Date.now()
          });
          localStorage.setItem('kvPendingLeads', JSON.stringify(pendingLeads));
          return true; // Return true to prevent showing error to user
        }
        
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return false;
    }

    const result = await response.json();
    return result.success === true;
  } catch (error: any) {
    console.error('Error in sendLeadConfirmation:', error);
    // Return true if we've handled the error by storing in localStorage
    return Boolean(error.message === 'Request timed out' || localStorage.getItem('kvPendingLeads'));
  }
};

// Note: Formatting functions are now handled on the server side

/**
 * Updates the email configuration for lead notifications
 * @param config New email configuration
 */
export const updateEmailConfig = (config: { adminEmail?: string; forwardEmail?: string }) => {
  if (config.adminEmail) EMAIL_CONFIG.adminEmail = config.adminEmail;
  if (config.forwardEmail) EMAIL_CONFIG.forwardEmail = config.forwardEmail;
  
  console.log('Email configuration updated:', EMAIL_CONFIG);
  return EMAIL_CONFIG;
};
