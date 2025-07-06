
const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Us</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">KV Architects & Design Solutions</h3>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-center">
                  <span className="font-semibold text-blue-600 mr-2">Established:</span>
                  <span>2010</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-blue-600 mr-2">Location:</span>
                  <span>Jodhpur, Rajasthan</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-blue-600 mr-2">Experience:</span>
                  <span>10+ years in Architecture & Design Consultancy</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h4>
              <p className="text-gray-700 leading-relaxed">
                To deliver creative, reliable, and cost-effective architectural solutions tailored to client needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
