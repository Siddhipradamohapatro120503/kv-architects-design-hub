import { sendLeadNotification, sendLeadConfirmation } from './emailService';

interface PendingLead {
  type: 'notification' | 'confirmation';
  data: any;
  timestamp: number;
}

/**
 * Attempts to resend any pending leads that failed due to timeouts or server errors
 * @returns Promise that resolves with the number of successfully retried submissions
 */
export const retryPendingLeads = async (): Promise<number> => {
  try {
    // Get pending leads from localStorage
    const pendingLeads: PendingLead[] = JSON.parse(localStorage.getItem('kvPendingLeads') || '[]');
    
    if (pendingLeads.length === 0) {
      return 0;
    }
    
    console.log(`Attempting to retry ${pendingLeads.length} pending lead submissions...`);
    
    let successCount = 0;
    const remainingLeads: PendingLead[] = [];
    
    // Process each pending lead
    for (const lead of pendingLeads) {
      try {
        let success = false;
        
        // Attempt to send based on the lead type
        if (lead.type === 'notification') {
          success = await sendLeadNotification(lead.data);
        } else if (lead.type === 'confirmation') {
          success = await sendLeadConfirmation(lead.data);
        }
        
        if (success) {
          successCount++;
          console.log(`Successfully retried ${lead.type} submission from ${new Date(lead.timestamp).toLocaleString()}`);
        } else {
          // If still failing, keep in the pending list but only if less than 7 days old
          const ageInDays = (Date.now() - lead.timestamp) / (1000 * 60 * 60 * 24);
          if (ageInDays < 7) {
            remainingLeads.push(lead);
          } else {
            console.warn(`Discarding old ${lead.type} submission from ${new Date(lead.timestamp).toLocaleString()}`);
          }
        }
      } catch (error) {
        console.error(`Error retrying ${lead.type} submission:`, error);
        // Keep in the pending list but only if less than 7 days old
        const ageInDays = (Date.now() - lead.timestamp) / (1000 * 60 * 60 * 24);
        if (ageInDays < 7) {
          remainingLeads.push(lead);
        }
      }
    }
    
    // Update localStorage with remaining leads
    localStorage.setItem('kvPendingLeads', JSON.stringify(remainingLeads));
    
    console.log(`Retry complete: ${successCount} succeeded, ${remainingLeads.length} still pending`);
    return successCount;
  } catch (error) {
    console.error('Error in retryPendingLeads:', error);
    return 0;
  }
};

/**
 * Gets the count of pending lead submissions
 * @returns The number of pending lead submissions
 */
export const getPendingLeadCount = (): number => {
  try {
    const pendingLeads = JSON.parse(localStorage.getItem('kvPendingLeads') || '[]');
    return pendingLeads.length;
  } catch (error) {
    console.error('Error getting pending lead count:', error);
    return 0;
  }
};
