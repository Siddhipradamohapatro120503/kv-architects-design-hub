
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import MobileNav from "./MobileNav";

const Hero = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=80"
          alt="Modern Architectural Background"
          className="w-full h-full object-cover"
          loading="eager"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = '/fallback-hero.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40"></div>
      </div>
      {/* Navigation */}
      <motion.nav 
        className="absolute top-0 left-0 right-0 z-30 p-6"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div 
            className="text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            KV Associate
          </motion.div>
          <div className="hidden md:flex space-x-8 text-gray-300">
            <motion.button 
              onClick={() => scrollToSection('about')} 
              className="hover:text-white transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('services')} 
              className="hover:text-white transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('projects')} 
              className="hover:text-white transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('contact')} 
              className="hover:text-white transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </motion.button>
          </div>
          <div className="flex items-center gap-4">
            <motion.div className="hidden md:block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="outline" 
              className="border-white text-black bg-white transition-all duration-300"
              onClick={() => scrollToSection('contact')}
            >
              Get in Touch
            </Button>
          </motion.div>
            <MobileNav isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
          </div>
        </div>
      </motion.nav>

      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 2 }}
      >
        <motion.div 
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 0.8, 1],
            rotate: [0, -180, -360]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        ></motion.div>
      </motion.div>

      <motion.div 
        className="relative z-10 container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="max-w-4xl">
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Transforming
              <br />
              <motion.span 
                className="text-blue-400"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Dreams
              </motion.span>
              <br />
              Into Reality
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-12 text-gray-400 max-w-2xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              At KV Associate, we blend innovative design with sustainable practices to create spaces that inspire, function perfectly, and stand the test of time
            </motion.p>
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="bg-transparent border border-gray-500 text-white hover:bg-white hover:text-black px-8 py-3 rounded-full transition-all duration-300 group"
                  onClick={() => scrollToSection('about')}
                >
                  Explore Our Work
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Building Image */}
          <motion.div
            className="relative"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <motion.div
              className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-xl opacity-70"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 0.9, 0.7]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Geometric Shapes - Moved Down */}
      <motion.div
        className="absolute bottom-40 left-10 w-4 h-4 bg-white opacity-20"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      <motion.div
        className="absolute bottom-20 right-20 w-6 h-6 border border-white opacity-20"
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -180, -360]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>

      {/* Architectural Element */}
      <motion.div 
        className="absolute bottom-0 right-0 opacity-20"
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: 1, rotate: 45 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        <div className="w-96 h-96 bg-gradient-to-tl from-gray-700 to-transparent transform rotate-45"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
