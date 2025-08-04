import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DropDownIcon from "../assets/dropdown.svg"; // down arrow SVG
import DropUpIcon from "../assets/Dropup.svg";     // up arrow SVG

const faqData = [
  { title: "Platform Essentials", content: "Details about Platform Essentials..." },
  { title: "Applications & Intelligence", content: "Details about Applications & Intelligence..." },
  { title: "Deployment & Integration", content: "Details about Deployment & Integration..." },
  { title: "Security & Compliance", content: "Details about Security & Compliance..." },
  { title: "Business Value & ROI", content: "Details about Business Value & ROI..." },
  { title: "Getting Started & Support", content: "Details about Getting Started & Support..." },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container text-white w-full max-w-4xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-foreground">
          FAQ's
        </h2>
      </motion.div>

      {faqData.map((item, index) => (
        <div
          key={index}
          className="border-b border-gray-700 p-6 cursor-pointer rounded-sm"
        >
          <div
            className="flex justify-between items-center"
            onClick={() => toggleFAQ(index)}
          >
            <h3 className="font-semibold">{item.title}</h3>
            <motion.img
              src={activeIndex === index ? DropUpIcon : DropDownIcon}
              alt="toggle"
              className="w-3 h-3"
              animate={{ rotate: activeIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <AnimatePresence initial={false}>
            {activeIndex === index && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="mt-6 text-gray-400">{item.content}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default Faq;
