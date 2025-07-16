
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
      title: "Modern Architecture",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Commercial"
    },
    {
      id: 2,
      title: "Interior Spaces",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Interior"
    },
    {
      id: 3,
      title: "Structural Design",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Residential"
    },
    {
      id: 4,
      title: "Commercial Projects",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Commercial"
    },
    {
      id: 5,
      title: "Renovation Works",
      image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Renovation"
    },
    {
      id: 6,
      title: "Luxury Interiors",
      image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Interior"
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

        {/* Gallery Carousel */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent className="-ml-4">
              {galleryImages.map((item, index) => (
                <CarouselItem key={item.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div 
                    className="relative group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-background bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end">
                        <div className="p-6 text-foreground transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <span className="text-sm text-muted-foreground mb-2 block">{item.category}</span>
                          <h3 className="text-xl font-bold">{item.title}</h3>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white dark:bg-card border-blue-100 dark:border-border hover:bg-blue-50 dark:hover:bg-muted transition-colors duration-300" />
            <CarouselNext className="right-4 bg-white dark:bg-card border-blue-100 dark:border-border hover:bg-blue-50 dark:hover:bg-muted transition-colors duration-300" />
          </Carousel>
        </motion.div>

        {/* Additional Gallery Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {galleryImages.slice(0, 5).map((item, index) => (
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
