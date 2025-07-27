
import { motion } from "framer-motion";

const IndiaMap = () => {
  const locations = [
    { 
      name: "Varanasi", 
      x: "48%", 
      y: "42%", 
      projects: 8,
      details: [
        "Residence of Mr Ramesh Kumar",
        "Residence of Mr C.L Jaisal",
        "Residence of Satish Bharti",
        "Multiple residential projects",
        "Commercial developments"
      ]
    },
    { 
      name: "Dehradun", 
      x: "35%", 
      y: "25%", 
      projects: 6,
      details: [
        "Computer Showroom of Nitin Jain",
        "School of Shivalik Academic",
        "Showroom of Dixton",
        "School Design of DMIT",
        "Hostel of Mr. Pankaj Sharma",
        "Seminar Hall of HZU"
      ]
    },
    { 
      name: "Azamgarh", 
      x: "50%", 
      y: "40%", 
      projects: 2,
      details: [
        "Residential projects",
        "Commercial developments"
      ]
    },
    { 
      name: "Robertsganj", 
      x: "49%", 
      y: "44%", 
      projects: 1,
      details: [
        "Residential design projects"
      ]
    },
    { 
      name: "Bhadohi", 
      x: "48.5%", 
      y: "43%", 
      projects: 2,
      details: [
        "Residential projects",
        "Interior design work"
      ]
    },
    { 
      name: "Gyanpur", 
      x: "48.2%", 
      y: "43.5%", 
      projects: 1,
      details: [
        "Residential development"
      ]
    },
    { 
      name: "Kaimoor", 
      x: "47%", 
      y: "44%", 
      projects: 1,
      details: [
        "Architectural consultation"
      ]
    },
    { 
      name: "Bhabhua", 
      x: "46%", 
      y: "44.5%", 
      projects: 1,
      details: [
        "Residential design"
      ]
    },
    { 
      name: "Basa Ram", 
      x: "47.5%", 
      y: "43.8%", 
      projects: 1,
      details: [
        "Local development project"
      ]
    },
    { 
      name: "Chandauli", 
      x: "49.5%", 
      y: "43.2%", 
      projects: 2,
      details: [
        "Residential projects",
        "Commercial planning"
      ]
    },
    { 
      name: "Roorkee", 
      x: "36%", 
      y: "26%", 
      projects: 3,
      details: [
        "Educational institutions",
        "Residential complexes",
        "Commercial projects"
      ]
    },
    { 
      name: "Dhampur", 
      x: "38%", 
      y: "27%", 
      projects: 1,
      details: [
        "Residential development"
      ]
    },
    { 
      name: "Moradabad", 
      x: "39%", 
      y: "28%", 
      projects: 2,
      details: [
        "Commercial projects",
        "Residential designs"
      ]
    },
    { 
      name: "Mirzapur", 
      x: "47.5%", 
      y: "44.8%", 
      projects: 2,
      details: [
        "Residential projects",
        "Urban planning"
      ]
    },
    { 
      name: "Gazipur", 
      x: "49.8%", 
      y: "41.5%", 
      projects: 1,
      details: [
        "Residential design"
      ]
    },
    { 
      name: "Muzaffarnagar", 
      x: "37%", 
      y: "28.5%", 
      projects: 2,
      details: [
        "Commercial developments",
        "Residential projects"
      ]
    },
    { 
      name: "Sitapur", 
      x: "44%", 
      y: "37%", 
      projects: 1,
      details: [
        "Residential planning"
      ]
    },
    { 
      name: "Buldhana, Maharashtra", 
      x: "38%", 
      y: "60%", 
      projects: 1,
      details: [
        "Regional development project"
      ]
    },
    { 
      name: "Tikamgarh, M.P.", 
      x: "40%", 
      y: "52%", 
      projects: 1,
      details: [
        "Architectural consultation"
      ]
    }
  ];

  const internationalLocations = [
    { name: "Singapore", region: "Southeast Asia" },
    { name: "Denmark", region: "Europe" },
    { name: "USA", region: "North America" }
  ];

  return (
    <div className="bg-gradient-to-br dark:from-blue-950/70 dark:to-gray-950/70 from-blue-50/80 to-blue-100/50 rounded-lg p-8 shadow-lg border border-blue-100/30 dark:border-border/50">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-foreground mb-2">Our Project Locations</h3>
        <p className="text-primary text-sm">Delivering Excellence Across Northern India</p>
      </div>
      <div className="relative mx-auto max-w-lg">
        {/* Accurate India Map SVG */}
        <img
          src="/india.svg"
          alt="Map of India"
          className="w-full h-auto max-w-lg mx-auto dark:invert dark:opacity-70 opacity-75"
          style={{ filter: 'contrast(1.1) brightness(1.05)' }}
        />

        {/* Location markers */}
        {locations.map((location, index) => (
          <motion.div
            key={location.name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: location.x, top: location.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <motion.div
              className="relative cursor-pointer"
              whileHover={{ scale: 1.3 }}
            >
              <div className="w-4 h-4 bg-primary/80 rounded-full border border-background shadow-md flex items-center justify-center">
                <div className="w-2 h-2 bg-background rounded-full"></div>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-popover text-popover-foreground px-4 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 border border-border shadow-xl min-w-[200px] pointer-events-none group-hover:pointer-events-auto">
                <div className="font-semibold mb-2">{location.name}</div>
                <div className="text-primary mb-2">{location.projects} Projects</div>
                <ul className="text-muted-foreground text-xs space-y-1">
                  {location.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-1 text-primary">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-popover"></div>
              </div>
            </motion.div>
            
            {/* Pulse animation */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary/30 rounded-full opacity-30"
              animate={{ scale: [1, 2.5, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 text-center border-t border-border/40 pt-6">
        <p className="text-muted-foreground text-sm mb-4">
          Delivering architectural excellence across India with {locations.reduce((sum, loc) => sum + loc.projects, 0)}+ successful projects in {locations.length} cities
        </p>
        
        {/* International Locations */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-foreground mb-3">International Presence</h4>
          <div className="flex justify-center items-center gap-6 flex-wrap">
            {internationalLocations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/20 dark:to-purple-400/20 px-4 py-2 rounded-full border border-blue-200/50 dark:border-blue-400/30"
              >
                <div className="text-sm font-medium text-foreground">{location.name}</div>
                <div className="text-xs text-muted-foreground">{location.region}</div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center items-center space-x-6 text-xs mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary/70 rounded-full border border-primary/30"></div>
            <span className="text-primary font-medium">Indian Locations</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border border-blue-300"></div>
            <span className="text-primary font-medium">International Presence</span>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          From local communities to global markets - Building dreams worldwide
        </div>
      </div>


    </div>
  );
};

export default IndiaMap;
