
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServiceLocations from "@/components/ServiceLocations";
import Contact from "@/components/Contact";
import FloatingContact from "@/components/FloatingContact";
import BrandMarquee from "@/components/BrandMarquee";
import IndiaMap from "@/components/IndiaMap";
import Brands from "@/components/Brands";
import Testimonials from "@/components/Testimonials";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <BrandMarquee />
      <About />
      <Services />
      <Gallery />
      <WhyChooseUs />
      <ServiceLocations />
      <Testimonials />
      <Brands />
      {/* India Map Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <IndiaMap />
        </div>
      </section>
      <Contact />
      <FloatingContact />
    </div>
  );
};

export default Index;
