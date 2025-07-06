
const ServiceLocations = () => {
  const locations = [
    "Jodhpur", "Pali", "Barmer", "Bikaner", "Jaipur", "Udaipur"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Service Locations</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-xl text-gray-700 text-center mb-8">
            Covering all major cities of Rajasthan:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {locations.map((location, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg text-center font-semibold shadow-md hover:shadow-lg transition-shadow duration-300">
                {location}
              </div>
            ))}
          </div>
          
          <p className="text-center text-gray-600 mt-8 text-lg">
            And all other major cities of Rajasthan
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceLocations;
