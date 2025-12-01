const sharp = require('sharp');
const path = require('path');

const SOURCE_DIR = '/mnt/c/Users/mcoop/OneDrive/Desktop/AI';
const OUTPUT_DIR = '/mnt/c/Projects/Tributary.ai/tributary-site/public';

async function processLogos() {
  console.log('🎨 Processing and cropping logos...\n');

  const logoOnlyPath = path.join(SOURCE_DIR, 'LogoOnly.png');

  try {
    const metadata = await sharp(logoOnlyPath).metadata();
    console.log(`LogoOnly.png: ${metadata.width}x${metadata.height}`);

    // Tighter crop to isolate just the jellyfish icon
    // Removing the circuit lines on left/top and star on bottom-right
    const iconCrop = {
      left: 380,
      top: 200,
      width: 380,
      height: 540
    };

    // Create cropped icon (square version for favicon) with dark blue background
    const bgColor = { r: 15, g: 23, b: 42, alpha: 1 }; // Matches the logo background

    await sharp(logoOnlyPath)
      .extract(iconCrop)
      .resize(512, 512, { fit: 'contain', background: bgColor })
      .png()
      .toFile(path.join(OUTPUT_DIR, 'icon-512.png'));
    console.log('✅ Created icon-512.png (512x512)');

    await sharp(logoOnlyPath)
      .extract(iconCrop)
      .resize(192, 192, { fit: 'contain', background: bgColor })
      .png()
      .toFile(path.join(OUTPUT_DIR, 'icon-192.png'));
    console.log('✅ Created icon-192.png (192x192)');

    await sharp(logoOnlyPath)
      .extract(iconCrop)
      .resize(32, 32, { fit: 'contain', background: bgColor })
      .png()
      .toFile(path.join(OUTPUT_DIR, 'favicon.png'));
    console.log('✅ Created favicon.png (32x32)');

    await sharp(logoOnlyPath)
      .extract(iconCrop)
      .resize(48, 48, { fit: 'contain', background: bgColor })
      .png()
      .toFile(path.join(OUTPUT_DIR, 'favicon-48.png'));
    console.log('✅ Created favicon-48.png (48x48)');

    // Header logo - slightly larger
    await sharp(logoOnlyPath)
      .extract(iconCrop)
      .resize(80, 80, { fit: 'contain', background: bgColor })
      .png()
      .toFile(path.join(OUTPUT_DIR, 'logos/logo-header.png'));
    console.log('✅ Updated logos/logo-header.png (80x80)');

    // Footer logo
    await sharp(logoOnlyPath)
      .extract(iconCrop)
      .resize(96, 96, { fit: 'contain', background: bgColor })
      .png()
      .toFile(path.join(OUTPUT_DIR, 'logos/logo-footer.png'));
    console.log('✅ Updated logos/logo-footer.png (96x96)');

    // Apple touch icon
    await sharp(logoOnlyPath)
      .extract(iconCrop)
      .resize(180, 180, { fit: 'contain', background: bgColor })
      .png()
      .toFile(path.join(OUTPUT_DIR, 'apple-touch-icon.png'));
    console.log('✅ Created apple-touch-icon.png (180x180)');

  } catch (err) {
    console.error('Error processing LogoOnly.png:', err.message);
  }

  // Process Logo4.png (horizontal logo with text) - crop whitespace
  const logo4Path = path.join(SOURCE_DIR, 'Logo4.png');

  try {
    await sharp(logo4Path)
      .trim()
      .resize(400, null, { fit: 'inside' })
      .png()
      .toFile(path.join(OUTPUT_DIR, 'logos/logo-horizontal.png'));
    console.log('✅ Created logos/logo-horizontal.png (trimmed, max 400px wide)');

  } catch (err) {
    console.error('Error processing Logo4.png:', err.message);
  }

  console.log('\n✨ Logo processing complete!');
}

processLogos().catch(console.error);
