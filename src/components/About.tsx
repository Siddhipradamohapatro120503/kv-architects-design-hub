
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
    <section id="about" className="py-20 bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black from-blue-50 via-white to-blue-50 transition-colors duration-300 overflow-hidden transition-colors duration-300">
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
                <p className="text-blue-600 dark:text-muted-foreground text-lg max-w-2xl mx-auto">
                  To be a standard-setting architectural firm committed to total customer satisfaction by leveraging strengths in design innovation, material quality, technology, and timely project delivery.
                </p>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold mb-6">Principal Architect</h3>
                <div className="text-muted-foreground space-y-4">
                  <p className="text-xl font-semibold">Ar. Anil Bharti</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>M. Arch from IIT Roorkee (2013)</li>
                    <li>Ph.D. completed in September 2019</li>
                    <li>11 years of experience in teaching, practical work, and research</li>
                    <li>Former Associate Professor & Head, Faculty of Architecture, HZU</li>
                    <li>Member of COA-Delhi, IIA-Mumbai, IBC-Delhi, IITRAA-Dehradun</li>
                    <li>Published 8+ research papers in national and international journals</li>
                    <li>
                      <a 
                        href="https://scholar.google.com/citations?hl=hi&user=kWomaHsAAAAJ" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors"
                      >
                        View research publications on Google Scholar
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-xl font-bold mb-4">Research Highlights</h4>
                  <div className="bg-card/50 dark:bg-gray-900/30 p-4 rounded-lg border border-border">
                    <ul className="space-y-4 text-sm">
                      <li className="p-2 hover:bg-muted/50 rounded-md transition-colors">
                        <p className="font-semibold">INTERIOR DESIGNING FOR GENERAL OPERATION THEATER (AN ARCHITECTURAL APPROACH)</p>
                        <p className="text-muted-foreground">S Anil Bharti</p>
                        <p className="text-muted-foreground">International Research Journal of Engineering and Technology (IRJET) 5 (11), 6 | 2018</p>
                      </li>
                      <li className="p-2 hover:bg-muted/50 rounded-md transition-colors">
                        <p className="font-semibold">RETROFITTING IN INDIAN RAILWAY STATIONS (THROUGH CONCOURSE AND PLATFORM AREA)</p>
                        <p className="text-muted-foreground">AVA Bharti</p>
                        <p className="text-muted-foreground">International Research Journal of Engineering and Technology (IRJET) 5 (11), 12 | 2018</p>
                      </li>
                      <li className="p-2 hover:bg-muted/50 rounded-md transition-colors">
                        <p className="font-semibold">GHAT FOR EVERYONE AT VARANASI</p>
                        <p className="text-muted-foreground">SYK Anil Bharti</p>
                        <p className="text-muted-foreground">International Journal of Creative Research Thoughts (IJCRT) 6 (1), 8 | 2018</p>
                      </li>
                      <li className="p-2 hover:bg-muted/50 rounded-md transition-colors">
                        <p className="font-semibold">Pedestrian Accessibility at Dashashwamegh Ghat-Varanasi, India</p>
                        <p className="text-muted-foreground">ABPSY Kulkarni</p>
                        <p className="text-muted-foreground">Journal of Civil Engineering and Environmental Technology 5 (7), 6 | 2018</p>
                      </li>
                      <li className="p-2 hover:bg-muted/50 rounded-md transition-colors">
                        <p className="font-semibold">Rejuvenation of Ghats at Varanasi (India)</p>
                        <p className="text-muted-foreground">A Bharti</p>
                        <p className="text-muted-foreground">Journal of Energy Research and Environmental Technology (JERET) 3 (2), 7 | 2016</p>
                      </li>
                      <li className="p-2 hover:bg-muted/50 rounded-md transition-colors">
                        <p className="font-semibold">Sustainable development of Dashashawamegh Ghat at Varanasi</p>
                        <p className="text-muted-foreground">ABPSY Kulkarni</p>
                        <p className="text-muted-foreground">Sustainable Neighborhoods: Theories and practices 1 (1), 225-234</p>
                      </li>
                    </ul>
                  </div>
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
            <div className="bg-white dark:bg-gray-900/50 p-8 rounded-lg border border-blue-100 dark:border-border shadow-sm hover:border-blue-200 dark:hover:border-border transition-all duration-300">
              <img
                src="./images/team/image.png"
                alt="Ar. Anil Bharti - Principal Architect"
                className="w-full h-full object-cover"
              />
            </div>

            <motion.div
              className="absolute -bottom-8 -left-8 bg-card p-8 rounded-lg shadow-xl border border-border"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="text-4xl font-bold mb-2">21+</div>
              <div className="text-muted-foreground">Years Experience</div>
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
              className="bg-card p-8 rounded-lg relative group hover:bg-muted transition-all duration-300 cursor-pointer border border-border"
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
                  className="text-4xl font-bold text-muted-foreground group-hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  {service.number}
                </motion.span>
                <motion.div 
                  className="w-8 h-8 border border-muted-foreground rounded-full flex items-center justify-center group-hover:border-foreground transition-colors"
                  whileHover={{ rotate: 45, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-muted-foreground group-hover:text-foreground">↗</span>
                </motion.div>
              </div>
              <motion.h3 
                className="text-2xl font-bold mb-4"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {service.title}
              </motion.h3>
              <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                {service.description}
              </p>
              
              {/* Hover overlay effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
