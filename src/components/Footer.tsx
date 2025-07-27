import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 from-blue-50 via-gray-100 to-blue-50 text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6">KV Architects</h3>
            <p className="text-muted-foreground mb-4">
              Creating innovative architectural solutions that transform spaces and enrich lives.
            </p>
            <div className="flex space-x-4 mt-6">
              <motion.a 
                href="https://www.facebook.com/share/1NZ6mGkavg/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/k.v.associate?utm_source=qr&igsh=MTJnaGJ5cW9vNnl4dA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-2 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-400 p-2 rounded-full hover:bg-blue-500 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/rahul-kumar-66611b26b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-800 p-2 rounded-full hover:bg-blue-900 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Services</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Residential Design</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Commercial Architecture</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Interior Design</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Landscape Planning</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Urban Planning</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">3D Visualization</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="text-blue-400 mt-1 flex-shrink-0" size={18} />
                <p className="text-muted-foreground">N-10/79, B3, Kakarmataa, (New Colony) Opp. to Bangal Sweet House DLW-Lanka Road, Varanasi - 221004</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-blue-400 flex-shrink-0" size={18} />
                <p className="text-muted-foreground">+91 9120333520</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-blue-400 flex-shrink-0" size={18} />
                <p className="text-muted-foreground">info@kvarchitects.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Bar */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} KV Architects. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <motion.a 
                href="https://www.facebook.com/share/1NZ6mGkavg/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-500 transition-colors"
                whileHover={{ y: -3 }}
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/k.v.associate?utm_source=qr&igsh=MTJnaGJ5cW9vNnl4dA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-pink-500 transition-colors"
                whileHover={{ y: -3 }}
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-400 transition-colors"
                whileHover={{ y: -3 }}
              >
                <Twitter size={18} />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/rahul-kumar-66611b26b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-700 transition-colors"
                whileHover={{ y: -3 }}
              >
                <Linkedin size={18} />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
