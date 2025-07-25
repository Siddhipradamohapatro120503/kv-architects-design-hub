
import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

const FloatingContact = () => {
  const handleCall = () => {
    window.open("tel:+919829000000", "_self");
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/919829000000?text=Hello! I'm interested in your architectural services.", "_blank");
  };

  return (
    <div className="fixed z-10">
      {/* Call Button - Left Side - Lower Position */}
      <motion.button
        onClick={handleCall}
        className="fixed left-6 bottom-32 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 group"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Phone size={24} className="group-hover:animate-pulse" />
        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none group-hover:pointer-events-auto">
          Call Us Now
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
        </div>
      </motion.button>

      {/* WhatsApp Button - Right Side - Lower Position */}
      <motion.button
        onClick={handleWhatsApp}
        className="fixed right-6 bottom-32 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 group"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle size={24} className="group-hover:animate-pulse" />
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none group-hover:pointer-events-auto
">
          Chat on WhatsApp
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
        </div>
      </motion.button>

      {/* Floating Animation Particles */}
      <motion.div
        className="fixed left-6 bottom-32 pointer-events-none"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 2 }}
      >
        <div className="w-16 h-16 border-2 border-blue-400 rounded-full opacity-30"></div>
      </motion.div>

      <motion.div
        className="fixed right-6 bottom-32 pointer-events-none"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 2.5 }}
      >
        <div className="w-16 h-16 border-2 border-green-400 rounded-full opacity-30"></div>
      </motion.div>
    </div>
  );
};

export default FloatingContact;
