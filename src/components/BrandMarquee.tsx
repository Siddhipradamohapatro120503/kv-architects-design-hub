
import { motion } from "framer-motion";

const BrandMarquee = () => {
  const brands = [
    "Premium Architecture", "Modern Design", "Sustainable Buildings", 
    "Urban Planning", "Interior Design", "Landscape Architecture",
    "Green Buildings", "Smart Homes", "Commercial Spaces", "Residential Projects"
  ];

  return (
    <div className="bg-gray-900 py-8 overflow-hidden border-y border-gray-800">
      <div className="relative">
        <motion.div
          className="flex space-x-16 whitespace-nowrap"
          animate={{ x: [0, -2000] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex space-x-16">
              {brands.map((brand, index) => (
                <div
                  key={`${i}-${index}`}
                  className="text-gray-400 text-lg font-medium hover:text-white transition-colors cursor-default"
                >
                  {brand}
                </div>
              ))}
            </div>
          ))}
        </motion.div>
        
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
      </div>
    </div>
  );
};

export default BrandMarquee;
