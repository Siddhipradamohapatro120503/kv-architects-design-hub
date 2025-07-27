# Testimonial Image Download Script

This script downloads professional avatar images from the internet to use as testimonial client photos.

## Usage

### Method 1: Using npm scripts (Recommended)

```bash
# Download images from Unsplash (high quality, professional)
npm run download-images

# Download images from RandomUser.me (alternative source)
npm run download-images:alt
```

### Method 2: Direct execution

```bash
# From the project root directory
node scripts/download-testimonial-images.js

# Using alternative sources
node scripts/download-testimonial-images.js --alternative
```

## Image Sources

### Primary Source (Unsplash)
- High-quality professional portraits
- Diverse representation
- Optimized for web use (400x400px)
- Face-cropped for consistency

### Alternative Source (RandomUser.me)
- Generated user portraits
- Consistent sizing
- Good fallback option

## Output

- Images are saved to: `public/testimonials/`
- Filenames: `client1.jpg`, `client2.jpg`, etc.
- Format: JPEG
- Size: 400x400px (optimized for testimonial cards)

## Features

- ✅ Automatic directory creation
- ✅ Error handling and retry logic
- ✅ Progress logging
- ✅ Respectful rate limiting (500ms delay between downloads)
- ✅ File verification
- ✅ Multiple image sources

## Troubleshooting

If downloads fail:

1. Check your internet connection
2. Try the alternative source: `npm run download-images:alt`
3. Manually verify the `public/testimonials/` directory exists
4. Check console output for specific error messages

## Customization

To add more image sources or modify the script:

1. Edit `scripts/download-testimonial-images.js`
2. Add URLs to the `imageUrls` array
3. Modify the `downloadImage` function for different formats
4. Update the testimonial count in the main component

## Integration

The downloaded images are automatically used by the `Testimonials` component:
- Path: `src/components/Testimonials.tsx`
- Image references: `/testimonials/client1.jpg` to `/testimonials/client9.jpg`

## Security Note

This script only downloads images from trusted sources (Unsplash and RandomUser.me). All downloads are over HTTPS and no personal data is collected or stored.
