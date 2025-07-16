import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { CheckCircle2, Phone } from "lucide-react";
import { motion } from "framer-motion";

type LeadCaptureProps = {
  title?: string;
  subtitle?: string;
  offerText?: string;
  buttonText?: string;
  variant?: "default" | "minimal" | "popup";
  onClose?: () => void;
};

const LeadCapture = ({
  title = "Get Free Design Consultation",
  subtitle = "Our expert architects will help you bring your vision to life",
  offerText = "Get a free 30-minute consultation call with our senior architect",
  buttonText = "Request Consultation",
  variant = "default",
  onClose
}: LeadCaptureProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeframe: ""
  });
  
  const [phoneValid, setPhoneValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const validatePhoneNumber = (phone: string) => {
    // Indian phone number validation: 10 digits, optionally with +91 prefix
    const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Validate phone number as user types
    if (name === "phone") {
      const isValid = validatePhoneNumber(value);
      setPhoneValid(isValid);
    }
  };
  
  const handleSelectChange = (value: string, name: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send this data to your backend or a third-party service
    // For now, we'll just simulate a successful submission
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store lead in localStorage for demonstration purposes
      // In a real implementation, you would send this to your backend
      const existingLeads = JSON.parse(localStorage.getItem("kvLeads") || "[]");
      const newLead = {
        ...formData,
        id: Date.now(),
        date: new Date().toISOString(),
        status: "new"
      };
      
      localStorage.setItem("kvLeads", JSON.stringify([...existingLeads, newLead]));
      
      // Show success message
      toast({
        title: "Thank you for your interest!",
        description: "Our team will contact you within 24 hours to schedule your free consultation.",
      });
      
      setSubmitted(true);
      
      // Reset form after 3 seconds if it's a popup
      if (variant === "popup") {
        setTimeout(() => {
          if (onClose) onClose();
        }, 3000);
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className={`text-center p-6 ${variant === "popup" ? "bg-white dark:bg-gray-900 rounded-lg shadow-lg" : ""}`}>
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
        <p className="text-muted-foreground mb-4">
          Our team will contact you within 24 hours to schedule your free consultation.
        </p>
        {variant === "popup" && onClose && (
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={`
      ${variant === "default" ? "bg-white dark:bg-card p-8 rounded-lg border border-blue-100 dark:border-border shadow-lg" : ""}
      ${variant === "popup" ? "bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl max-w-md w-full" : ""}
    `}>
      {variant === "popup" && onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          &times;
        </button>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      
      <div className={`${variant !== "minimal" ? "bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6" : "mb-6"}`}>
        <p className="text-center font-medium">
          {offerText}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1"
            placeholder="Your name"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1"
            placeholder="your.email@example.com"
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              className={`mt-1 pl-10 ${phoneValid ? 'border-green-500' : ''}`}
              placeholder="Your 10-digit mobile number"
            />
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          </div>
        </div>
        
        <div>
          <Label htmlFor="projectType">Project Type</Label>
          <Select onValueChange={(value) => handleSelectChange(value, "projectType")}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential Design</SelectItem>
              <SelectItem value="commercial">Commercial Design</SelectItem>
              <SelectItem value="interior">Interior Design</SelectItem>
              <SelectItem value="renovation">Renovation</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="budget">Budget Range</Label>
          <Select onValueChange={(value) => handleSelectChange(value, "budget")}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="below-5L">Below ₹5 Lakhs</SelectItem>
              <SelectItem value="5L-10L">₹5 Lakhs - ₹10 Lakhs</SelectItem>
              <SelectItem value="10L-25L">₹10 Lakhs - ₹25 Lakhs</SelectItem>
              <SelectItem value="25L-50L">₹25 Lakhs - ₹50 Lakhs</SelectItem>
              <SelectItem value="above-50L">Above ₹50 Lakhs</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="timeframe">Timeframe</Label>
          <Select onValueChange={(value) => handleSelectChange(value, "timeframe")}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="When do you want to start?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediately">Immediately</SelectItem>
              <SelectItem value="1-3-months">1-3 Months</SelectItem>
              <SelectItem value="3-6-months">3-6 Months</SelectItem>
              <SelectItem value="6-12-months">6-12 Months</SelectItem>
              <SelectItem value="planning">Just Planning</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600 py-3 text-lg font-semibold rounded-lg transition-colors duration-300"
          disabled={!formData.name || !formData.email || !phoneValid}
        >
          {buttonText}
        </Button>
        
        <p className="text-xs text-center text-muted-foreground mt-4">
          By submitting this form, you agree to be contacted by our team. 
          We respect your privacy and will not share your information.
        </p>
      </form>
    </div>
  );
};

export default LeadCapture;
