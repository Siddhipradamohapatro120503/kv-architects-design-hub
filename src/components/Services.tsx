
const Services = () => {
  const services = [
    {
      title: "Residential & Commercial Architecture",
      description: "Strategic site planning and design, custom homes, apartments, offices, and retail spaces. Scalable projects from small to large."
    },
    {
      title: "Interior Design",
      description: "Innovative interior concepts for homes and workplaces, space planning, furniture selection, and décor. Lighting and material consultancy."
    },
    {
      title: "Landscape Architecture",
      description: "Outdoor space design for gardens, terraces, and public areas. Sustainable and aesthetic landscaping solutions."
    },
    {
      title: "Renovation & Restoration",
      description: "Modernization of existing structures, heritage building restoration and adaptive reuse."
    },
    {
      title: "Project Management",
      description: "End-to-end project supervision, timely delivery and quality assurance."
    },
    {
      title: "3D Visualization & Walkthroughs",
      description: "Realistic renders and virtual tours, design presentations for client approval."
    },
    {
      title: "Sustainable Design Solutions",
      description: "Green building practices, energy-efficient planning and materials."
    },
    {
      title: "Turnkey Construction",
      description: "Complete design-to-execution services, coordination with contractors and vendors."
    },
    {
      title: "Custom Furniture & Fabrication",
      description: "Bespoke furniture design and build, modular kitchens, wardrobes, and fixtures."
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="text-blue-600 text-2xl font-bold mb-2">{index + 1}.</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-700 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
