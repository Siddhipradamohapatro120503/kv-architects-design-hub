
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import MobileNav from "./MobileNav";

// Hero Scribble Text Component
const HeroScribbleText = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowText(true), 800);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // SVG path for decorative scribble
  const scribblePaths = {
    underline: "M20,80 Q100,60 180,80 Q260,100 340,80",
    spiral: "M50,50 Q60,40 70,50 Q80,60 70,70 Q60,80 50,70 Q40,60 50,50",
  };

  return (
    <div ref={ref} className="relative mb-6 sm:mb-8">
      <div className="relative">
        {/* Self-Drawing SVG Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute bottom-0 left-0 w-full h-12">
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <motion.path
              d={scribblePaths.underline}
              fill="none"
              stroke="rgb(37, 99, 235)" // Deeper blue for better contrast
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            />
          </svg>
        </div>

        {/* Main Text with Letter Animation - Only Tagline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-blue-950 dark:text-white">
          <div className="tracking-tight">
            {"We Design".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
          <div className="text-blue-600 dark:text-blue-400 relative inline-block">
            {"Your Dreams".split("").map((char, index) => (
              <motion.span
                key={index + 20}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: 1,
                  textShadow: "0 0 15px rgba(37, 99, 235, 0.6)"
                } : { opacity: 0, scale: 0.5 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.6 + (index * 0.1),
                  type: "spring",
                  stiffness: 200
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <motion.div 
              className="absolute -bottom-2 left-0 w-full h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full shadow-lg shadow-blue-400/30 dark:shadow-blue-500/30"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        </h1>
      </div>
    </div>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleNavigation = (path: string) => {
    if (path.startsWith('/')) {
      navigate(path);
    } else {
      document.getElementById(path)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground transition-colors duration-300">
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
        <div className="absolute inset-0 bg-gradient-to-br dark:from-black/90 dark:via-black/70 dark:to-black/50 from-white/90 via-white/70 to-white/50"></div>
      </div>
      {/* Navigation */}
      {/* <motion.nav 
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
              onClick={() => handleNavigation('about')} 
              className="hover:text-white transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </motion.button>
            <motion.button 
              onClick={() => handleNavigation('services')} 
              className="hover:text-white transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </motion.button>
            <motion.button 
              onClick={() => handleNavigation('projects')} 
              className="hover:text-white transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </motion.button>
            <motion.button 
              onClick={() => handleNavigation('contact')} 
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
              className="border-white text-white hover:bg-white hover:text-black transition-all duration-300"
              onClick={() => handleNavigation('contact')}
            >
              Get in Touch
            </Button>
          </motion.div>
            <MobileNav isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
          </div>
        </div>
      </motion.nav> */}

      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 2 }}
      >
        <motion.div 
          className="absolute top-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-br from-blue-800 to-indigo-900 rounded-full blur-2xl"
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
        <motion.div 
          className="absolute top-1/2 left-1/3 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-br from-indigo-500 to-blue-400 rounded-full blur-xl hidden sm:block"
          animate={{ 
            scale: [0.9, 1.1, 0.9],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
      </motion.div>

      <motion.div 
        className="relative z-10 container mx-auto px-4 py-8 sm:py-12 md:py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Text Content with Self-Drawing Animation */}
          <div className="max-w-4xl">
            <HeroScribbleText />
            <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-blue-700 dark:text-blue-300 max-w-2xl ml-0 px-4 sm:px-0 leading-relaxed">
              At KV Associate, we blend innovative design with sustainable practices to create spaces that inspire, function perfectly, and stand the test of time
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row items-center gap-4 sm:space-x-4 px-4 sm:px-0"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button 
                  className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium shadow-lg hover:shadow-xl rounded-md"
                  onClick={() => handleNavigation('about')}
                >
                  Explore Our Work
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button 
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium"
                  onClick={() => handleNavigation('contact')}
                >
                  Contact Us
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

      {/* Floating Geometric Shapes - Responsive */}
      <motion.div
        className="absolute bottom-20 sm:bottom-40 left-4 sm:left-10 w-3 h-3 sm:w-4 sm:h-4 bg-blue-400 dark:bg-blue-500 opacity-30 sm:opacity-40 rounded-sm"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      <motion.div
        className="absolute bottom-10 sm:bottom-20 right-8 sm:right-20 w-4 h-4 sm:w-6 sm:h-6 border-2 border-blue-500 dark:border-blue-400 opacity-30 sm:opacity-40"
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -180, -360],
          scale: [1, 0.8, 1]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>

      <motion.div
        className="absolute top-1/4 right-8 sm:right-16 w-2 h-8 sm:w-3 sm:h-12 bg-blue-500 dark:bg-blue-400 opacity-20 sm:opacity-30 rounded-full hidden sm:block"
        animate={{ 
          height: ["3rem", "2rem", "3rem"],
          rotate: [0, 5, 0, -5, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>

      {/* Architectural Element */}
      <motion.div 
        className="absolute bottom-0 right-0 opacity-20 sm:opacity-30"
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: 1, rotate: 45 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        {/* <div className="w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-tl from-blue-700 dark:from-blue-600 to-transparent transform rotate-45"></div> */}
      </motion.div>
    </section>
  );
};

export default Hero;
