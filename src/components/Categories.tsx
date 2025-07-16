import { motion, useScroll, useTransform, useSpring, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Building2, School, HomeIcon, LandmarkIcon } from "lucide-react";

interface Category {
  title: string;
  icon: JSX.Element;
  image: string;
  description: string;
}

const categories: Category[] = [
  {
    title: "Hotels",
    icon: <Building2 className="w-8 h-8" />,
    image: "/images/categories/hotel.jpg", // Add your hotel image
    description: "Luxurious and comfortable spaces designed for exceptional hospitality experiences."
  },
  {
    title: "Temples",
    icon: <LandmarkIcon className="w-8 h-8" />,
    image: "/images/categories/temple.jpg", // Add your temple image
    description: "Sacred spaces that blend traditional architecture with modern engineering."
  },
  {
    title: "Schools",
    icon: <School className="w-8 h-8" />,
    image: "/images/categories/school.jpg", // Add your school image
    description: "Educational environments that inspire learning and foster growth."
  },
  {
    title: "Residences",
    icon: <HomeIcon className="w-8 h-8" />,
    image: "/images/categories/residence.jpg", // Add your residence image
    description: "Personalized living spaces that reflect individual style and comfort."
  }
];


const CategoryCard = ({ category, index }: { category: Category; index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const animation: Variants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.2,
        ease: "easeOut"
      }
    }
  } as const;

  return (
    <motion.div
      ref={cardRef}
      variants={animation}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group relative overflow-hidden rounded-xl bg-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={category.image}
          alt={category.title}
          className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: index * 0.3 + 0.2 }}
          className="flex items-center gap-3 text-white"
        >
          {category.icon}
          <h3 className="text-2xl font-bold">{category.title}</h3>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.3 + 0.4 }}
          className="mt-2 text-white/80 text-sm"
        >
          {category.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

const InfiniteImageScroll = () => {
  // Duplicate categories to create illusion of infinite scroll
  const duplicatedCategories = [...categories, ...categories, ...categories];
  
  return (
    <div className="relative h-[50vh] overflow-hidden">
      {/* First row - moving left */}
      <motion.div
        className="flex gap-8 absolute top-1/3 -translate-y-1/2 w-max"
        animate={{
          x: ["-25%", "-100%"]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear"
          }
        }}
      >
        {duplicatedCategories.map((category, index) => (
          <div
            key={`row1-${category.title}-${index}`}
            className="relative flex-shrink-0 w-[350px] h-[200px] rounded-xl overflow-hidden"
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <h4 className="text-white text-xl font-bold">{category.title}</h4>
            </div>
          </div>
        ))}
      </motion.div>
      
      {/* Second row - moving right */}
      <motion.div
        className="flex gap-8 absolute top-2/3 -translate-y-1/2 w-max"
        animate={{
          x: ["-100%", "-25%"]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 45,
            ease: "linear"
          }
        }}
      >
        {/* {duplicatedCategories.reverse().map((category, index) => (
          <div
            key={`row2-${category.title}-${index}`}
            className="relative flex-shrink-0 w-[350px] h-[200px] rounded-xl overflow-hidden"
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <h4 className="text-white text-xl font-bold">{category.title}</h4>
            </div>
          </div>
        ))} */}
      </motion.div>
    </div>
  );
};

const Categories = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Expertise</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our diverse portfolio of architectural projects across various sectors
          </p>
        </motion.div>

        {/* Vertical Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {categories.map((category, index) => (
            <CategoryCard key={category.title} category={category} index={index} />
          ))}
        </div>

        {/* Decorative Spacing */}
        <div className="h-20 my-20"></div>

        {/* Infinite Image Scroll Section */}
        <InfiniteImageScroll />
      </div>
    </section>
  );
};

export default Categories;
