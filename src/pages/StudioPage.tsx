import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const StudioPage = () => {
  const [activeTab, setActiveTab] = useState<'youtube' | 'instagram' | 'facebook'>('youtube');

  const socialLinks = {
    youtube: "https://youtube.com/@k.v.associate",
    instagram: "https://www.instagram.com/k.v.associate",
    facebook: "https://facebook.com/kvassociate" // Replace with actual Facebook URL
  };

  // YouTube videos data
  const youtubeVideos = [
    { 
      id: "video1", 
      embedId: "UzopfQlTuxk",
      title: "KV Associate Project Video 1"
    },
    { 
      id: "video2", 
      embedId: "lG4Rn_hZo_0",
      title: "KV Associate Project Video 2"
    },
    { 
      id: "video3", 
      embedId: "z-ZyFbe1eQk",
      title: "KV Associate Project Video 3"
    },
    { 
      id: "video4", 
      embedId: "Ogp_h4RgqNQ",
      title: "KV Associate Project Video 4"
    },
    { 
      id: "video5", 
      embedId: "hrqZP8L_FRc",
      title: "KV Associate Project Video 5"
    }
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % youtubeVideos.length);
  };

  const previousVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + youtubeVideos.length) % youtubeVideos.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Our Creative Studio
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              Explore our latest projects, behind-the-scenes content, and creative process through our social media channels.
            </p>
          </motion.div>

          {/* Social Media Navigation */}
          <div className="flex justify-center gap-4 mb-12">
            <Button
              variant={activeTab === 'youtube' ? 'default' : 'outline'}
              onClick={() => setActiveTab('youtube')}
              className="flex items-center gap-2"
            >
              <Youtube className="w-5 h-5" />
              YouTube
            </Button>
            <Button
              variant={activeTab === 'instagram' ? 'default' : 'outline'}
              onClick={() => setActiveTab('instagram')}
              className="flex items-center gap-2"
            >
              <Instagram className="w-5 h-5" />
              Instagram
            </Button>
            <Button
              variant={activeTab === 'facebook' ? 'default' : 'outline'}
              onClick={() => setActiveTab('facebook')}
              className="flex items-center gap-2"
            >
              <Facebook className="w-5 h-5" />
              Facebook
            </Button>
          </div>

          {/* Content Area */}
          <div className="max-w-6xl mx-auto">
            {/* YouTube Videos */}
            {activeTab === 'youtube' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="relative max-w-4xl mx-auto">
                  <motion.div
                    key={currentVideoIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative pb-[56.25%] w-full bg-card rounded-lg overflow-hidden shadow-xl"
                  >
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${youtubeVideos[currentVideoIndex].embedId}?autoplay=0&rel=0`}
                      title={youtubeVideos[currentVideoIndex].title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </motion.div>
                  
                  {/* Navigation Buttons */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                      onClick={previousVideo}
                    >
                      <motion.span
                        whileHover={{ x: -3 }}
                        className="flex items-center justify-center"
                      >
                        ←
                      </motion.span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                      onClick={nextVideo}
                    >
                      <motion.span
                        whileHover={{ x: 3 }}
                        className="flex items-center justify-center"
                      >
                        →
                      </motion.span>
                    </Button>
                  </div>

                  {/* Video Indicators */}
                  <div className="flex justify-center gap-2 mt-4">
                    {youtubeVideos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentVideoIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentVideoIndex ? 'bg-foreground w-4' : 'bg-muted-foreground'}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => window.open(socialLinks.youtube, '_blank')}
                    className="flex items-center gap-2"
                  >
                    <Youtube className="w-5 h-5" />
                    Visit our YouTube Channel
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Instagram Feed */}
            {activeTab === 'instagram' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {/* Instagram Feed will be implemented here */}
                <div className="text-center col-span-full">
                  <Button
                    variant="outline"
                    onClick={() => window.open(socialLinks.instagram, '_blank')}
                    className="flex items-center gap-2"
                  >
                    <Instagram className="w-5 h-5" />
                    Follow us on Instagram
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Facebook Feed */}
            {activeTab === 'facebook' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* Facebook Feed will be implemented here */}
                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => window.open(socialLinks.facebook, '_blank')}
                    className="flex items-center gap-2"
                  >
                    <Facebook className="w-5 h-5" />
                    Visit our Facebook Page
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudioPage;
