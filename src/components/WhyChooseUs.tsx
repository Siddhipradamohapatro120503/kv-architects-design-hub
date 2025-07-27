
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
    <section className="py-20 bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black from-blue-50 via-white to-blue-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-blue-950 dark:text-foreground">
            Why Choose
            <br />
            <span className="text-muted-foreground">KV Associate?</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="p-6 bg-white dark:bg-gray-900/50 rounded-lg border border-blue-100 dark:border-border shadow-sm hover:border-blue-200 dark:hover:border-border transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <span className="text-2xl font-bold text-muted-foreground/60">0{index + 1}</span>
                <div className="w-6 h-6 border border-muted rounded-full flex items-center justify-center group-hover:border-foreground transition-colors">
                  <span className="text-muted-foreground group-hover:text-foreground text-[0.875rem]">↗</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-blue-950 dark:text-foreground">{reason.title}</h3>
              <p className="text-blue-600 dark:text-muted-foreground text-lg max-w-2xl mx-auto mb-16">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
