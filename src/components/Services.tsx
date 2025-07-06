
const Services = () => {
  return (
    <section id="services" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Explore designs that redefine
            <br />
            <span className="text-gray-400">conventional spaces.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Embark on a journey of collaboration, where your dreams become architectural masterpieces.
          </p>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-16 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-gray-400">Completed Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-gray-400">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9</div>
              <div className="text-gray-400">Rating</div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="space-y-12">
          {/* Service 1 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center border-t border-gray-800 pt-12">
            <div className="bg-gray-800 h-64 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-lg">Residential & Commercial</span>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-4">High Quality Architecture</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Strategic site planning and design for custom homes, apartments, offices, and retail spaces. Scalable projects from small to large with innovative solutions.
              </p>
            </div>
          </div>

          {/* Service 2 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center border-t border-gray-800 pt-12">
            <div className="order-2 lg:order-1">
              <h3 className="text-3xl font-bold mb-4">Interior Excellence</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Innovative interior concepts for homes and workplaces, space planning, furniture selection, and décor with professional lighting and material consultancy.
              </p>
            </div>
            <div className="bg-gray-800 h-64 rounded-lg flex items-center justify-center order-1 lg:order-2">
              <span className="text-gray-500 text-lg">Interior Design</span>
            </div>
          </div>

          {/* Service 3 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center border-t border-gray-800 pt-12">
            <div className="bg-gray-800 h-64 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-lg">3D Visualization</span>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-4">Visualization & Planning</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Realistic renders and virtual tours, design presentations for client approval with cutting-edge 3D visualization technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
