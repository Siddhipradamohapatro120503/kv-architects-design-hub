
const ServiceLocations = () => {
  const locations = [
    "Jodhpur", "Pali", "Barmer", "Bikaner", "Jaipur", "Udaipur"
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Service
            <br />
            <span className="text-gray-400">Locations</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Covering all major cities of Rajasthan with comprehensive architectural and design services.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {locations.map((location, index) => (
              <div key={index} className="bg-gray-800 text-white p-6 rounded-lg text-center font-semibold hover:bg-gray-700 transition-colors group">
                <span className="text-lg">{location}</span>
                <div className="w-full h-px bg-gray-600 mt-4 group-hover:bg-white transition-colors"></div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-gray-400 text-lg">
              And all other major cities of Rajasthan
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceLocations;
