
const WhyChooseUs = () => {
  const reasons = [
    "Pan-Rajasthan Project Coverage",
    "Competitive & Transparent Pricing",
    "Creative, Experienced Design Team",
    "24/7 Client Support",
    "Proven Track Record with Corporate, Government & Private Clients",
    "Compliance with Local Permissions and Safety Standards"
  ];

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose KV Architects & Design Solutions?</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start">
                <div className="text-blue-600 text-2xl font-bold mr-4">⭐</div>
                <p className="text-gray-800 font-medium leading-relaxed">{reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
