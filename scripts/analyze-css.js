const fs = require('fs');
const path = require('path');

const cssDir = 'docs/research/belgrade-arbor/css';
const cssFiles = fs.readdirSync(cssDir);

let allCss = '';
for (const file of cssFiles) {
  const content = fs.readFileSync(path.join(cssDir, file), 'utf8');
  allCss += '\n/* --- ' + file + ' --- */\n' + content;
}

fs.writeFileSync('docs/research/belgrade-arbor/combined.css', allCss);

// Extract font faces
const fontFaces = [...allCss.matchAll(/@font-face\s*\{([^}]+)\}/gs)].map(m => m[1].trim());
console.log('Font faces found:', fontFaces.length);
fontFaces.forEach((f, i) => console.log(`Font face ${i+1}:\n`, f));

// Extract CSS variables from :root or body
const rootMatches = [...allCss.matchAll(/(:root|body|\.antialiased)\s*\{([^}]+)\}/gs)].map(m => m[2]);
console.log('Root declarations count:', rootMatches.length);
rootMatches.forEach((r, i) => console.log(`Root block ${i+1}:\n`, r.substring(0, 300)));

// Extract font-family references
const fontFamilies = [...new Set([...allCss.matchAll(/font-family:([^;]+);/g)].map(m => m[1].trim()))];
console.log('Font families:', fontFamilies);

// Extract all url() in CSS
const urls = [...new Set([...allCss.matchAll(/url\(([^)]+)\)/g)].map(m => m[1].replace(/['"]/g, '').trim()))];
console.log('URLs in CSS:', urls);
