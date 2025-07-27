import React from 'react';
import { motion } from 'framer-motion';

const brandImages = [
  { id: 1, src: '/images/brands/20250724_234214.png', alt: 'Partner Brand 1' },
  { id: 2, src: '/images/brands/20250724_234336.png', alt: 'Partner Brand 2' },
  { id: 3, src: '/images/brands/20250724_234448.png', alt: 'Partner Brand 3' },
  { id: 4, src: '/images/brands/20250724_234538.png', alt: 'Partner Brand 4' },
  { id: 5, src: '/images/brands/20250724_234634.png', alt: 'Partner Brand 5' },
  { id: 6, src: '/images/brands/20250724_234815.png', alt: 'Partner Brand 6' },
  { id: 7, src: '/images/brands/20250725_195744.png', alt: 'Partner Brand 7' },
  { id: 8, src: '/images/brands/20250725_195811.png', alt: 'Partner Brand 8' },
  { id: 9, src: '/images/brands/20250725_195847.png', alt: 'Partner Brand 9' },
  { id: 10, src: '/images/brands/20250725_200300.png', alt: 'Partner Brand 10' },
  { id: 11, src: '/images/brands/20250725_200325.png', alt: 'Partner Brand 11' }
];

const Brands = () => {
  return (
    <section className="py-20 bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 from-gray-50 via-white to-gray-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-foreground mb-8 lg:mb-0"
          >
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center lg:text-left">
              Our Architect with <br />
              Known Company
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {brandImages.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="h-[10rem] sm:h-[15rem] md:h-[18rem] border-t border-border/50 border-r last:border-r-0 md:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n)]:border-r lg:[&:nth-child(4n)]:border-r-0">
                <div className="h-full flex items-center justify-center p-8 transition-all duration-300 group-hover:bg-muted/50">
                  <div className="relative w-full max-w-[90%] sm:max-w-[80%] aspect-[3/2] transition-transform duration-300 group-hover:scale-110">
                    <img
                      src={brand.src}
                      alt={brand.alt}
                      className="w-full h-full object-contain dark:invert dark:brightness-0 brightness-0"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
