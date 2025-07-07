
const ServiceLocations = () => {
  const locations = [
    { city: "Varanasi", projects: ["Residence of Mr Ramesh Kumar", "Residence of Mr C.L Jaisal"] },
    { city: "Dehradun", projects: ["Computer Showroom of Nitin Jain", "School of Shivalik Academic", "Hostel of Mr. Pankaj Sharma"] },
    { city: "Selaqui", projects: ["Alder BioChem Factory", "Interior of Incraft"] }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Our Service
            <br />
            <span className="text-gray-400">Locations in India</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Delivering excellence in architectural design and construction across major cities in India.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {locations.map((location, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-lg hover:bg-gray-700 transition-colors">
                <h3 className="text-2xl font-bold mb-4">{location.city}</h3>
                <ul className="space-y-2 text-gray-400">
                  {location.projects.map((project, pIndex) => (
                    <li key={pIndex} className="flex items-center">
                      <span className="mr-2">•</span>
                      {project}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceLocations;
