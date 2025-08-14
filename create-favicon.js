const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Paths
const logoPath = path.join(__dirname, 'image', 'LOGO-KV.png');
const faviconPath = path.join(__dirname, 'public', 'favicon.ico');

// Create directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Convert logo to favicon (multiple sizes for best browser compatibility)
async function createFavicon() {
  try {
    console.log('Reading logo from:', logoPath);
    
    // Create favicon with multiple sizes
    await sharp(logoPath)
      .resize(16, 16)
      .toFile(path.join(__dirname, 'favicon-16.png'));
      
    await sharp(logoPath)
      .resize(32, 32)
      .toFile(path.join(__dirname, 'favicon-32.png'));
      
    await sharp(logoPath)
      .resize(48, 48)
      .toFile(path.join(__dirname, 'favicon-48.png'));
    
    console.log('Favicon images created successfully');
    console.log('Favicon created at:', faviconPath);
    
    // Note: To properly create an .ico file with multiple sizes,
    // you would typically use a tool like 'png-to-ico' or similar
    // For simplicity, we'll just copy the 32x32 version as favicon.ico
    fs.copyFileSync(path.join(__dirname, 'favicon-32.png'), faviconPath);
    
    // Clean up temporary files
    fs.unlinkSync(path.join(__dirname, 'favicon-16.png'));
    fs.unlinkSync(path.join(__dirname, 'favicon-32.png'));
    fs.unlinkSync(path.join(__dirname, 'favicon-48.png'));
    
    console.log('Favicon process completed successfully');
  } catch (error) {
    console.error('Error creating favicon:', error);
  }
}

createFavicon();
