import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DropDownIcon from "../assets/dropdown.svg"; // down arrow SVG
import DropUpIcon from "../assets/Dropup.svg";     // up arrow SVG

const faqData = [
  { 
    title: "Why  we  choose K.V. Associate for our  Building  design ?", 
    content: "It's our pleasure to introduce Dr.Anil Bharti as principal Architect of K.V. Associate.  He did his graduation From IATP -BU Jhansi in 2009, He did two year job with Vimal Consultancy   -Jhansi and Stride Design-Delhi . After that, He  did  M.Arch in  2013 from IIT Roorkee . 2013 onward, He was  associate with Himgiri Zee university-Dehradun, meanwhile He enrolled in Ph.D work and  he had done it  Sept 2019." 
  },
  { 
    title: "How is it different to other architectural firm/Associates ?", 
    content: "He has Twenty Two year working experience in Teaching, practical and Research in the field of architecture. He has guided more than thirty undergraduate Thesis. He cleared GATE and CEED exams which was conducted by IITs, He is the member of C.O.A-Delhi, IIA-Mumbai, IBC-Delhi and IITRAA-Dehradun. His Area of interest includes architectural design, building construction, Vastu etc. He published more than 8 research papers in national and international journals in the field of architecture." 
  },
  { 
    title: "What types of project  deal  by K.V.Assocate ?", 
    content: "We deals in Residential, Temples, customs homes, Factory design, commercial, Hospitals, Hotels, arts/entertainment building, Renovation, Development authority work, estimation, bank loan. Architectural Design, Urban Design, Interior Design, Landscape Design,Product Design, Graphic Design, Turnkey Project etc." 
  },
  { 
    title: "How many days are required to ready the building map and other details ?", 
    content: "It is required 4-5  working days for planning and if plannings are final the next stage of drawing like 3D exterior/structure etc required 5-6 more day to complete the projects. " 
  },
  { 
    title: "Does your architect/site Engineer visit at site for building Inspection ?", 
    content: "Yes, our Architect and site engineers are visit at site time to time for the inspection of building if it is required by client or contractor." 
  },
  { 
    title: "May your K.V.Associate deals with the work of Development Authority ?", 
    content: "Yes, we deals with the work of development authority and  provide our service for submission drawing, compounding drawing online and offline both." 
  },
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
