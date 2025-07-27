import { motion } from "framer-motion";
import { Building2, PenTool, HomeIcon, Trees, Box, PaintBucket, Hammer, KeyRound, HardHat } from "lucide-react";
import ServicesOffered from "@/components/ServicesOffered";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Categories from "@/components/Categories";

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black from-blue-50 via-white to-blue-50">
      <Categories />
      {/* <ServicesOffered /> */}
      <BeforeAfterSlider />
    </div>
  );
};

export default ServicesPage;
