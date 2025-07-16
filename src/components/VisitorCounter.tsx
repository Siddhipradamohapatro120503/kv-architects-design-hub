import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Building, Clock } from 'lucide-react';

interface CounterItemProps {
  icon: React.ReactNode;
  label: string;
  startValue: number;
  endValue: number;
  duration: number;
  suffix?: string;
}

const CounterItem: React.FC<CounterItemProps> = ({ 
  icon, 
  label, 
  startValue, 
  endValue, 
  duration,
  suffix = ""
}) => {
  // Initialize with endValue to ensure numbers are visible immediately
  const [count, setCount] = useState(endValue);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Create an intersection observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    // Get the current element
    const element = document.getElementById(`counter-${label.replace(/\s+/g, '-').toLowerCase()}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [label]);

  useEffect(() => {
    // Always ensure the end value is displayed, even if animation doesn't trigger
    if (!isInView && !hasAnimated) {
      setCount(endValue);
    }
    
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      
      // Reset to start value to begin animation
      setCount(startValue);
      
      // Calculate step size based on the range and duration
      const range = endValue - startValue;
      const stepTime = Math.max(10, duration / range); // Ensure minimum 10ms between steps
      
      let current = startValue;
      const timer = setInterval(() => {
        current += 1;
        setCount(current);
        
        if (current >= endValue) {
          clearInterval(timer);
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView, hasAnimated, startValue, endValue, duration]);

  return (
    <motion.div
      id={`counter-${label.replace(/\s+/g, '-').toLowerCase()}`}
      className="flex flex-col items-center p-6 bg-card rounded-lg border border-border hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="mb-4 text-primary">
        {icon}
      </div>
      <div className="text-4xl font-bold mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-muted-foreground text-center">
        {label}
      </div>
    </motion.div>
  );
};

const VisitorCounter: React.FC = () => {
  // Retrieve visitor count from localStorage or start from 5100
  const getInitialVisitorCount = () => {
    const storedCount = localStorage.getItem('visitorCount');
    if (storedCount) {
      return parseInt(storedCount, 10);
    }
    return 5100;
  };

  const [visitorCount, setVisitorCount] = useState(getInitialVisitorCount);

  useEffect(() => {
    // Increment the count by a random number between 1-3 to simulate new visitors
    const newCount = visitorCount + Math.floor(Math.random() * 3) + 1;
    setVisitorCount(newCount);
    
    // Store the updated count in localStorage
    localStorage.setItem('visitorCount', newCount.toString());
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br dark:from-gray-900 dark:to-black from-white to-blue-50 transition-colors duration-300">
      <div className="container mx-auto px-4" id="counter-section">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Impact By Numbers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're proud of our achievements and the trust our clients place in us
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <CounterItem 
            icon={<Users size={40} />}
            label="Happy Clients"
            startValue={5100}
            endValue={visitorCount}
            duration={2000}
            suffix="+"
          />
          
          <CounterItem 
            icon={<Building size={40} />}
            label="Projects Completed"
            startValue={200}
            endValue={250}
            duration={2000}
            suffix="+"
          />
          
          <CounterItem 
            icon={<Award size={40} />}
            label="Awards Won"
            startValue={25}
            endValue={32}
            duration={1500}
            suffix=""
          />
          
          <CounterItem 
            icon={<Clock size={40} />}
            label="Years Experience"
            startValue={10}
            endValue={15}
            duration={1000}
            suffix="+"
          />
        </div>
      </div>
    </section>
  );
};

export default VisitorCounter;
