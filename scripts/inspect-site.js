const fs = require('fs');
const https = require('https');
const path = require('path');

const html = fs.readFileSync('docs/research/belgrade-arbor/page.html', 'utf8');

// Find CSS files
const cssMatches = [...html.matchAll(/href="(\/_next\/static\/chunks\/[^"]+\.css[^"]*)"/g)].map(m => m[1]);
console.log('CSS files:', cssMatches);

// Find Preload images
const imgPreloads = [...html.matchAll(/imageSrcSet="([^"]+)"/g)].map(m => m[1]);
console.log('Image Preloads:', imgPreloads);

// Find all image tags
const imgTags = [...html.matchAll(/<img[^>]+src="([^"]+)"[^>]*>/g)].map(m => m[1]);
console.log('Img tags count:', imgTags.length);
console.log('Img samples:', imgTags.slice(0, 15));

// Find all Next.js images
const nextImgs = [...html.matchAll(/\/home\/[a-zA-Z0-9_\-\/]+\.(webp|jpg|jpeg|png|svg)/g)].map(m => m[0]);
console.log('Next Image assets detected count:', [...new Set(nextImgs)].length);
console.log('Sample assets:', [...new Set(nextImgs)].slice(0, 20));

// Find all headings
const headings = [...html.matchAll(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gs)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Headings:', headings);

// Find sections or structural divs
const sections = [...html.matchAll(/<section[^>]*>(.*?)<\/section>/gs)].map(m => {
  return m[0].substring(0, 200).replace(/\n/g, ' ');
});
console.log('Sections found:', sections.length);
sections.forEach((s, i) => console.log(`Section ${i+1}:`, s));
