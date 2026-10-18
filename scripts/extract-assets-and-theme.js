const fs = require('fs');
const path = require('path');
const https = require('https');

const html = fs.readFileSync('docs/research/belgrade-arbor/page.html', 'utf8');
const css = fs.readFileSync('docs/research/belgrade-arbor/combined.css', 'utf8');

// 1. Theme analysis
console.log('--- THEME ANALYSIS ---');
const colorMatches = [...css.matchAll(/--([a-zA-Z0-9_\-]+):\s*([^;\}]+)/g)];
const uniqueVars = {};
for (const [_, name, val] of colorMatches) {
  if (name.includes('color') || name.includes('background') || name.includes('foreground') || name.includes('pine') || name.includes('vanilla') || name.includes('navy') || name.includes('cream') || name.includes('golden') || name.includes('sand') || name.includes('green') || name.includes('radius')) {
    uniqueVars[name] = val.trim();
  }
}
console.log('Detected Theme Variables:', uniqueVars);

// Also look for inline color hexes and classes
const bgClasses = [...new Set([...html.matchAll(/bg-\[?([#a-zA-Z0-9_\-\/]+)\]?/g)].map(m => m[0]))];
const textClasses = [...new Set([...html.matchAll(/text-\[?([#a-zA-Z0-9_\-\/]+)\]?/g)].map(m => m[0]))];
const borderClasses = [...new Set([...html.matchAll(/border-\[?([#a-zA-Z0-9_\-\/]+)\]?/g)].map(m => m[0]))];

console.log('bgClasses:', bgClasses);
console.log('textClasses:', textClasses);
console.log('borderClasses:', borderClasses);

// 2. Asset Gathering
const assetUrls = new Set();

// From HTML /home/ or /_next/image
const homeMatches = [...html.matchAll(/\/home\/[a-zA-Z0-9_\-\/]+\.(webp|jpg|jpeg|png|svg)/g)].map(m => m[0]);
homeMatches.forEach(u => assetUrls.add(u));

// From HTML next/image params
const nextImageMatches = [...html.matchAll(/url=%2Fhome%2F([^&"]+)\.(webp|jpg|jpeg|png|svg)/g)];
nextImageMatches.forEach(m => {
  const full = '/home/' + decodeURIComponent(m[1]) + '.' + m[2];
  assetUrls.add(full);
});

// From CSS
const cssMedia = [...css.matchAll(/url\(([^)]+)\)/g)].map(m => m[1].replace(/['"]/g, '').trim());
cssMedia.forEach(u => {
  if (u.startsWith('/') || u.startsWith('../media/')) {
    assetUrls.add(u);
  }
});

console.log(`Total unique asset URLs discovered: ${assetUrls.size}`);
fs.writeFileSync('docs/research/belgrade-arbor/assets.json', JSON.stringify([...assetUrls], null, 2));
