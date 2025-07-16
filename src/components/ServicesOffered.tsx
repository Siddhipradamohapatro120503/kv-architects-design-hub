import { motion } from "framer-motion";
import { Building2, PenTool, HomeIcon, Trees, Box, PaintBucket, Hammer, KeyRound, HardHat, Check } from "lucide-react";
import { useState } from "react";

const ServicesOffered = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    {
      title: "Architectural Design",
      description: "Innovative and functional architectural solutions tailored to your vision and requirements.",
      icon: Building2,
      image: "/services/architectural.jpg",
      benefits: [
        "Custom designs that reflect your style",
        "Energy-efficient solutions",
        "3D visualization services"
      ]
    },
    {
      title: "Urban Design",
      description: "Creating sustainable and livable urban spaces that enhance community life.",
      icon: PenTool,
      image: "/services/urban.jpg",
      benefits: [
        "Smart city planning",
        "Public space design",
        "Sustainable development"
      ]
    },
    {
      title: "Interior Design",
      description: "Transforming spaces with aesthetic and functional interior design solutions.",
      icon: HomeIcon,
      image: "/services/interior.jpg",
      benefits: [
        "Personalized space planning",
        "Material selection assistance",
        "Lighting design"
      ]
    },
    {
      title: "Landscape Design",
      description: "Crafting beautiful and sustainable outdoor spaces that complement architecture.",
      icon: Trees,
      image: "/services/landscape.jpg",
      benefits: [
        "Sustainable garden design",
        "Water feature integration",
        "Native plant selection"
      ]
    },
    {
      title: "Product Design",
      description: "Designing custom furniture and architectural products for unique spaces.",
      icon: Box,
      image: "/services/product.jpg",
      benefits: [
        "Custom furniture design",
        "Ergonomic solutions",
        "Material innovation"
      ]
    },
    {
      title: "Graphic Design",
      description: "Visual communication solutions for architectural presentations and branding.",
      icon: PaintBucket,
      image: "/services/graphic.jpg",
      benefits: [
        "Brand identity design",
        "3D rendering",
        "Marketing materials"
      ]
    },
    {
      title: "Renovation",
      description: "Breathing new life into existing structures while preserving their character.",
      icon: Hammer,
      image: "/services/renovation.jpg",
      benefits: [
        "Historic preservation",
        "Modern upgrades",
        "Space optimization"
      ]
    },
    {
      title: "Turnkey Projects",
      description: "End-to-end project management from concept to completion.",
      icon: KeyRound,
      image: "/services/turnkey.jpg",
      benefits: [
        "Single point of contact",
        "Timeline management",
        "Budget optimization"
      ]
    },
    {
      title: "Construction",
      description: "High-quality construction services with attention to detail and timely delivery.",
      icon: HardHat,
      image: "/services/construction.jpg",
      benefits: [
        "Quality craftsmanship",
        "Safety compliance",
        "Expert supervision"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transforming visions into reality with our comprehensive architectural services
          </p>
        </motion.div>
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative group overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="relative h-[400px] p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover opacity-20 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/40" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0, y: hoveredIndex === index ? 0 : 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="font-semibold text-foreground mb-3">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center text-muted-foreground">
                          <Check className="w-4 h-4 mr-2 text-primary" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesOffered;
