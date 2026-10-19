const fs = require('fs');
const content = fs.readFileSync('docs/research/belgrade-arbor/chunks/roots-code.js', 'utf8');
const imgs = [...content.matchAll(/["'][^"']*roots[^"']*\.(webp|mp4|svg)["']/g)].map(m => m[0]);
console.log('Roots assets referenced in code:', [...new Set(imgs)]);
