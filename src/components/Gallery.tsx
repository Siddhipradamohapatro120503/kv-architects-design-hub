
const Gallery = () => {
  const galleryItems = [
    "Residential and commercial projects",
    "Interior spaces and landscaping",
    "Renovation before-and-after",
    "3D renders and walkthroughs"
  ];

  return (
    <section id="gallery" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-blue-600 font-medium">{item}</span>
              </div>
              <p className="text-gray-700 font-medium">{item}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">Showcase visuals of our completed projects</p>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
