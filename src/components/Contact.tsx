import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Phone, Mail, MapPin, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { sendLeadNotification, sendLeadConfirmation } from "@/services/emailService";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    projectType: "",
    budget: "",
    timeframe: ""
  });
  
  const [errors, setErrors] = useState({
    phone: ""
  });
  
  const [phoneValid, setPhoneValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validatePhoneNumber = (phone: string) => {
    // Indian phone number validation: 10 digits, optionally with +91 prefix
    const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number before submission
    if (!validatePhoneNumber(formData.phone)) {
      setErrors({
        ...errors,
        phone: "Please enter a valid 10-digit Indian mobile number"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create a new lead object
      const newLead = {
        ...formData,
        id: Date.now(),
        date: new Date().toISOString(),
        status: "new"
      };

      // Store lead in localStorage
      const existingLeads = JSON.parse(localStorage.getItem("kvLeads") || "[]");
      localStorage.setItem("kvLeads", JSON.stringify([...existingLeads, newLead]));

      // Send email notifications
      const adminNotificationSent = await sendLeadNotification(newLead);
      const leadConfirmationSent = await sendLeadConfirmation(newLead);
      
      // Show appropriate success message
      if (adminNotificationSent && leadConfirmationSent) {
        toast({
          title: "Thank you for your interest!",
          description: "Our team will contact you within 24 hours to schedule your free consultation.",
        });
      } else {
        toast({
          title: "Form submitted successfully",
          description: "We've received your information and will be in touch soon.",
        });
        
        // Log email sending issues for debugging
        if (!adminNotificationSent) {
          console.warn("Failed to send admin notification email");
        }
        if (!leadConfirmationSent) {
          console.warn("Failed to send lead confirmation email");
        }
      }
      
      // Reset form
      setFormData({ name: "", email: "", phone: "", message: "", projectType: "", budget: "", timeframe: "" });
      setErrors({ phone: "" });
      setPhoneValid(false);
      
    } catch (error) {
      console.error('Error submitting lead:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Validate phone number as user types
    if (name === "phone") {
      const isValid = validatePhoneNumber(value);
      setPhoneValid(isValid);
      setErrors({
        ...errors,
        phone: isValid ? "" : "Please enter a valid 10-digit Indian mobile number"
      });
    }
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black from-blue-50 via-white to-blue-50 text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Let's Bring Your
            <br />
            <span className="text-muted-foreground">Vision to Life</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transform your architectural dreams into reality with our expert team.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-card dark:bg-gray-900/50 rounded-lg border border-border shadow-sm transition-colors duration-300">
                <MapPin className="text-muted-foreground mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold mb-2 text-foreground">Address</p>
                  <p className="text-muted-foreground leading-relaxed">
                    KV Associate<br />
                    N-10/79, B3, Kakarmataa, (New Colony)<br />
                    Opp. to Bangal Sweet House<br />
                    DLW-Lanka Road, Varanasi - 221004
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-6 bg-white dark:bg-gray-900/50 rounded-lg border border-blue-100 dark:border-border shadow-sm hover:border-blue-200 dark:hover:border-border transition-all duration-300">
                <Phone className="text-muted-foreground flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold mb-2 text-foreground">Phone</p>
                  <p className="text-muted-foreground">+91 9120333520</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-6 bg-white dark:bg-gray-900/50 rounded-lg border border-blue-100 dark:border-border shadow-sm hover:border-blue-200 dark:hover:border-border transition-all duration-300">
                <Mail className="text-muted-foreground flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold mb-2 text-foreground">Email</p>
                  <p className="text-muted-foreground">design@kvassociate.com, info@kvassociate.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-6 bg-card dark:bg-gray-900/50 rounded-lg border border-border shadow-sm transition-colors duration-300">
                <Clock className="text-muted-foreground mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold mb-2 text-foreground">Business Hours</p>
                  <p className="text-muted-foreground">Mon–Sat: 10:00 AM – 7:00 PM<br />Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Google Maps Section */}
            <div className="mt-8">
              <div className="relative w-full h-[300px] rounded-lg overflow-hidden shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.3015305271784!2d82.9639505!3d25.2854089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e33ef9b1f7e5d%3A0x7d1e86e0471cf44f!2sN-10%2F79%2C%20B3%2C%20Kakarmatta%2C%20Opp.%20to%20Bangal%20Sweet%20House%20DLW-Lanka%20Road%2C%20Varanasi%20-%20221004!5e0!3m2!1sen!2sin!4v1688641458899!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                  title="Our Office Location"
                />
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white dark:bg-card p-8 rounded-lg border border-blue-100 dark:border-border shadow-sm hover:border-blue-200 dark:hover:border-border transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-8">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-foreground mb-2 block">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-blue-50/50 dark:bg-muted border-blue-100 dark:border-input text-foreground focus:border-blue-200 dark:focus:border-foreground transition-colors duration-300"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-foreground mb-2 block">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-blue-50/50 dark:bg-muted border-blue-100 dark:border-input text-foreground focus:border-blue-200 dark:focus:border-foreground transition-colors duration-300"
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-foreground mb-2 flex items-center">
                  Phone <span className="text-red-500 ml-1">*</span>
                  <span className="ml-2 text-sm text-muted-foreground">(Required for site visits and consultations)</span>
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your 10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={`bg-blue-50/50 dark:bg-muted border-2 pl-10 ${phoneValid ? 'border-green-500 dark:border-green-500' : errors.phone ? 'border-red-500 dark:border-red-500' : 'border-blue-100 dark:border-input'} text-foreground focus:border-blue-200 dark:focus:border-foreground transition-colors duration-300`}
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  {phoneValid && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
                    >
                      <CheckCircle2 size={18} />
                    </motion.div>
                  )}
                </div>
                {errors.phone && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center"
                  >
                    <AlertCircle size={14} className="mr-1" /> {errors.phone}
                  </motion.p>
                )}
              </div>
              
              <div>
                <Label htmlFor="message" className="text-foreground mb-2 block">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="bg-blue-50/50 dark:bg-muted border-blue-100 dark:border-input text-foreground focus:border-blue-200 dark:focus:border-foreground transition-colors duration-300"
                />
              </div>

              <div>
                <Label htmlFor="projectType" className="text-foreground mb-2 block">Project Type</Label>
                <Select onValueChange={(value) => handleSelectChange(value, "projectType")}>
                  <SelectTrigger className="bg-blue-50/50 dark:bg-muted border-blue-100 dark:border-input text-foreground focus:border-blue-200 dark:focus:border-foreground transition-colors duration-300">
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
                <Label htmlFor="budget" className="text-foreground mb-2 block">Budget Range</Label>
                <Select onValueChange={(value) => handleSelectChange(value, "budget")}>
                  <SelectTrigger className="bg-blue-50/50 dark:bg-muted border-blue-100 dark:border-input text-foreground focus:border-blue-200 dark:focus:border-foreground transition-colors duration-300">
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
                <Label htmlFor="timeframe" className="text-foreground mb-2 block">Timeframe</Label>
                <Select onValueChange={(value) => handleSelectChange(value, "timeframe")}>
                  <SelectTrigger className="bg-blue-50/50 dark:bg-muted border-blue-100 dark:border-input text-foreground focus:border-blue-200 dark:focus:border-foreground transition-colors duration-300">
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
                disabled={!formData.name || !formData.email || !phoneValid || !formData.projectType || !formData.budget || !formData.timeframe || isLoading}
                className="w-full bg-blue-600 dark:bg-foreground text-white dark:text-background hover:bg-blue-700 dark:hover:bg-foreground/90 py-6 text-lg font-semibold rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : 'Send Message'}
              </Button>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                By submitting this form, you agree to be contacted via phone or email.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
