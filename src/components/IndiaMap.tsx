
import { motion } from "framer-motion";

const IndiaMap = () => {
  const locations = [
    { 
      name: "Varanasi", 
      x: "48%", 
      y: "42%", 
      projects: 3,
      details: [
        "Residence of Mr Ramesh Kumar",
        "Residence of Mr C.L Jaisal",
        "Residence of Satish Bharti"
      ]
    },
    { 
      name: "Dehradun", 
      x: "35%", 
      y: "25%", 
      projects: 6,
      details: [
        "Computer Showroom of Nitin Jain",
        "School of Shivalik Academic",
        "Showroom of Dixton",
        "School Design of DMIT",
        "Hostel of Mr. Pankaj Sharma",
        "Seminar Hall of HZU"
      ]
    },
    { 
      name: "Selaqui", 
      x: "34%", 
      y: "24%", 
      projects: 3,
      details: [
        "Factory of Catvision",
        "Alder BioChem Factory",
        "Interior of Incraft"
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-white mb-2">Our Project Locations</h3>
        <p className="text-blue-400 text-sm">Delivering Excellence Across Northern India</p>
      </div>
      <div className="relative mx-auto max-w-lg">
        {/* Accurate India Map SVG */}
        <img
          src="/india.svg"
          alt="Map of India"
          className="w-full h-auto max-w-lg mx-auto opacity-80"
          style={{ filter: 'brightness(0.8) contrast(1.2)' }}
        />

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
              <div className="w-5 h-5 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 border border-gray-700 shadow-xl min-w-[200px]">
                <div className="font-semibold mb-2">{location.name}</div>
                <div className="text-blue-400 mb-2">{location.projects} Projects</div>
                <ul className="text-gray-300 text-xs space-y-1">
                  {location.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-1 text-blue-400">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
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
      
      <div className="mt-8 text-center border-t border-gray-700 pt-6">
        <p className="text-gray-300 text-sm mb-4">
          Delivering architectural excellence across Rajasthan with {locations.reduce((sum, loc) => sum + loc.projects, 0)}+ successful projects
        </p>
        <div className="flex justify-center items-center space-x-6 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full border border-blue-400"></div>
            <span className="text-blue-400 font-medium">Service Locations</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 opacity-30 rounded-full border border-blue-300"></div>
            <span className="text-blue-400 font-medium">Primary Region</span>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-400">
          Expanding our reach to serve you better
        </div>
      </div>


    </div>
  );
};

export default IndiaMap;
