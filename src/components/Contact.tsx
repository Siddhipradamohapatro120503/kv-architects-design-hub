import { useState, useEffect } from "react";
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
  const [userLocation, setUserLocation] = useState<{lat: number | null, lng: number | null, city?: string, region?: string, country?: string}>({ lat: null, lng: null });
  const [locationError, setLocationError] = useState<string | null>(null);
  const { toast } = useToast();

  // Get user's location when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation(prev => ({ ...prev, lat: latitude, lng: longitude }));
          
          // Reverse geocoding to get location details
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
            );
            const data = await response.json();
            if (data.address) {
              setUserLocation(prev => ({
                ...prev,
                city: data.address.city || data.address.town || data.address.village,
                region: data.address.state,
                country: data.address.country
              }));
            }
          } catch (error) {
            console.error('Error getting location details:', error);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Could not determine your location. Please enable location services for better assistance.');
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
    }
  }, []);

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
    
    // Request location permission if not already granted
    if (!userLocation.lat || !userLocation.lng) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          });
        });
        
        const { latitude, longitude } = position.coords;
        setUserLocation(prev => ({ ...prev, lat: latitude, lng: longitude }));
      } catch (error) {
        console.error('Error getting location:', error);
        // Continue with form submission even if location fails
      }
    }
    
    setIsLoading(true);
    
    try {
      // Create a new lead object with location data
      const newLead = {
        ...formData,
        id: Date.now(),
        date: new Date().toISOString(),
        status: "new",
        location: userLocation.lat && userLocation.lng ? {
          coordinates: {
            lat: userLocation.lat,
            lng: userLocation.lng
          },
          city: userLocation.city,
          region: userLocation.region,
          country: userLocation.country,
          timestamp: new Date().toISOString()
        } : null
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
            {locationError && (
              <div className="p-4 mb-6 text-sm text-yellow-700 bg-yellow-50 rounded-lg dark:bg-yellow-900/30 dark:text-yellow-300 flex items-start">
                <AlertCircle className="flex-shrink-0 mt-0.5 mr-2" size={16} />
                <span>{locationError}</span>
              </div>
            )}
            
            {userLocation.lat && userLocation.lng && (
              <div className="p-4 mb-6 text-sm text-green-700 bg-green-50 rounded-lg dark:bg-green-900/30 dark:text-green-300 flex items-start">
                <CheckCircle2 className="flex-shrink-0 mt-0.5 mr-2" size={16} />
                <div>
                  <p className="font-medium">Location Detected</p>
                  {userLocation.city && userLocation.region && (
                    <p className="mt-1">{userLocation.city}, {userLocation.region}, {userLocation.country}</p>
                  )}
                  <p className="text-xs opacity-75 mt-1">We'll use this to provide better service</p>
                </div>
              </div>
            )}
            
            <div className="space-y-6">
              {/* Main Office - KV Associate */}
              <motion.div 
                className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 rounded-xl border-2 border-primary/20 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <div className="bg-primary text-black px-3 py-1 rounded-full text-xs font-semibold">
                    Main Office
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="text-primary mt-1 flex-shrink-0" size={24} />
                  <div className="flex-1">
                    <p className="font-bold text-lg mb-2 text-foreground">KV Associate</p>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      Bhagwati Complex, Near to BOB ATM<br />
                      Grand Trunk Rd, Mirzamurad, Gaur<br />
                      Uttar Pradesh – 221307
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <a 
                        href="tel:08449299109"
                        className="flex items-center space-x-1 bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-sm transition-colors duration-300"
                      >
                        <Phone size={14} />
                        <span>08449299109</span>
                      </a>
                      <a 
                        href="tel:09120333520"
                        className="flex items-center space-x-1 bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-sm transition-colors duration-300"
                      >
                        <Phone size={14} />
                        <span>09120333520</span>
                      </a>
                    </div>
                    <a 
                      href="https://www.kvassociate.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-300"
                    >
                      <span>🌐</span>
                      <span>www.kvassociate.in</span>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* DLW-Lanka Office */}
              <motion.div 
                className="p-6 bg-card dark:bg-gray-900/50 rounded-xl border-2 border-border hover:border-primary/30 shadow-md hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <div className="bg-muted text-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    Branch Office
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="text-muted-foreground mt-1 flex-shrink-0" size={24} />
                  <div className="flex-1">
                    <p className="font-bold text-lg mb-2 text-foreground">DLW-Lanka Office</p>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      N-10/79, B3, Kakarmatta (New Colony)<br />
                      Opp. to Bangal Sweet House<br />
                      DLW-Lanka Road, Varanasi – 221004
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a 
                        href="tel:09120333520"
                        className="flex items-center space-x-1 bg-muted hover:bg-muted/80 text-foreground px-3 py-1.5 rounded-lg text-sm transition-colors duration-300"
                      >
                        <Phone size={14} />
                        <span>09120333520</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* BHU Area Office */}
              <motion.div 
                className="p-6 bg-card dark:bg-gray-900/50 rounded-xl border-2 border-border hover:border-primary/30 shadow-md hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <div className="bg-muted text-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    Branch Office
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="text-muted-foreground mt-1 flex-shrink-0" size={24} />
                  <div className="flex-1">
                    <p className="font-bold text-lg mb-2 text-foreground">BHU Area Office</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Malhiya, Ramna, BHU<br />
                      Varanasi, Uttar Pradesh – 221005
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <div className="flex items-center space-x-4 p-6 bg-white dark:bg-gray-900/50 rounded-lg border border-blue-100 dark:border-border shadow-sm hover:border-blue-200 dark:hover:border-border transition-all duration-300">
                <Mail className="text-muted-foreground flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold mb-2 text-foreground">Email</p>
                  <p className="text-muted-foreground">info@kvarchitects.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-6 bg-card dark:bg-gray-900/50 rounded-lg border border-border shadow-sm transition-colors duration-300">
                <Clock className="text-muted-foreground mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold mb-2 text-foreground">Business Hours</p>
                  <p className="text-muted-foreground">Mon–Sat: 10:00 AM – 7:00 PM<br />Sunday: Closed</p>
                </div>
              </div>

              {/* Google Maps Section */}
              <div className="mt-8">
                <div className="relative w-full h-[300px] rounded-lg overflow-hidden shadow-xl">
                  {/* Enhanced Location Tag - Light Theme */}
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-3 rounded-lg flex flex-col space-y-1 shadow-lg backdrop-blur-sm border border-white/10 max-w-[280px] dark:hidden">
                    <div className="flex items-center space-x-2">
                      <div className="bg-white/20 p-1.5 rounded-full">
                        <MapPin size={18} className="text-white" />
                      </div>
                      <span className="font-semibold text-sm">KV Associate</span>
                    </div>
                    <div className="pl-9 text-xs text-white/90">
                      <p>Bhagwati Complex, Near BOB ATM</p>
                      <p>Grand Trunk Rd, Mirzamurad, Gaur</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-1 pl-9">
                      <div className="flex items-center space-x-1 bg-white/20 px-2 py-0.5 rounded-full">
                        <Phone size={10} />
                        <span className="text-xs">08449299109</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-white/20 px-2 py-0.5 rounded-full">
                        <Clock size={10} />
                        <span className="text-xs">10AM-7PM</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Location Tag - Dark Theme */}
                  <div className="absolute top-4 left-4 z-10 bg-gray-800 text-white px-4 py-3 rounded-lg flex flex-col space-y-1 shadow-lg backdrop-blur-sm border border-white/20 max-w-[280px] hidden dark:flex dark:flex-col">
                    <div className="flex items-center space-x-2">
                      <div className="bg-white/30 p-1.5 rounded-full">
                        <MapPin size={18} className="text-white" />
                      </div>
                      <span className="font-semibold text-sm text-white">KV Associate</span>
                    </div>
                    <div className="pl-9 text-xs text-white">
                      <p>Bhagwati Complex, Near BOB ATM</p>
                      <p>Grand Trunk Rd, Mirzamurad, Gaur</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-1 pl-9">
                      <div className="flex items-center space-x-1 bg-white/30 px-2 py-0.5 rounded-full">
                        <Phone size={10} className="text-white" />
                        <span className="text-xs text-white">08449299109</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-white/30 px-2 py-0.5 rounded-full">
                        <Clock size={10} className="text-white" />
                        <span className="text-xs text-white">10AM-7PM</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Get Directions Button - Light Theme */}
                  <a 
                    href="https://www.google.com/maps/dir//Bhagwati+Complex,+Near+to+BOB+ATM,+Grand+Trunk+Rd,+Mirzamurad,+Gaur,+Uttar+Pradesh+221307"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 z-10 bg-white text-primary px-3 py-2 rounded-md flex items-center space-x-2 shadow-lg hover:bg-gray-100 transition-colors duration-300 border border-transparent dark:hidden"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-navigation">
                      <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                    </svg>
                    <span className="font-medium text-sm">Get Directions</span>
                  </a>
                  
                  {/* Get Directions Button - Dark Theme */}
                  <a 
                    href="https://www.google.com/maps/dir//Bhagwati+Complex,+Near+to+BOB+ATM,+Grand+Trunk+Rd,+Mirzamurad,+Gaur,+Uttar+Pradesh+221307"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 z-10 bg-gray-800 text-white px-3 py-2 rounded-md hidden dark:flex items-center space-x-2 shadow-lg hover:bg-gray-700 transition-colors duration-300 border border-white/20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-navigation">
                      <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                    </svg>
                    <span className="font-medium text-sm">Get Directions</span>
                  </a>
                  
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.3015305271784!2d82.9639505!3d25.2854089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE3JzA3LjUiTiA4MsKwNTcnNTAuMiJF!5e0!3m2!1sen!2sin!4v1688641458899!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                    title="KV Associate - Main Office Location"
                  />
                </div>
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
