
const ServiceLocations = () => {
  const locations = [
    { city: "Varanasi", projects: ["Residence of Mr Ramesh Kumar", "Residence of Mr C.L Jaisal"] },
    { city: "Dehradun", projects: ["Computer Showroom of Nitin Jain", "School of Shivalik Academic", "Hostel of Mr. Pankaj Sharma"] },
    { city: "Selaqui", projects: ["Alder BioChem Factory", "Interior of Incraft"] }
  ];

  return (
    <section className="py-20 bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black from-blue-50 via-white to-blue-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-blue-950 dark:text-foreground">
            Our Service
            <br />
            <span className="text-blue-600 dark:text-muted-foreground">Locations in India</span>
          </h2>
          <p className="text-blue-600 dark:text-muted-foreground text-lg max-w-2xl mx-auto mb-16">
            Delivering excellence in architectural design and construction across major cities in India.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {locations.map((location, index) => (
              <div key={index} className="p-6 bg-white dark:bg-gray-900/50 rounded-lg border border-blue-100 dark:border-border shadow-sm hover:border-blue-200 dark:hover:border-border transition-all duration-300">
                <h3 className="text-xl font-semibold mb-2 text-blue-950 dark:text-foreground">{location.city}</h3>
                <ul className="space-y-2 text-muted-foreground">
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
