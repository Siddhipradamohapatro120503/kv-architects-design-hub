import Hero from "@/components/Hero";
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

import ScribbleText from "@/components/ScribbleText";
import VisitorCounter from "@/components/VisitorCounter";
import LeadCapture from "@/components/LeadCapture";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import LeadMagnet from "@/components/LeadMagnet";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <BrandMarquee />
      <VisitorCounter />
      {/* <Services /> */}
      <Gallery />
      {/* Lead Magnet Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Resources</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Download our exclusive architectural guides to help with your project
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <LeadMagnet 
              title="Home Design Guide" 
              description="Get our comprehensive guide with 50+ modern home design ideas and tips for your dream home." 
              imageUrl="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
              downloadUrl="#" 
              resourceName="Home Design Guide"
            />
            <LeadMagnet 
              title="Budget Planning Toolkit" 
              description="Our exclusive budget planning toolkit helps you estimate and plan your architectural project costs." 
              imageUrl="https://images.unsplash.com/photo-1626178793926-22b28830aa30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
              downloadUrl="#" 
              resourceName="Budget Planning Toolkit"
            />
          </div>
        </div>
      </section>
      
      {/* <WhyChooseUs /> */}
      
      {/* Lead Capture Section */}
      <section className="py-20 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-950 dark:to-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Space?</h2>
              <p className="text-lg mb-8 text-muted-foreground">
                Our expert architects are ready to bring your vision to life. Schedule a free consultation to discuss your project needs and goals.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Personalized Design Consultation</h4>
                    <p className="text-muted-foreground">Get expert advice tailored to your specific needs</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Project Cost Estimation</h4>
                    <p className="text-muted-foreground">Understand the investment required for your dream project</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Timeline Planning</h4>
                    <p className="text-muted-foreground">Get a realistic timeline for your project completion</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <LeadCapture 
                title="Get Consultation" 
                subtitle="Our expert team will help you bring your vision to life"
                buttonText="Schedule Consultation"
              />
            </div>
          </div>
        </div>
      </section>
      
     
      <Testimonials />
      <Brands />
      {/* India Map Section */}
      {/* <section className="py-20 bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 from-gray-50 via-white to-gray-50 transition-colors duration-300">
        <div className="container mx-auto px-4">
        </div>
      </section> */}
      <FloatingContact />
      <IndiaMap />
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
