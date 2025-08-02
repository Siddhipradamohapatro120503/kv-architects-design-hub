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

// API URL for the email service
// Use the full EC2 instance URL for production with HTTP
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001/api' 
  : 'http://kvassociate.in:3001/api';

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
      body: JSON.stringify(leadData),
    });

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error sending admin notification:', error);
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

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error sending lead confirmation:', error);
    return false;
  }
};

// Note: Formatting functions are now handled on the server side
