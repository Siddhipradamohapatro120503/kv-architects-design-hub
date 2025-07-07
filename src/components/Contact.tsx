
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

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
    <section id="contact" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Let's Bring Your
            <br />
            <span className="text-gray-400">Vision to Life</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Transform your architectural dreams into reality with our expert team.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-gray-900 rounded-lg">
                <MapPin className="text-gray-400 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold mb-2">Address</p>
                  <p className="text-gray-400 leading-relaxed">
                    KV Associate<br />
                    Opp. to Bangal Sweet,<br />
                    DLW-Lanka Road, Varanasi - 221004
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-6 bg-gray-900 rounded-lg">
                <Phone className="text-gray-400 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold mb-2">Phone</p>
                  <p className="text-gray-400">+91-8449 299 109, +91-9621 833 599</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-6 bg-gray-900 rounded-lg">
                <Mail className="text-gray-400 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold mb-2">Email</p>
                  <p className="text-gray-400">design@kvassociate.com, info@kvassociate.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-6 bg-gray-900 rounded-lg">
                <Clock className="text-gray-400 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold mb-2">Business Hours</p>
                  <p className="text-gray-400">
                    Mon–Sat: 10:00 AM – 7:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Section */}
            <div className="mt-8">
              <div className="relative w-full h-[300px] rounded-lg overflow-hidden shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.3015305271784!2d82.9768813!3d25.2825697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e33ef9b1f7e5d%3A0x7d1e86e0471cf44f!2sLanka%2C%20Varanasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1688641458899!5m2!1sen!2sin"
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
          <div className="bg-gray-900 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-8">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white mb-2 block">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white focus:border-white"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-white mb-2 block">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white focus:border-white"
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-white mb-2 block">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white focus:border-white"
                />
              </div>
              
              <div>
                <Label htmlFor="message" className="text-white mb-2 block">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="bg-gray-800 border-gray-700 text-white focus:border-white"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-white text-black hover:bg-gray-200 py-3 text-lg font-semibold rounded-lg transition-colors"
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
