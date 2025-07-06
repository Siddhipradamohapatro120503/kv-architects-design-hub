
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">KV Architects</div>
          <div className="hidden md:flex space-x-8 text-gray-300">
            <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Studio</button>
            <button onClick={() => scrollToSection('gallery')} className="hover:text-white transition-colors">Services</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button>
          </div>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-black"
            onClick={() => scrollToSection('contact')}
          >
            Let's talk
          </Button>
        </div>
      </nav>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            Unveiling
            <br />
            <span className="text-gray-300">Architectural</span>
            <br />
            Mastery
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-400 max-w-2xl">
            Our architects breathe life into dreams, creating environments where innovation meets tradition, and spaces transcend mere structures
          </p>
          <div className="flex items-center space-x-4">
            <Button 
              className="bg-transparent border border-gray-500 text-white hover:bg-white hover:text-black px-8 py-3 rounded-full transition-all duration-300"
              onClick={() => scrollToSection('about')}
            >
              View More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Architectural Element */}
      <div className="absolute bottom-0 right-0 opacity-20">
        <div className="w-96 h-96 bg-gradient-to-tl from-gray-700 to-transparent transform rotate-45"></div>
      </div>
    </section>
  );
};

export default Hero;
