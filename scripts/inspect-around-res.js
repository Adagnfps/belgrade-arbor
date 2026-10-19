const fs = require('fs');
const code = fs.readFileSync('docs/research/belgrade-arbor/chunks/0rr1c7aibu-sx.js', 'utf8');

const sIdx = code.indexOf('id="Around"');
console.log('Around id index:', sIdx);
if (sIdx !== -1) {
  console.log('Around snippet:\n', code.slice(Math.max(0, sIdx - 800), sIdx + 1200));
}

const resIdx = code.indexOf('id="Residences"');
console.log('Residences id index:', resIdx);
if (resIdx !== -1) {
  console.log('Residences snippet:\n', code.slice(Math.max(0, resIdx - 800), resIdx + 1200));
}
