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
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3001/api'
  : 'https://kvassociate.in/api'; // Using the main domain with HTTPS for production

/**
 * Send a notification email to the admin when a new lead is captured
 * @param leadData Lead information submitted by the user
 * @returns Promise that resolves when email is sent
 */
export const sendLeadNotification = async (leadData: LeadData): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/send-lead-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...leadData,
        adminEmail: EMAIL_CONFIG.adminEmail,
        forwardEmail: EMAIL_CONFIG.forwardEmail
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server responded with status:', response.status, 'Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error in sendLeadNotification:', error);
    return false;
  }
};

/**
 * Send a confirmation email to the lead
 * @param leadData Lead information submitted by the user
 * @returns Promise that resolves when email is sent
 */
export const sendLeadConfirmation = async (leadData: LeadData): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/send-lead-confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server responded with status:', response.status, 'Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error in sendLeadConfirmation:', error);
    return false;
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
