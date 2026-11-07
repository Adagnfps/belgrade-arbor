const fs = require('fs');

const html = fs.readFileSync('docs/research/belgrade-arbor/page.html', 'utf8');

// Match sections
const sections = [];
const regex = /<section[^>]*>/g;
let match;
while ((match = regex.exec(html)) !== null) {
  sections.push(match[0]);
}

console.log('--- SECTIONS IN REAL LIVE PAGE.HTML ---');
sections.forEach((s, i) => console.log(`${i + 1}: ${s.slice(0, 150)}...`));

console.log('\n--- HEADINGS IN REAL LIVE PAGE.HTML ---');
const headings = [...html.matchAll(/<h[1-4][^>]*>(.*?)<\/h[1-4]>/gs)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
headings.forEach((h, i) => console.log(`${i + 1}: ${h.slice(0, 80)}`));
