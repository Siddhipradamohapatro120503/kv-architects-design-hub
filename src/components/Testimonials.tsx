import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  location?: string;
  date?: string;
  rating?: number;
  isWhatsApp?: boolean;
  phoneNumber?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mr Taank",
    role: "Client",
    content: "Good service",

    location: "Gyanpur, Bhadohi",
    date: "19 Jan 2024",
    rating: 5.0
  },
  {
    id: 2,
    name: "Neetu Kumari",
    role: "Client",
    content: "My experience at K V Associates was excellent! Their repair and services are not only top-notch but also incredibly cost-efficient. They prioritize quality while keeping prices affordable, ensuring great value for every service. The team is knowledgeable, friendly, and quick to respond, making the entire process smooth and satisfying. Highly recommend!",

    location: "Chitaipur Road – Sunderpur",
    date: "19 Jul 2025",
    rating: 5.0
  },
  {
    id: 3,
    name: "Sujit Tiwari",
    role: "Client",
    content: "Great service and professional work!",

    date: "19 Feb 2021",
    rating: 4.5
  },
  {
    id: 4,
    name: "Ahaan Panday",
    role: "Client",
    content: "Sir 🙏 sir bahut saare good compliments mil rahe hai thanks sir ki aapne mere ghar ko achchha design diya. Ab sir mere ghar ka interior de dijiye taki aage ka kaam ham usi ke mutabik karawa sake.",

    date: "20 May",
    isWhatsApp: true
  },
  {
    id: 5,
    name: "Ravi Bharti",
    role: "Client",
    content: "I had a great experience with Kv Associates! They are very flexible with appointments, which helped me a lot. I could choose a time that worked best for me. The service was fast and friendly. They fixed my problem quickly and made sure I was happy. I highly recommend Kv Associates for anyone needing repair services!",

    location: "DLW, Varanasi",
    date: "25 Jul 2025",
    rating: 5.0
  },
  {
    id: 6,
    name: "Ramashray",
    role: "Client",
    content: "Excellent service and professional approach!",

    location: "DLW, Varanasi",
    date: "9 Feb 2021",
    rating: 5.0
  },
  {
    id: 7,
    name: "Divya",
    role: "Client",
    content: "Good experience with the team!",

    location: "DLW, Varanasi",
    date: "31 Dec 2020",
    rating: 4.0
  },
  {
    id: 8,
    name: "Ar. Anil",
    role: "Architect",
    content: "Professional collaboration and great results!",

    location: "DLW, Varanasi",
    date: "11 Dec 2020",
    rating: 4.5
  },
  {
    id: 9,
    name: "Deepak",
    role: "Client",
    content: "Best architect",

    location: "DLW, Varanasi",
    date: "21 Nov 2020",
    rating: 5.0
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

              
              {/* Instagram-style caption area */}
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className="h-8 w-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 bg-primary flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-2 flex items-center justify-between w-full">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground flex items-center gap-1">
                        {testimonial.name}
                        {testimonial.isWhatsApp && (
                          <span className="text-green-500" title="WhatsApp Client">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
                            </svg>
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      {testimonial.location && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                          {testimonial.location}
                        </p>
                      )}
                    </div>
                    <div className="text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12s4.5 10 10 10 10-4.5 10-10"/><path d="m9 12 2 2 4-4"/></svg>
                    </div>
                  </div>
                </div>
                
                {/* Rating display */}
                {testimonial.rating && (
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill={i < Math.floor(testimonial.rating!) ? "#fbbf24" : "none"}
                          stroke="#fbbf24"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                        </svg>
                      ))}
                      <span className="ml-1 text-xs text-muted-foreground">{testimonial.rating}</span>
                    </div>
                  </div>
                )}
                
                <p className="text-sm text-foreground mb-2">
                  <span className="font-semibold mr-1">{testimonial.name}</span>
                  {testimonial.content}
                </p>
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {testimonial.date || "2 days ago"}
                  </p>
                  {testimonial.phoneNumber && (
                    <p className="text-xs text-muted-foreground">
                      {testimonial.phoneNumber}
                    </p>
                  )}
                </div>
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
