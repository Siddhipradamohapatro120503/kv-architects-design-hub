
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Phone, Mail } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-blue-400 mr-4 mt-1">📍</div>
                  <div>
                    <p className="font-semibold">Address:</p>
                    <p className="text-gray-300">KV Architects & Design Solutions</p>
                    <p className="text-gray-300">Office No. 7, 2nd Floor, Shubham Complex,</p>
                    <p className="text-gray-300">Opp. Bombay Motor Circle, Jodhpur - 342001</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="text-blue-400 mr-4" size={20} />
                  <div>
                    <p className="font-semibold">Phone:</p>
                    <p className="text-gray-300">+91-98290XXXXX</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="text-blue-400 mr-4" size={20} />
                  <div>
                    <p className="font-semibold">Email:</p>
                    <p className="text-gray-300">kvarchjodhpur@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-blue-400 mr-4 mt-1">🕒</div>
                  <div>
                    <p className="font-semibold">Business Hours:</p>
                    <p className="text-gray-300">Mon–Sat: 10:00 AM – 7:00 PM</p>
                    <p className="text-gray-300">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-gray-800 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-gray-700 border-gray-600 text-white mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-gray-700 border-gray-600 text-white mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-white">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-gray-700 border-gray-600 text-white mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="message" className="text-white">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="bg-gray-700 border-gray-600 text-white mt-2"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 text-lg font-semibold"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
