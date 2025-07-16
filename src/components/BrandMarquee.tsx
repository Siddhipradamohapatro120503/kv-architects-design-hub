
import { motion } from "framer-motion";

const BrandMarquee = () => {
  const brands = [
    "Premium Architecture", "Modern Design", "Sustainable Buildings", 
    "Urban Planning", "Interior Design", "Landscape Architecture",
    "Green Buildings", "Smart Homes", "Commercial Spaces", "Residential Projects"
  ];

  return (
    <div className="bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 from-gray-50 via-white to-gray-50 py-8 overflow-hidden border-y border-border transition-colors duration-300">
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
                  className="text-muted-foreground text-lg font-medium hover:text-foreground transition-colors cursor-default"
                >
                  {brand}
                </div>
              ))}
            </div>
          ))}
        </motion.div>
        
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r dark:from-gray-900 from-gray-50 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l dark:from-gray-900 from-gray-50 to-transparent z-10"></div>
      </div>
    </div>
  );
};

export default BrandMarquee;
