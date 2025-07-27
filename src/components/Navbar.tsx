import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import MobileNav from './MobileNav';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Studio', path: '/studio' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-blue-950/95 dark:bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-blue-650/60 dark:supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <div className="mr-8 cursor-pointer flex items-center" onClick={() => navigate('/')}>
          <img 
            src="/images/LOGO-KV.png" 
            alt="KV Associate Logo" 
            className="h-28 w-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-between">
          <div className="flex items-center space-x-6">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className="text-blue-100 dark:text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-6">
            <ThemeToggle />
            <Button
              variant="default"
              onClick={() => navigate('/contact')}
              className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-foreground dark:text-background dark:hover:bg-muted-foreground transition-colors"
            >
              Let's talk
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex flex-1 justify-end md:hidden">
          <MobileNav isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
