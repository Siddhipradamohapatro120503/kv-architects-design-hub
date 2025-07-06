
const WhyChooseUs = () => {
  const reasons = [
    {
      title: "Pan-Rajasthan Coverage",
      description: "Complete project coverage across all major cities of Rajasthan with local expertise and understanding."
    },
    {
      title: "Transparent Pricing",
      description: "Competitive and transparent pricing structure with no hidden costs or surprises."
    },
    {
      title: "Creative Excellence",
      description: "Experienced design team with innovative solutions and cutting-edge architectural practices."
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock client support ensuring seamless communication throughout your project."
    },
    {
      title: "Proven Track Record",
      description: "Successful partnerships with corporate, government, and private clients across diverse projects."
    },
    {
      title: "Compliance & Safety",
      description: "Full compliance with local permissions and safety standards, ensuring legal and secure construction."
    }
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Why Choose
            <br />
            <span className="text-gray-400">KV Architects?</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-gray-900 p-8 rounded-lg hover:bg-gray-800 transition-colors group">
              <div className="flex justify-between items-start mb-6">
                <span className="text-2xl font-bold text-gray-500">0{index + 1}</span>
                <div className="w-6 h-6 border border-gray-500 rounded-full flex items-center justify-center group-hover:border-white transition-colors">
                  <span className="text-gray-400 group-hover:text-white text-sm">↗</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">{reason.title}</h3>
              <p className="text-gray-400 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
