
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 bg-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid lg:grid-cols-2 gap-16 items-start"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="space-y-8"
            initial={{ x: -50, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-6">Company Vision</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  To be a standard-setting architectural firm committed to total customer satisfaction by leveraging strengths in design innovation, material quality, technology, and timely project delivery.
                </p>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold mb-6">Principal Architect</h3>
                <div className="text-gray-400 space-y-4">
                  <p className="text-xl font-semibold">Ar. Anil Bharti</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>M. Arch from IIT Roorkee (2013)</li>
                    <li>Ph.D. completed in September 2019</li>
                    <li>11 years of experience in teaching, practical work, and research</li>
                    <li>Former Associate Professor & Head, Faculty of Architecture, HZU</li>
                    <li>Member of COA-Delhi, IIA-Mumbai, IBC-Delhi, IITRAA-Dehradun</li>
                    <li>Published 8+ research papers in national and international journals</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
              <img
                src="/images/principal-architect.jpg"
                alt="Ar. Anil Bharti - Principal Architect"
                className="w-full h-full object-cover"
              />
            </div>

            <motion.div
              className="absolute -bottom-8 -left-8 bg-black p-8 rounded-lg shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="text-4xl font-bold mb-2">11+</div>
              <div className="text-gray-400">Years Experience</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            {
              number: "01",
              title: "Visionary Design",
              description: "Our commitment to cutting-edge design and sustainable practices ensures that our creations stand the test of time."
            },
            {
              number: "02", 
              title: "Architectural Detailing",
              description: "Experience the perfect blend of innovation and sophistication as we craft spaces that reflect your unique style."
            },
            {
              number: "03",
              title: "Pleasantly Redesign", 
              description: "Transform your living space with a home redesign that adds style, functionality, and a fresh perspective to your environment."
            }
          ].map((service, index) => (
            <motion.div 
              key={index}
              className="bg-gray-800 p-8 rounded-lg relative group hover:bg-gray-700 transition-all duration-300 cursor-pointer"
              initial={{ y: 50, opacity: 0 }}
              animate={isVisible ? { 
                y: 0, 
                opacity: 1,
                transition: {
                  delay: index * 0.2,
                  duration: 0.6,
                  ease: [0.6, -0.05, 0.01, 0.99]
                }
              } : { y: 50, opacity: 0 }}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-start mb-6">
                <motion.span 
                  className="text-4xl font-bold text-gray-500 group-hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  {service.number}
                </motion.span>
                <motion.div 
                  className="w-8 h-8 border border-gray-500 rounded-full flex items-center justify-center group-hover:border-white transition-colors"
                  whileHover={{ rotate: 45, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-gray-400 group-hover:text-white">↗</span>
                </motion.div>
              </div>
              <motion.h3 
                className="text-2xl font-bold mb-4"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {service.title}
              </motion.h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {service.description}
              </p>
              
              {/* Hover overlay effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
