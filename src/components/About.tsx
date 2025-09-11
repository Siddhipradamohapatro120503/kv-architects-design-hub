
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
    <section id="about" className="py-16 bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black from-blue-50 via-white to-blue-50 transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid lg:grid-cols-1 gap-12 items-start"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="space-y-10"
            initial={{ y: 20, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-12 max-w-6xl mx-auto">
              {/* Mentor Section - Top Priority */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900/50 dark:to-gray-800/50 p-6 md:p-8 rounded-xl border border-blue-200 dark:border-blue-800/50 shadow-sm">
                <div className="lg:flex gap-8 items-start">
                  <div className="lg:w-1/4 mb-6 lg:mb-0">
                    <div className="sticky top-24">
                      <img 
                        src="./images/team/satish1.jpeg" 
                        alt="Prof. Satish Kulkarni"
                        className="w-full h-full object-contain rounded-lg shadow-md"
                      />
                      <div className="mt-3 p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-sm">
                        <p className="text-sm italic text-gray-700 dark:text-gray-300 text-center">
                          "Fusion of non-measurable with measurable is the essence of architectural creations"
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-3/4">
                    <div className="mb-6 pb-4 border-b border-blue-100 dark:border-gray-700">
                      <h3 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-1">OUR MENTOR</h3>
                      <h4 className="text-3xl font-bold mb-0">Prof. Satish Kulkarni</h4>
                    </div>
                    
                    <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
                      <p>
                        Prof. Satish Kulkarni was a distinguished Professor of Architecture and former Head of the Department of Architecture and Planning at the Indian Institute of Technology, Roorkee (1977-2015). His illustrious academic career includes serving as a faculty member in the Departments of Architecture at Baghdad and Mosul in Iraq (1987-89), and at NEC Kathmandu, Nepal (1999).
                      </p>
                      
                      <p>
                        He served as Professor and Dean of Architecture at H.Z. University, Dehrandun (2016-18) and as a Visiting Professor, established and mentored the Department of Architecture at IIT BHU (2019-20).
                      </p>
                      
                      <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg my-4">
                        <h5 className="font-semibold text-lg mb-2">Professional Highlights</h5>
                        <ul className="list-disc pl-5 space-y-1 text-sm md:text-base">
                          <li>40+ years of professional experience in architecture and planning</li>
                          <li>Institute Architect at IIT Roorkee for 11 years</li>
                          <li>Designed the Master Plan of IITR campus and numerous architectural projects</li>
                          <li>Expert on architecture colleges inspection committees under the Council of Architecture, Govt. of India</li>
                          <li>Executive member of Building Works Committees for IIT BHU, Jodhpur, and Bhilai</li>
                          <li>Member of expert committee for architect selection at IIT Gandhinagar</li>
                        </ul>
                      </div>
                      
                      <p className="italic text-gray-700 dark:text-gray-300 text-sm md:text-base">
                        "Space and form, the two central elements of architecture, represent an ideal synthesis of man's civilizing factors with natural resources."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Vision with Image */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Company Vision</h3>
                  <p className="text-blue-600 dark:text-muted-foreground text-lg">
                    To be a standard-setting architectural firm committed to total customer satisfaction by leveraging strengths in design innovation, material quality, technology, and timely project delivery.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="bg-white dark:bg-gray-900/50 p-4 rounded-xl border border-blue-100 dark:border-border shadow-md hover:shadow-lg transition-all duration-300">
                    <img
                      src="./images/team/image.png"
                      alt="Ar. Anil Bharti - Principal Architect"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-card p-3 rounded-xl shadow-xl border border-border backdrop-blur-sm">
                    <div className="text-2xl font-bold text-primary">16+</div>
                    <div className="text-xs font-medium text-muted-foreground">Years Experience</div>
                  </div>
                </div>
              </div>
            
              <div>
                <h3 className="text-2xl font-bold mb-4">Principal Architect</h3>
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

          {/* Image section has been integrated with Company Vision */}
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
