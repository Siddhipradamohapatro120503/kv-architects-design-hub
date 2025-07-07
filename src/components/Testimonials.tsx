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
    <section className="py-20 bg-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Hear from our satisfied clients about their experience working with KV Architects
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
                    className="w-[280px] sm:w-[320px] md:w-[400px] flex-shrink-0 bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 md:p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-700"
                  >
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300 italic">"{testimonial.content}"</p>
            </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
          
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
