import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BeforeAfterImage {
  id: number;
  beforeImage: string;
  afterImage: string;
  title: string;
  description: string;
}

const BeforeAfterSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sample before/after data - you can replace with actual project images
  const beforeAfterData: BeforeAfterImage[] = [
    {
      id: 1,
      beforeImage: '/images/projects/IMG-20250626-WA0010.jpg',
      afterImage: '/images/projects/IMG-20250626-WA0016.jpg',
      title: 'Residential Renovation',
      description: 'Complete transformation of a traditional home into a modern living space'
    },
    {
      id: 2,
      beforeImage: '/images/projects/IMG-20250626-WA0025.jpg',
      afterImage: '/images/projects/IMG-20250628-WA0001.jpg',
      title: 'Commercial Space Design',
      description: 'Converting an old building into a contemporary commercial space'
    },
    {
      id: 3,
      beforeImage: '/images/projects/IMG-20250628-WA0010.jpg',
      afterImage: '/images/projects/IMG-20250628-WA0011.jpg',
      title: 'Interior Makeover',
      description: 'Modern interior design transformation with contemporary elements'
    }
  ];

  const currentItem = beforeAfterData[currentIndex];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSliderPosition(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      updateSliderPosition(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateSliderPositionTouch(e);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      updateSliderPositionTouch(e);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const updateSliderPosition = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    }
  };

  const updateSliderPositionTouch = (e: React.TouchEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % beforeAfterData.length);
    setSliderPosition(50); // Reset slider position
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + beforeAfterData.length) % beforeAfterData.length);
    setSliderPosition(50); // Reset slider position
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalTouchEnd = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchend', handleGlobalTouchEnd);
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging]);

  return (
    <section className="py-20 bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 from-gray-50 via-white to-gray-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Before & After
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See the incredible transformations we've achieved for our clients. Drag the slider to reveal the magic of our architectural expertise.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Image Container */}
            <div
              ref={containerRef}
              className="relative aspect-[16/10] cursor-col-resize select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Before Image */}
              <div className="absolute inset-0">
                <img
                  src={currentItem.beforeImage}
                  alt="Before"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  BEFORE
                </div>
              </div>

              {/* After Image */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src={currentItem.afterImage}
                  alt="After"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  AFTER
                </div>
              </div>

              {/* Slider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10 cursor-col-resize"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="p-6 bg-white dark:bg-gray-800">
              <h3 className="text-2xl font-bold mb-2 text-foreground">{currentItem.title}</h3>
              <p className="text-muted-foreground">{currentItem.description}</p>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 p-3 rounded-full shadow-lg transition-all duration-300 z-20"
            >
              <ChevronLeft size={24} className="text-gray-700 dark:text-gray-300" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 p-3 rounded-full shadow-lg transition-all duration-300 z-20"
            >
              <ChevronRight size={24} className="text-gray-700 dark:text-gray-300" />
            </button>
          </motion.div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {beforeAfterData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setSliderPosition(50);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-blue-500 w-8'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-muted-foreground">
              💡 Drag the slider or click and hold to see the transformation
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
