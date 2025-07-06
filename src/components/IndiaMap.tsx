
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
      <div className="relative mx-auto max-w-lg">
        {/* Accurate India Map SVG */}
        <svg
          viewBox="0 0 600 700"
          className="w-full h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main India outline - more accurate shape */}
          <path
            d="M200 50 L280 45 L320 55 L350 70 L380 90 L400 110 L420 140 L435 170 L445 200 L450 230 L455 260 L460 290 L465 320 L470 350 L475 380 L480 410 L485 440 L480 470 L470 500 L455 530 L435 555 L410 575 L380 590 L350 600 L320 605 L290 608 L260 610 L230 608 L200 605 L170 600 L140 590 L115 575 L95 555 L80 530 L70 500 L65 470 L62 440 L60 410 L58 380 L55 350 L52 320 L50 290 L48 260 L50 230 L55 200 L65 170 L80 140 L100 110 L125 90 L155 70 L185 55 Z"
            stroke="#4B5563"
            strokeWidth="2"
            fill="#374151"
            className="opacity-80"
          />
          
          {/* Kashmir region */}
          <path
            d="M200 50 L240 40 L270 45 L280 60 L275 80 L260 90 L240 85 L220 75 L210 65 Z"
            fill="#374151"
            stroke="#4B5563"
            strokeWidth="1"
            className="opacity-80"
          />
          
          {/* Northeast states */}
          <path
            d="M420 140 L440 135 L455 145 L465 160 L460 175 L450 185 L435 180 L425 170 L420 155 Z"
            fill="#374151"
            stroke="#4B5563"
            strokeWidth="1"
            className="opacity-80"
          />
          
          {/* Southern tip */}
          <path
            d="M230 608 L250 615 L270 620 L280 630 L275 640 L265 645 L250 640 L235 635 L225 625 Z"
            fill="#374151"
            stroke="#4B5563"
            strokeWidth="1"
            className="opacity-80"
          />
          
          {/* Rajasthan region highlight */}
          <path
            d="M100 170 L200 160 L240 180 L250 220 L240 260 L220 300 L190 320 L160 330 L130 325 L110 310 L95 280 L90 240 L95 200 Z"
            fill="#3B82F6"
            className="opacity-30"
          />
          
          {/* Gujarat coastline */}
          <path
            d="M95 280 L110 310 L130 325 L150 340 L140 360 L120 375 L100 385 L85 395 L75 385 L70 370 L75 350 L85 330 L90 310 Z"
            fill="#374151"
            stroke="#4B5563"
            strokeWidth="1"
            className="opacity-80"
          />
          
          {/* Eastern coastline details */}
          <path
            d="M435 170 L445 200 L450 230 L455 260 L460 290 L465 320 L460 340 L450 360 L440 380 L430 400 L420 420 L410 440 L400 460 L390 480 L380 500 L370 520 L360 540 L350 560 L340 580 L350 590 L380 590 L410 575 L435 555 L455 530 L470 500 L480 470 L485 440 L480 410 L475 380 L470 350 L465 320 L460 290 L455 260 L450 230 L445 200 L435 170"
            fill="#374151"
            stroke="#4B5563"
            strokeWidth="1"
            className="opacity-80"
          />
        </svg>

        {/* Location markers */}
        {locations.map((location, index) => (
          <motion.div
            key={location.name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: location.x, top: location.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <motion.div
              className="relative cursor-pointer"
              whileHover={{ scale: 1.3 }}
            >
              <div className="w-5 h-5 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 border border-gray-700">
                {location.name}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900"></div>
              </div>
            </motion.div>
            
            {/* Pulse animation */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-blue-400 rounded-full opacity-40"
              animate={{ scale: [1, 2.5, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm mb-2">
          Serving across Rajasthan with excellence in architectural design
        </p>
        <div className="flex justify-center items-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Service Locations</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-400 opacity-30 rounded-full"></div>
            <span>Primary Region</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndiaMap;
