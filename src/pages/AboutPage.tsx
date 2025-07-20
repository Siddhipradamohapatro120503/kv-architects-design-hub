import React from 'react';
import { motion } from 'framer-motion';
import About from '@/components/About';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section for About Page */}
        <section className="py-20 bg-gradient-to-br dark:from-gray-900 dark:to-black from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                About KV Architects
              </motion.h1>
              <motion.p 
                className="text-xl text-muted-foreground mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                We are a team of passionate architects dedicated to creating innovative and sustainable designs that transform spaces and enrich lives.
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Main About Component */}
        <About />
        
        {/* Additional About Page Content */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16">
              <motion.div 
                className="space-y-6"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold">Our Journey</h2>
                <p className="text-muted-foreground">
                  Founded in 2010, KV Architects has grown from a small design studio to a comprehensive architectural firm serving clients across India. Our journey has been marked by a commitment to excellence, innovation, and client satisfaction.
                </p>
                <p className="text-muted-foreground">
                  Over the years, we've successfully completed over 200 projects ranging from residential homes to commercial complexes, each reflecting our dedication to quality and attention to detail.
                </p>
              </motion.div>
              
              <motion.div 
                className="space-y-6"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold">Our Philosophy</h2>
                <p className="text-muted-foreground">
                  At KV Architects, we believe that great architecture is about more than just aesthetics. It's about creating spaces that enhance the quality of life, promote sustainability, and stand the test of time.
                </p>
                <p className="text-muted-foreground">
                  We approach each project with fresh eyes, working closely with our clients to understand their needs and aspirations. This collaborative approach ensures that our designs not only look beautiful but also function perfectly for their intended purpose.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-20 bg-gradient-to-br dark:from-black dark:to-gray-900 from-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our diverse team of architects, designers, and project managers brings a wealth of experience and creativity to every project.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Amit Jaiswal",
                  role: "Principal Architect",
                  image: "./images/team/Amit Jaiswal.png"
                },
                {
                  name: "Raghvender",
                  role: "Senior Architect",
                  image: "./images/team/Raghvender.jpg"
                },
                {
                  name: "Ravinder Tiwari",
                  role: "Project Manager",
                  image: "./images/team/Ravinder Tiwari.jpg"
                },
                {
                  name: "Priyanka",
                  role: "Interior Designer",
                  image: "./images/team/priyanka ji.jpg"
                },
                {
                  name: "Subhan",
                  role: "Design Consultant",
                  image: "./images/team/Subhan.jpg"
                },
                {
                  name: "S. Mishra",
                  role: "Senior Designer",
                  image: "./images/team/S. Mishra.jpg"
                },
                {
                  name: "Sanjay Paswan",
                  role: "Project Coordinator",
                  image: "./images/team/SANJAY PASWAN.jpg"
                },
                {
                  name: "Vinit",
                  role: "Architectural Associate",
                  image: "./images/team/VINIT.jpg"
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default AboutPage;
