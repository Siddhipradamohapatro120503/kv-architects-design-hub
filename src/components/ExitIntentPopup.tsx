import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LeadCapture from "./LeadCapture";

const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const scrollDepthRef = useRef(0);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Check if the popup has been shown recently (in the last 2 minutes)
    const lastShownTime = localStorage.getItem("leadPopupLastShown");
    const currentTime = new Date().getTime();
    
    if (lastShownTime) {
      const timeSinceLastShown = currentTime - parseInt(lastShownTime);
      // Only skip if shown in the last 2 minutes (120000 ms) - more aggressive
      if (timeSinceLastShown < 120000 && hasTriggered) return;
    }
    
    // Function to detect when the user is about to leave the page
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if the mouse leaves from the top of the page
      if (e.clientY <= 0 && !hasTriggered) {
        triggerPopup();
      }
    };
    
    // Function to handle scroll events - ultra aggressive
    const handleScroll = () => {
      // Get scroll position
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // Calculate scroll percentage
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      
      // Update the maximum scroll depth reached
      if (scrollPercentage > scrollDepthRef.current) {
        scrollDepthRef.current = scrollPercentage;
      }
      
      // Clear previous timer
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
      
      // Set new timer - will trigger popup if user stops scrolling
      scrollTimerRef.current = setTimeout(() => {
        // Ultra aggressive - trigger at just 15% scroll depth
        if (scrollDepthRef.current > 15 && !hasTriggered) {
          triggerPopup();
        }
      }, 500); // Just 0.5 seconds of inactivity - ultra aggressive
    };
    
    // Function to trigger popup
    const triggerPopup = () => {
      setIsOpen(true);
      setHasTriggered(true);
      // Store the current timestamp instead of just a boolean
      localStorage.setItem("leadPopupLastShown", new Date().getTime().toString());
    };
    
    // Minimal delay before enabling detection - ultra aggressive
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("scroll", handleScroll);
    }, 1000); // Just 1 second delay - ultra aggressive
    
    // Mouse movement tracking for additional trigger opportunities
    const handleMouseMove = (e: MouseEvent) => {
      // Track if mouse is in the top 20% of the screen
      if (e.clientY < window.innerHeight * 0.2 && !hasTriggered) {
        // 10% chance of triggering on any mouse movement in top area
        if (Math.random() < 0.1) {
          triggerPopup();
        }
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    
    // Additional timer to show popup after a very short time
    const autoShowTimer = setTimeout(() => {
      if (!hasTriggered) {
        triggerPopup();
      }
    }, 8000); // Auto-show after just 8 seconds - ultra aggressive
    
    // Add click tracking to potentially trigger popup
    const handleClick = () => {
      // 15% chance of triggering on any click if not already triggered
      if (!hasTriggered && Math.random() < 0.15) {
        triggerPopup();
      }
    };
    document.addEventListener("click", handleClick);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(autoShowTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, [hasTriggered]);
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md p-0 border-0 bg-transparent shadow-none">
        <LeadCapture 
          title="Wait! Don't Miss This Opportunity"
          subtitle="Get expert architectural advice for your project"
          offerText="Schedule a free consultation call with our senior architect"
          buttonText="Get Free Consultation"
          variant="popup"
          onClose={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
