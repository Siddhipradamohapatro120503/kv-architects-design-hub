import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Menu } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { name: 'Home', section: 'about' },
    { name: 'Studio', section: 'services' },
    { name: 'Services', section: 'gallery' },
    { name: 'Contact', section: 'contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden text-white p-2"
        aria-label="Open Menu"
      >
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed right-0 top-0 h-full w-[80%] max-w-sm bg-gray-900 z-50 shadow-xl"
            >
              <div className="p-5 flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xl font-bold text-white">Menu</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white p-2"
                    aria-label="Close Menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                <nav className="flex flex-col space-y-4">
                  {menuItems.map((item) => (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.section)}
                      className="text-left text-lg text-white py-2 px-4 hover:bg-gray-800 rounded-lg transition-colors"
                      whileHover={{ x: 8 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </nav>

                <div className="mt-auto pb-8">
                  <Button
                    variant="outline"
                    className="w-full border-white text-white hover:bg-white hover:text-black transition-all duration-300"
                    onClick={() => scrollToSection('contact')}
                  >
                    Let's talk
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
