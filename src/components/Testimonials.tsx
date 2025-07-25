import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Homeowner",
    content: "KV Architects transformed our dream home into reality. Their attention to detail and innovative design solutions exceeded our expectations.",
    image: "/testimonials/client1.jpg"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Business Owner",
    content: "Working with KV Architects on our commercial project was a fantastic experience. They perfectly balanced aesthetics with functionality.",
    image: "/testimonials/client2.jpg"
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Property Developer",
    content: "Their expertise in sustainable design and modern architecture has made them our go-to architectural firm for all our projects.",
    image: "/testimonials/client3.jpg"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    role: "Interior Designer",
    content: "Collaborating with KV Architects has been a pleasure. Their understanding of space and light creates perfect canvases for interior design.",
    image: "/testimonials/client4.jpg"
  },
  {
    id: 5,
    name: "Vikram Malhotra",
    role: "Hotel Chain Owner",
    content: "The team's innovative approach to hospitality architecture has helped us create unique experiences for our guests. Exceptional work!",
    image: "/testimonials/client5.jpg"
  },
  {
    id: 6,
    name: "Anita Desai",
    role: "Restaurant Owner",
    content: "They understood our vision perfectly and created a space that our customers love. The ambiance is exactly what we wanted.",
    image: "/testimonials/client6.jpg"
  },
  {
    id: 7,
    name: "Rahul Mehta",
    role: "Tech Company CEO",
    content: "Our office space designed by KV Architects promotes creativity and collaboration. It's a perfect blend of function and style.",
    image: "/testimonials/client7.jpg"
  },
  {
    id: 8,
    name: "Maya Singh",
    role: "School Principal",
    content: "The school campus design is both safe and inspiring. They've created an environment that truly enhances learning.",
    image: "/testimonials/client8.jpg"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 from-gray-50 via-white to-gray-50 text-foreground overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Client Stories
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what our clients are sharing about their KV Architects experience
          </p>
        </div>

        <div className="relative mt-16 overflow-hidden">
          <motion.div
            className="flex space-x-8"
            animate={{ x: [-2000, 0] }}
            style={{ touchAction: 'pan-y pinch-zoom' }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex space-x-8 flex-nowrap">
                {testimonials.map((testimonial) => (
                  <motion.div
                    key={`${i}-${testimonial.id}`}
                    className="w-[320px] sm:w-[350px] md:w-[400px] flex-shrink-0 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border overflow-hidden"
                  >
              {/* Instagram-style image */}
              <div className="w-full h-[15rem] overflow-hidden">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-full w-full object-cover"
                />
              </div>
              
              {/* Instagram-style caption area */}
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className="h-8 w-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-2 flex items-center justify-between w-full">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {testimonial.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                    <div className="text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12s4.5 10 10 10 10-4.5 10-10"/><path d="m9 12 2 2 4-4"/></svg>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-foreground mb-2">
                  <span className="font-semibold mr-1">{testimonial.name}</span>
                  {testimonial.content}
                </p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
          
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r dark:from-gray-900 from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l dark:from-gray-900 from-gray-50 to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
