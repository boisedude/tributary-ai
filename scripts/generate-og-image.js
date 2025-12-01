const sharp = require('sharp');

// Create a 1200x630 OG image with Tributary AI branding
const width = 1200;
const height = 630;

// Brand colors from globals.css
const oxfordBlue = '#0F172A';
const teal = '#14B8A6';
const coral = '#F97316';

// Create SVG with gradient and text
const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${oxfordBlue};stop-opacity:1" />
      <stop offset="50%" style="stop-color:#1E293B;stop-opacity:1" />
      <stop offset="100%" style="stop-color:${teal};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${teal};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${coral};stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>

  <!-- Decorative circles -->
  <circle cx="150" cy="120" r="200" fill="${teal}" opacity="0.1"/>
  <circle cx="1050" cy="510" r="200" fill="${coral}" opacity="0.1"/>

  <!-- Main text -->
  <text x="600" y="260" font-family="Inter, system-ui, sans-serif" font-size="80" font-weight="700" text-anchor="middle" fill="url(#textGradient)">
    Tributary AI
  </text>

  <!-- Subtitle -->
  <text x="600" y="340" font-family="Inter, system-ui, sans-serif" font-size="38" font-weight="400" text-anchor="middle" fill="#FFFFFF" opacity="0.95">
    AI Business Consulting for Idaho
  </text>

  <!-- Tagline -->
  <text x="600" y="450" font-family="Inter, system-ui, sans-serif" font-size="28" font-weight="300" text-anchor="middle" fill="#FFFFFF" opacity="0.8">
    Where Business Experience Meets Intelligent Innovation
  </text>

  <!-- Bottom accent line -->
  <line x1="300" y1="550" x2="900" y2="550" stroke="url(#textGradient)" stroke-width="3" opacity="0.6"/>
</svg>
`;

// Generate PNG from SVG
sharp(Buffer.from(svg))
  .png()
  .toFile('./public/og-image.png')
  .then(() => {
    console.log('✓ Open Graph image generated successfully at public/og-image.png');
  })
  .catch(err => {
    console.error('Error generating OG image:', err);
    process.exit(1);
  });
