import { motion } from "framer-motion";
import { LandmarkIcon, Ruler, DraftingCompass, Building } from "lucide-react";

const TempleExpertise = () => {
  const expertisePoints = [
    {
      icon: <DraftingCompass className="w-6 h-6" />,
      title: "Traditional Design",
      description: "Authentic architectural patterns following Vastu Shastra principles"
    },
    {
      icon: <Ruler className="w-6 h-6" />,
      title: "Precise Engineering",
      description: "Detailed technical drawings with exact measurements and specifications"
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Sacred Structures",
      description: "Expert in Shikhara, Kalasha, and classical temple architecture styles"
    }
  ];

  const temples = [
    {
      title: "Ganesh Temple Entrance",
      image: "/images/temples/ganesh-temple-elevation.png",
      description: "Front elevation with ornate pillars and traditional Ganesh motif",
      specs: "Span: 18'-0\" | Height: 24'-9\""
    },
    {
      title: "Shikhara Temple",
      image: "/images/temples/shikhara-temple-elevation.png",
      description: "Classical Kalasha style with detailed Garbhagriha design",
      specs: "Height: 45'-9\" | Platform Level design"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <LandmarkIcon className="w-10 h-10 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold">Our Expertise</h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Specialized in temple architecture combining sacred traditions with modern engineering excellence
          </p>
        </motion.div>

        {/* Expertise Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {expertisePoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors"
            >
              <div className="text-primary mb-3">{point.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
              <p className="text-muted-foreground text-sm">{point.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Temple Elevations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {temples.map((temple, index) => (
            <motion.div
              key={temple.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden bg-white">
                <img
                  src={temple.image}
                  alt={temple.title}
                  className="w-full h-full object-contain p-4 transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {temple.title}
                </h3>
                <p className="text-muted-foreground mb-3">{temple.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Ruler className="w-4 h-4 text-primary" />
                  <span className="font-mono text-primary">{temple.specs}</span>
                </div>
              </div>

              {/* Technical Drawing Badge */}
              <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                Technical Drawing
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every temple design is meticulously crafted with precise measurements, traditional aesthetics, 
            and structural integrity to create spaces that inspire devotion and stand the test of time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TempleExpertise;
