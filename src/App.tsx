import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ServicesPage from "./pages/ServicesPage";
import StudioPage from "./pages/StudioPage";
import AboutPage from "./pages/AboutPage";
import LeadManagement from "./pages/LeadManagement";
import ServicesOffered from "./components/ServicesOffered";
import Layout from "./components/Layout";
import Contact from "./components/Contact";
import FloatingContact from "./components/FloatingContact";

const queryClient = new QueryClient();

// Component to conditionally render FloatingContact based on current route
const FloatingContactWrapper = () => {
  const location = useLocation();
  const showFloatingContact = ["/about", "/services", "/studio", "/contact"].includes(location.pathname);
  
  return showFloatingContact ? <FloatingContact /> : null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/studio" element={<StudioPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/leads" element={<LeadManagement />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <FloatingContactWrapper />
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
