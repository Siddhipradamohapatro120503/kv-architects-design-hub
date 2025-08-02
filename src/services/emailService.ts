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
const API_URL = 'http://13.233.38.140:3001'; // Direct IP with port for API server

/**
 * Send a notification email to the admin when a new lead is captured
 * @param leadData Lead information submitted by the user
 * @returns Promise that resolves when email is sent
 */
export const sendLeadNotification = async (leadData: LeadData): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/api/send-lead-notification`, {
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
    const response = await fetch(`${API_URL}/api/send-lead-confirmation`, {
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
