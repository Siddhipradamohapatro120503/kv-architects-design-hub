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
        
        {/* Achievements Section */}
        <section className="py-20 bg-gradient-to-br dark:from-black dark:to-gray-900 from-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Our Achievements
              </motion.h2>
              <motion.p 
                className="text-muted-foreground max-w-2xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Milestones that define our journey of excellence in architecture and design
              </motion.p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {[
                { number: "200+", label: "Projects Completed", icon: "🏗️" },
                { number: "15+", label: "Years of Excellence", icon: "⭐" },
                { number: "500+", label: "Happy Clients", icon: "😊" },
                { number: "50+", label: "Awards & Recognition", icon: "🏆" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            {/* Key Achievements */}
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Excellence in Residential Design",
                  description: "Recognized for innovative and sustainable residential projects across Varanasi and surrounding regions.",
                  icon: "🏠",
                  year: "2023"
                },
                {
                  title: "Commercial Architecture Award",
                  description: "Awarded for outstanding commercial space design that blends functionality with aesthetic appeal.",
                  icon: "🏢",
                  year: "2022"
                },
                {
                  title: "Sustainable Design Initiative",
                  description: "Pioneered eco-friendly architectural solutions, reducing carbon footprint by 40% in our projects.",
                  icon: "🌱",
                  year: "2021"
                },
                {
                  title: "Client Satisfaction Excellence",
                  description: "Achieved 98% client satisfaction rate with consistent 5-star reviews and repeat clientele.",
                  icon: "⭐",
                  year: "2024"
                },
                {
                  title: "Innovation in Interior Design",
                  description: "Introduced cutting-edge 3D visualization and virtual reality walkthroughs for client presentations.",
                  icon: "🎨",
                  year: "2023"
                },
                {
                  title: "Community Development Projects",
                  description: "Successfully completed multiple public infrastructure and community development projects in DLW and surrounding areas.",
                  icon: "🏘️",
                  year: "2022"
                }
              ].map((achievement, index) => (
                <motion.div
                  key={index}
                  className="bg-card rounded-xl p-6 border border-border hover:shadow-xl transition-all duration-300 group"
                  initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold">{achievement.title}</h3>
                        <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {achievement.year}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Certifications & Memberships */}
            <motion.div 
              className="mt-16 bg-card rounded-xl p-8 border border-border"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-center">Certifications & Professional Memberships</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Council of Architecture",
                    subtitle: "Registered Architects",
                    icon: "📜"
                  },
                  {
                    title: "Indian Institute of Architects",
                    subtitle: "Professional Members",
                    icon: "🏛️"
                  },
                  {
                    title: "Green Building Council",
                    subtitle: "Certified Professionals",
                    icon: "🌿"
                  }
                ].map((cert, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-6 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-300"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-4xl mb-3">{cert.icon}</div>
                    <h4 className="font-semibold mb-1">{cert.title}</h4>
                    <p className="text-sm text-muted-foreground">{cert.subtitle}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Achievement Gallery */}
            <motion.div 
              className="mt-16"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-8 text-center">Achievement Highlights</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    image: "/images/achievements/award-ceremony-1.jpeg",
                    title: "Excellence Award Recognition",
                    description: "Awarded for outstanding contribution in architecture"
                  },
                  {
                    image: "/images/achievements/award-ceremony-2.jpeg",
                    title: "Professional Excellence Award",
                    description: "Recognition for innovative design solutions"
                  },
                  {
                    image: "/images/achievements/award-ceremony-3.jpeg",
                    title: "Industry Achievement Award",
                    description: "Honored for exceptional project delivery"
                  },
                  {
                    image: "/images/achievements/alumni-meet-stage.jpeg",
                    title: "Alumni Meet 2025",
                    description: "Bundelkhand University Alumni Recognition"
                  },
                  {
                    image: "/images/achievements/meeting-with-mentor.jpeg",
                    title: "Professional Mentorship",
                    description: "Collaboration with industry leaders"
                  },
                  {
                    image: "/images/achievements/sustainability-award.jpeg",
                    title: "Sustainability Initiative Award",
                    description: "Recognition for eco-friendly design practices"
                  }
                ].map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300 group"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={achievement.image} 
                        alt={achievement.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold mb-2">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our diverse team of architects, designers, and project managers brings a wealth of experience and creativity to every project.
              </p>
            </div>
            
            <div className="space-y-12">
              {/* Special Card for Satish Kulkarni */}
              {/* <motion.div 
                className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl overflow-hidden border-2 border-blue-200 dark:border-blue-800 shadow-xl"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src="./images/team/satish1.jpeg" 
                      alt="Satish Kulkarni"
                      className="w-full h-full max-h-[500px] object-cover"
                    />
                  </div>
                  <div className="p-8 md:w-2/3">
                    <div className="mb-8">
                      <h3 className="text-3xl font-bold text-blue-900 dark:text-white">
                        Satish Kulkarni
                      </h3>
                      <p className="text-blue-700 dark:text-blue-300 text-lg font-medium">
                        Mentor & Senior Advisor
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 uppercase tracking-wider mb-3">Education</h4>
                        <p className="text-blue-900 dark:text-gray-200">
                          B.Arch (Hons), M. Arch (Urban Design)
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 uppercase tracking-wider mb-3">Experience</h4>
                        <p className="text-blue-900 dark:text-gray-200">
                          25+ years in Architecture & Urban Planning
                        </p>
                      </div>
                      
                      <div className="md:col-span-2">
                        <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 uppercase tracking-wider mb-3">Areas of Expertise</h4>
                        <p className="text-blue-900 dark:text-gray-200">
                          Sustainable Design, Urban Regeneration, Heritage Conservation
                        </p>
                      </div>
                      
                      <div className="md:col-span-2">
                        <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 uppercase tracking-wider mb-3">Key Achievements</h4>
                        <ul className="space-y-3">
                          {[
                            "Former Principal Architect at Kulkarni & Associates (2000-2020)",
                            "Visiting Faculty at SPA Delhi & CEPT University",
                            "Recipient of National Award for Excellence in Urban Design (2018)",
                            "Published 15+ research papers on sustainable urban development"
                          ].map((achievement, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-blue-500 mr-2 mt-1">•</span>
                              <span className="text-blue-900 dark:text-gray-300">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div> */}

              {/* Regular Team Members Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                   {
                    name: "Rahul Kumar",
                    role: "Personal Assistant",
                    image: "./images/team/rahul.jpeg"
                  },
                  {
                    name: "Priya Bharti",
                    role: "Interior Designer",
                    image: "./images/team/priya1.jpeg"
                  },
                  {
                    name: "Sameer Ansari",
                    role: "Architectural designer",
                    image: "./images/team/IMG_4138.JPG"
                  },
                  {
                    name: "Sagun Chaudhary",
                    role: "Architectural designer",
                    image: "./images/team/sagun.jpeg"
                  },
                  {
                    name: "Amit Kumar Patel",
                    role: "3D Designer (5+ years experience)",
                    image: "./images/team/amit.jpeg"
                  },
                  {
                    name: "Anil Patel",
                    role: "Computer Operator (Draftman)",
                    image: "./images/team/Anil.jpeg"
                  },
                  {
                    name: "Mridul Kumar",
                    role: "Computer Operator (Draftman)",
                    image: "./images/team/Mridul.jpeg"
                  },
                  {
                    name: "Pragya Ratan Maurya",
                    role: "Assistant Architect",
                    image: "./images/team/Pragya.jpeg"
                  },
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
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default AboutPage;
