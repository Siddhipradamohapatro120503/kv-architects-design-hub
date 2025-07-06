
const Gallery = () => {
  return (
    <section id="gallery" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Best Architect with
              <br />
              <span className="text-gray-400">knowledge</span>
            </h2>
          </div>
          <div>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Welcome to a world where spaces transform into works of art. Our architects bring a touch of brilliance to every project.
            </p>
            <div className="flex items-center space-x-4">
              <button className="text-white border-b border-gray-500 pb-1 hover:border-white transition-colors">
                View More
              </button>
              <div className="w-8 h-8 border border-gray-500 rounded-full flex items-center justify-center">
                <span className="text-gray-400">→</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 aspect-square rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Modern Architecture</span>
          </div>
          <div className="bg-gray-800 aspect-square rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Interior Spaces</span>
          </div>
          <div className="bg-gray-800 aspect-square rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Structural Design</span>
          </div>
          <div className="bg-gray-800 aspect-square rounded-lg flex items-center justify-center md:col-span-2">
            <span className="text-gray-500">Commercial Projects</span>
          </div>
          <div className="bg-gray-800 aspect-square rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Renovation Works</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
