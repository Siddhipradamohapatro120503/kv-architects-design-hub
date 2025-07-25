import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Download, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface LeadMagnetProps {
  title: string;
  description: string;
  imageUrl: string;
  downloadUrl: string;
  resourceName: string;
  className?: string;
}

const LeadMagnet = ({
  title,
  description,
  imageUrl,
  downloadUrl,
  resourceName,
  className = "",
}: LeadMagnetProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would typically send this data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store lead in localStorage for demonstration
      const existingLeads = JSON.parse(localStorage.getItem("kvLeads") || "[]");
      const newLead = {
        id: Date.now(),
        name,
        email,
        phone: "", // Not collected in this form
        projectType: "lead_magnet",
        budget: "",
        timeframe: "",
        date: new Date().toISOString(),
        status: "new",
        source: `Lead Magnet: ${resourceName}`
      };
      
      localStorage.setItem("kvLeads", JSON.stringify([...existingLeads, newLead]));
      
      setSubmitted(true);
      toast({
        title: "Success!",
        description: `Your ${resourceName} is ready to download.`,
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="grid md:grid-cols-2">
        {/* Image Section */}
        <div className="relative h-48 md:h-full">
          <img 
            src={imageUrl} 
            alt={resourceName}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-blue-900/80 mix-blend-multiply" />
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="text-white text-center">
              <h3 className="text-xl md:text-2xl font-bold mb-2">{resourceName}</h3>
              <p className="text-sm md:text-base text-blue-100">Download our exclusive resource</p>
            </div>
          </div>
        </div>
        
        {/* Form Section */}
        <div className="p-6 md:p-8">
          {!submitted ? (
            <>
              <h4 className="text-xl font-bold mb-2">{title}</h4>
              <p className="text-muted-foreground mb-6">{description}</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label className="ml-1" htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div>
                  <Label className="ml-1" htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Processing...
                    </span>
                  ) : (
                    "Download"
                  )}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  We respect your privacy and will not share your information.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
              </motion.div>
              
              <h4 className="text-xl font-bold mb-2">Thank You!</h4>
              <p className="text-muted-foreground mb-6">
                Your {resourceName} is ready to download.
              </p>
              
              <a 
                href={downloadUrl}
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                onClick={() => {
                  // In a real implementation, you might track downloads here
                }}
              >
                <Download size={16} />
                Download Now
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadMagnet;
