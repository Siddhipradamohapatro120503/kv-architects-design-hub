
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from "framer-motion";

const Gallery = () => {
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

    const section = document.getElementById('gallery');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const galleryImages = [
    {
      id: 1,
      title: "Modern Villa Design",
      image: "/images/architecture/Villa.jpg",
      category: "Residential"
    },
    {
      id: 2,
      title: "Interior Design",
      image: "/images/interiors/interior ground floor.jpg",
      category: "Interior"
    },
    {
      id: 3,
      title: "Apartment Complex",
      image: "./images/buildings/Apartment.jpg",
      category: "Residential"
    },
    {
      id: 4,
      title: "Factory Design",
      image: "/images/buildings/1factory.jpg",
      category: "Commercial"
    },
    {
      id: 5,
      title: "Hospital Architecture",
      image: "./images/buildings/upkar hospital.jpg",
      category: "Healthcare"
    },
    {
      id: 6,
      title: "Reception Area",
      image: "/images/interiors/reception.jpg",
      category: "Interior"
    },
    {
      id: 7,
      title: "Educational Institution",
      image: "./images/buildings/classroom.jpg",
      category: "Educational"
    },
    {
      id: 8,
      title: "Living Room Design",
      image: "/images/interiors/umesh ji living room.jpg",
      category: "Interior"
    },
    {
      id: 9,
      title: "Modern Architecture",
      image: "./images/buildings/achi12.jpg",
      category: "Commercial"
    },
    {
      id: 10,
      title: "Healthcare Facility",
      image: "./images/buildings/hospital11.jpg",
      category: "Healthcare"
    },
    {
      id: 11,
      title: "Project Showcase",
      image: "/images/projects/IMG-20250626-WA0010.jpg",
      category: "Projects"
    },
    {
      id: 12,
      title: "Design Concept",
      image: "/images/projects/IMG-20250626-WA0016.jpg",
      category: "Projects"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black from-blue-50 via-white to-blue-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid lg:grid-cols-2 gap-16 items-start mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-blue-950 dark:text-foreground">
              Best Architect with
              <br />
              <span className="text-muted-foreground">knowledge</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-blue-600 dark:text-muted-foreground text-lg max-w-2xl mx-auto mb-16">
              Welcome to a world where spaces transform into works of art. Our architects bring a touch of brilliance to every project.
            </p>
            <div className="flex items-center space-x-4">
              <button className="bg-white dark:bg-gray-900/50 rounded-lg overflow-hidden border border-blue-100 dark:border-border shadow-sm group hover:border-blue-200 dark:hover:border-border transition-all duration-300">
                View More
              </button>
              <div className="w-8 h-8 border border-muted rounded-full flex items-center justify-center">
                <span className="text-muted-foreground">→</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Additional Gallery Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {[
            {
              id: 101,
              title: "Factory Design",
              image: "/images/buildings/1factory.jpg",
              category: "Industrial"
            },
            {
              id: 102,
              title: "Hospital Architecture",
              image: "/images/buildings/hospital11.jpg",
              category: "Healthcare"
            },
            {
              id: 103,
              title: "Modern Apartment",
              image: "/images/buildings/Apartment.jpg",
              category: "Residential"
            },
            {
              id: 104,
              title: "Educational Facility",
              image: "/images/buildings/classroom.jpg",
              category: "Educational"
            },
            {
              id: 105,
              title: "Healthcare Center",
              image: "/images/buildings/upkar hospital.jpg",
              category: "Healthcare"
            },
            {
              id: 106,
              title: "Contemporary Design",
              image: "/images/buildings/achi12.jpg",
              category: "Commercial"
            }
          ].map((item, index) => (
            <motion.div 
              key={`grid-${item.id}`}
              className={`bg-muted rounded-lg overflow-hidden group cursor-pointer ${
                index === 3 ? 'md:col-span-2' : ''
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-foreground">
                    <span className="text-sm text-muted-foreground">{item.category}</span>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
