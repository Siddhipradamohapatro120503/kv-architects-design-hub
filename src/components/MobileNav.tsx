import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Menu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useNavigate } from 'react-router-dom';

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Studio', path: '/studio' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-4 md:hidden">
        <ThemeToggle />
        <button
          onClick={() => setIsOpen(true)}
          className="text-foreground p-2"
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed right-0 top-0 h-full w-[80%] max-w-sm bg-card z-50 shadow-xl"
            >
              <div className="p-5 flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xl font-bold text-foreground">Menu</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-foreground p-2"
                    aria-label="Close Menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                <nav className="flex flex-col space-y-4">
                  {menuItems.map((item) => (
                    <motion.button
                      key={item.name}
                      onClick={() => handleNavigation(item.path)}
                      className="text-left text-lg text-foreground py-2 px-4 hover:bg-muted rounded-lg transition-colors"
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
                    className="w-full border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                    onClick={() => handleNavigation('/contact')}
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
