
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServiceLocations from "@/components/ServiceLocations";
import Contact from "@/components/Contact";
import FloatingContact from "@/components/FloatingContact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <Gallery />
      <WhyChooseUs />
      <ServiceLocations />
      <Contact />
      <FloatingContact />
    </div>
  );
};

export default Index;
