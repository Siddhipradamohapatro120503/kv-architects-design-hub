import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { retryPendingLeads, getPendingLeadCount } from './services/retryService'

// Attempt to retry any pending lead submissions after the app loads
window.addEventListener('load', () => {
  // Wait a bit to ensure the app is fully loaded
  setTimeout(async () => {
    const pendingCount = getPendingLeadCount();
    if (pendingCount > 0) {
      console.log(`Found ${pendingCount} pending lead submissions. Attempting to retry...`);
      const successCount = await retryPendingLeads();
      console.log(`Successfully retried ${successCount} of ${pendingCount} pending submissions`);
    }
  }, 3000); // Wait 3 seconds after load
});

createRoot(document.getElementById("root")!).render(<App />);
