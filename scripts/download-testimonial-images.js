import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create testimonials directory if it doesn't exist
const testimonialsDir = path.join(__dirname, '..', 'public', 'testimonials');
if (!fs.existsSync(testimonialsDir)) {
  fs.mkdirSync(testimonialsDir, { recursive: true });
}

// Array of professional avatar/client images from Unsplash
const imageUrls = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108755-2616b9c5e8e1?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop&crop=face'
];

// Function to download image
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(testimonialsDir, filename));
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${filename}`);
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(path.join(testimonialsDir, filename), () => {}); // Delete the file on error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Download all images
async function downloadAllImages() {
  console.log('🚀 Starting testimonial image downloads...');
  console.log(`📁 Saving to: ${testimonialsDir}`);
  
  try {
    for (let i = 0; i < imageUrls.length; i++) {
      const filename = `client${i + 1}.jpg`;
      await downloadImage(imageUrls[i], filename);
      
      // Add a small delay to be respectful to the server
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('🎉 All testimonial images downloaded successfully!');
    console.log(`📊 Total images: ${imageUrls.length}`);
    
    // List downloaded files
    const files = fs.readdirSync(testimonialsDir);
    console.log('📋 Downloaded files:');
    files.forEach(file => console.log(`   - ${file}`));
    
  } catch (error) {
    console.error('❌ Error downloading images:', error.message);
  }
}

// Alternative function to download from different sources
function downloadFromAlternativeSources() {
  const alternativeUrls = [
    'https://randomuser.me/api/portraits/men/1.jpg',
    'https://randomuser.me/api/portraits/women/1.jpg',
    'https://randomuser.me/api/portraits/men/2.jpg',
    'https://randomuser.me/api/portraits/women/2.jpg',
    'https://randomuser.me/api/portraits/men/3.jpg',
    'https://randomuser.me/api/portraits/women/3.jpg',
    'https://randomuser.me/api/portraits/men/4.jpg',
    'https://randomuser.me/api/portraits/women/4.jpg',
    'https://randomuser.me/api/portraits/men/5.jpg'
  ];
  
  console.log('🔄 Using alternative image sources...');
  
  alternativeUrls.forEach(async (url, index) => {
    try {
      const filename = `client${index + 1}.jpg`;
      await downloadImage(url, filename);
    } catch (error) {
      console.error(`❌ Failed to download ${url}:`, error.message);
    }
  });
}

// Check command line arguments
const args = process.argv.slice(2);
if (args.includes('--alternative')) {
  downloadFromAlternativeSources();
} else {
  downloadAllImages();
}

// Export for use in other scripts
export {
  downloadImage,
  downloadAllImages,
  testimonialsDir
};
