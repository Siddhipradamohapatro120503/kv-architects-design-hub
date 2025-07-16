import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const ScribbleText = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showText, setShowText] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (isInView) {
      const textTimer = setTimeout(() => setShowText(true), 1500);
      const particleTimer = setTimeout(() => setShowParticles(true), 2000);
      return () => {
        clearTimeout(textTimer);
        clearTimeout(particleTimer);
      };
    }
  }, [isInView]);

  // Generate fewer particles for better performance
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 1.5
  }));

  // Complex SVG paths for self-drawing effects
  const scribblePaths = {
    underline: "M20,80 Q100,60 180,80 Q260,100 340,80",
    circle: "M50,50 A25,25 0 1,1 50,49.9",
    arrow: "M10,50 L40,50 M30,40 L40,50 L30,60",
    star: "M50,10 L60,40 L90,40 L70,60 L80,90 L50,70 L20,90 L30,60 L10,40 L40,40 Z",
    spiral: "M50,50 Q60,40 70,50 Q80,60 70,70 Q60,80 50,70 Q40,60 50,50 Q55,45 60,50 Q65,55 60,60 Q55,65 50,60",
    zigzag: "M10,50 L20,30 L30,70 L40,30 L50,70 L60,30 L70,70 L80,30 L90,50",
    heart: "M50,70 C50,60 40,50 30,60 C30,50 20,50 20,60 C20,70 50,90 50,90 C50,90 80,70 80,60 C80,50 70,50 70,60 C60,50 50,60 50,70",
    lightning: "M30,10 L20,40 L35,40 L25,90 L45,50 L35,50 L45,10 Z"
  };

  return (
    <div ref={ref} className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-white dark:from-gray-900 dark:via-blue-900/20 dark:to-black">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Animated Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-2 h-2 bg-blue-400 rounded-full"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={showParticles ? {
                  opacity: [0, 0.7, 0],
                  scale: [0, 1, 0],
                  y: [-10, 0, 10]
                } : { opacity: 0, scale: 0 }}
                transition={{
                  duration: 4,
                  delay: particle.delay,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            ))}
          </div>

          {/* Floating Geometric Shapes */}
          <motion.div
            className="absolute top-10 left-10 w-16 h-16 border-2 border-blue-400 rounded-full"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={isInView ? {
              opacity: 0.5,
              scale: 1,
              rotate: 360
            } : { opacity: 0, scale: 0 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "loop",
              delay: 1,
              ease: "linear"
            }}
          />
          
          <motion.div
            className="absolute bottom-10 right-10 w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 transform rotate-45"
            initial={{ opacity: 0, scale: 0, rotate: 45 }}
            animate={isInView ? {
              opacity: 0.6,
              scale: 1,
              rotate: 405
            } : { opacity: 0, scale: 0 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "loop",
              delay: 1.5,
              ease: "linear"
            }}
          />

          <motion.div
            className="absolute top-1/3 right-1/4 w-8 h-20 bg-gradient-to-b from-transparent via-blue-300 to-transparent rounded-full"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={isInView ? {
              opacity: 0.4,
              scaleY: 1,
              x: [0, 5, -5, 0]
            } : { opacity: 0, scaleY: 0 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "loop",
              delay: 2,
              ease: "easeInOut"
            }}
          />
          {/* Complex Self-Drawing Animations */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Main decorative underline with glow effect */}
            <svg className="absolute top-1/2 left-0 w-full h-32 transform -translate-y-1/2">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/> 
                  </feMerge>
                </filter>
              </defs>
              <motion.path
                d={scribblePaths.underline}
                fill="none"
                stroke="rgb(59, 130, 246)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
              />
            </svg>
            
            {/* Animated spiral */}
            <svg className="absolute top-16 right-16 w-24 h-24">
              <motion.path
                d={scribblePaths.spiral}
                fill="none"
                stroke="rgb(147, 51, 234)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, rotate: 0, scale: 0 }}
                animate={isInView ? { pathLength: 1, rotate: 720, scale: 1 } : { pathLength: 0, rotate: 0, scale: 0 }}
                transition={{ duration: 4, ease: "easeInOut", delay: 1 }}
              />
            </svg>
            
            {/* Animated zigzag */}
            <svg className="absolute bottom-16 left-16 w-32 h-16">
              <motion.path
                d={scribblePaths.zigzag}
                fill="none"
                stroke="rgb(236, 72, 153)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, x: -50 }}
                animate={isInView ? { pathLength: 1, x: 0 } : { pathLength: 0, x: -50 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 1.5 }}
              />
            </svg>
            
            {/* Animated heart */}
            <svg className="absolute top-32 left-1/3 w-16 h-16">
              <motion.path
                d={scribblePaths.heart}
                fill="none"
                stroke="rgb(239, 68, 68)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, scale: 0 }}
                animate={isInView ? { 
                  pathLength: 1, 
                  scale: 1,
                } : { pathLength: 0, scale: 0 }}
                transition={{ duration: 3, ease: "easeInOut", delay: 2 }}
              />
            </svg>
            
            {/* Animated lightning */}
            <svg className="absolute bottom-32 right-1/3 w-20 h-20">
              <motion.path
                d={scribblePaths.lightning}
                fill="none"
                stroke="rgb(245, 158, 11)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { 
                  pathLength: 1, 
                  opacity: 1
                } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 2.5 }}
              />
            </svg>
            
            {/* Multiple circles with different animations */}
            <svg className="absolute top-10 right-20 w-20 h-20">
              <motion.path
                d={scribblePaths.circle}
                fill="none"
                stroke="rgb(59, 130, 246)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, rotate: 0 }}
                animate={isInView ? { pathLength: 1, rotate: 360 } : { pathLength: 0, rotate: 0 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
              />
            </svg>
            
            {/* Secondary circle */}
            <svg className="absolute bottom-10 left-1/2 w-16 h-16">
              <motion.path
                d={scribblePaths.circle}
                fill="none"
                stroke="rgb(168, 85, 247)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, rotate: 0 }}
                animate={isInView ? { pathLength: 1, rotate: -360 } : { pathLength: 0, rotate: 0 }}
                transition={{ duration: 3, ease: "easeInOut", delay: 1.8 }}
              />
            </svg>
          </div>

          {/* Main Text with Letter-by-Letter Animation */}
          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={showText ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-blue-600 tracking-tight">
                {"We Design".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50, rotateX: -90, scale: 0.5 }}
                    animate={showText ? { 
                      opacity: 1, 
                      y: 0, 
                      rotateX: 0, 
                      scale: 1,
                    } : { opacity: 0, y: 50, rotateX: -90, scale: 0.5 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="inline-block"
                    whileHover={{ 
                      scale: 1.1, 
                      color: "rgb(147, 51, 234)",
                      textShadow: "0 0 20px rgba(147, 51, 234, 0.5)"
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
                <br />
                <span className="relative inline-block">
                  {"Your Dreams".split("").map((char, index) => (
                    <motion.span
                      key={index + 10}
                      initial={{ opacity: 0, y: 50, rotateY: -90, scale: 0.5 }}
                      animate={showText ? { 
                        opacity: 1, 
                        y: 0, 
                        rotateY: 0, 
                        scale: 1,
                      } : { opacity: 0, y: 50, rotateY: -90, scale: 0.5 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: (index + 10) * 0.1,
                        type: "spring",
                        stiffness: 180
                      }}
                      className="inline-block"
                      whileHover={{ 
                        scale: 1.15, 
                        color: "rgb(236, 72, 153)",
                        textShadow: "0 0 25px rgba(236, 72, 153, 0.6)"
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                  {/* Animated underline that draws itself with multiple effects */}
                  <motion.span
                    className="absolute -bottom-4 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={showText ? { 
                      scaleX: 1, 
                      opacity: 1,
                      boxShadow: "0 0 15px rgba(59, 130, 246, 0.6)"
                    } : { scaleX: 0, opacity: 0 }}
                    transition={{ duration: 2, delay: 2.5, ease: "easeInOut" }}
                    style={{ transformOrigin: "left" }}
                  />
                  
                  {/* Just 3 animated dots with simpler animation */}
                  {[...Array(3)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute -bottom-2 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                      style={{ left: `${25 + i * 20}%` }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={showText ? {
                        scale: 1,
                        opacity: [0.4, 0.8, 0.4],
                        y: [-5, 0, -5]
                      } : { scale: 0, opacity: 0 }}
                      transition={{
                        duration: 2,
                        delay: 3 + i * 0.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </span>
              </h2>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute -top-10 -right-10 w-40 h-40 text-blue-500/10"
            initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.5, rotate: -30 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <svg
              viewBox="0 0 100 100"
              fill="currentColor"
              className="w-full h-full transform rotate-12"
            >
              <path d="M50 0 L100 50 L50 100 L0 50 Z" />
            </svg>
          </motion.div>

          <motion.div
            className="absolute -bottom-10 -left-10 w-32 h-32 text-blue-500/10"
            initial={{ opacity: 0, scale: 0.5, rotate: 30 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.5, rotate: 30 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <svg
              viewBox="0 0 100 100"
              fill="currentColor"
              className="w-full h-full transform -rotate-12"
            >
              <circle cx="50" cy="50" r="50" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ScribbleText;
