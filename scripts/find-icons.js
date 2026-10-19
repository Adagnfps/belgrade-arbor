const fs = require('fs');
const content = fs.readFileSync('docs/research/belgrade-arbor/chunks/00xx30o3ajzic.js', 'utf8');
const idx = content.indexOf('65144,e=>{');
const chunk = content.slice(idx, idx + 80000);
const matches = [...chunk.matchAll(/\b([a-zA-Z0-9_]+):\{viewBox:"([^"]+)"/g)];
console.log('Found icons:', matches.map(m => m[1]));
for (const m of matches) {
  if (['car', 'walk', 'logo_symbol', 'cube', 'pdf'].includes(m[1])) {
    const start = chunk.indexOf(`${m[1]}:{viewBox`);
    console.log(`\n=== ICON: ${m[1]} ===`);
    console.log(chunk.slice(start, start + 600));
  }
}
