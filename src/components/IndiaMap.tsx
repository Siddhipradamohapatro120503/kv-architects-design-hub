
import { motion } from "framer-motion";

const IndiaMap = () => {
  const locations = [
    { name: "Jodhpur", x: "25%", y: "35%" },
    { name: "Pali", x: "27%", y: "38%" },
    { name: "Barmer", x: "20%", y: "40%" },
    { name: "Bikaner", x: "22%", y: "25%" },
    { name: "Jaipur", x: "35%", y: "30%" },
    { name: "Udaipur", x: "32%", y: "45%" }
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-8">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Our Service Locations in India</h3>
      <div className="relative mx-auto max-w-md">
        {/* Simplified India Map SVG */}
        <svg
          viewBox="0 0 400 500"
          className="w-full h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* India outline (simplified) */}
          <path
            d="M100 100 L300 100 L350 150 L380 200 L370 250 L350 300 L320 350 L300 400 L200 450 L100 430 L80 380 L70 320 L60 250 L70 200 L90 150 Z"
            stroke="#4B5563"
            strokeWidth="2"
            fill="#374151"
            className="opacity-80"
          />
          
          {/* Rajasthan region highlight */}
          <path
            d="M70 150 L200 150 L220 200 L200 250 L150 280 L100 270 L80 220 Z"
            fill="#3B82F6"
            className="opacity-30"
          />
        </svg>

        {/* Location markers */}
        {locations.map((location, index) => (
          <motion.div
            key={location.name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: location.x, top: location.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.2 }}
            >
              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
              <motion.div
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ opacity: 1 }}
              >
                {location.name}
              </motion.div>
            </motion.div>
            
            {/* Pulse animation */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400 rounded-full opacity-50"
              animate={{ scale: [1, 2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          Serving across Rajasthan with excellence in architectural design
        </p>
      </div>
    </div>
  );
};

export default IndiaMap;
