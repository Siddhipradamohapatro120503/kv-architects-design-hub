
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Welcome to <span className="text-blue-400">KV Architects</span> & Design Solutions
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto">
          Your one-stop destination for impactful architectural and design services.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
            onClick={() => scrollToSection('contact')}
          >
            Contact Us
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg"
            onClick={() => scrollToSection('gallery')}
          >
            View Our Portfolio
          </Button>
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
            onClick={() => scrollToSection('contact')}
          >
            Book a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
