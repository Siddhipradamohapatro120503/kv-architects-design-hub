
const WhyChooseUs = () => {
  const reasons = [
    {
      title: "Satisfied Clients",
      description: "Over 100 satisfied clients across India, building long-term relationships based on trust and service."
    },
    {
      title: "Quality Materials",
      description: "Use of high-quality raw materials ensuring durability and excellence in every project."
    },
    {
      title: "Expert Team",
      description: "Skilled workers and a technically strong team with extensive experience in architectural design."
    },
    {
      title: "Innovation Focus",
      description: "Commitment to innovative designs, new technology, and high standards of workmanship."
    },
    {
      title: "Timely Delivery",
      description: "Strong focus on timely project completion without compromising on quality."
    },
    {
      title: "Comprehensive Services",
      description: "Full range of services from architectural design to construction and project management."
    }
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Why Choose
            <br />
            <span className="text-gray-400">KV Associate?</span>
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
