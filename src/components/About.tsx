
const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
              Our architects blend creativity and functionality to redefine the way you experience your surroundings.
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
          
          <div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Best Architect with
              <br />
              <span className="text-gray-400">knowledge</span>
            </h2>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-gray-800 p-8 rounded-lg relative group hover:bg-gray-700 transition-colors">
            <div className="flex justify-between items-start mb-6">
              <span className="text-4xl font-bold text-gray-500">01</span>
              <div className="w-8 h-8 border border-gray-500 rounded-full flex items-center justify-center group-hover:border-white transition-colors">
                <span className="text-gray-400 group-hover:text-white">↗</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Visionary Design</h3>
            <p className="text-gray-400 leading-relaxed">
              Our commitment to cutting-edge design and sustainable practices ensures that our creations stand the test of time.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg relative group hover:bg-gray-700 transition-colors">
            <div className="flex justify-between items-start mb-6">
              <span className="text-4xl font-bold text-gray-500">02</span>
              <div className="w-8 h-8 border border-gray-500 rounded-full flex items-center justify-center group-hover:border-white transition-colors">
                <span className="text-gray-400 group-hover:text-white">↗</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Architectural Detailing</h3>
            <p className="text-gray-400 leading-relaxed">
              Experience the perfect blend of innovation and sophistication as we craft spaces that reflect your unique style.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg relative group hover:bg-gray-700 transition-colors bg-cover bg-center" 
               style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><rect width=\"100\" height=\"100\" fill=\"%23374151\"/></svg>')"}}>
            <div className="flex justify-between items-start mb-6">
              <span className="text-4xl font-bold text-gray-500">03</span>
              <div className="w-8 h-8 border border-gray-500 rounded-full flex items-center justify-center group-hover:border-white transition-colors">
                <span className="text-gray-400 group-hover:text-white">↗</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Pleasantly Redesign</h3>
            <p className="text-gray-400 leading-relaxed">
              Transform your living space with a home redesign that adds style, functionality, and a fresh perspective to your environment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
