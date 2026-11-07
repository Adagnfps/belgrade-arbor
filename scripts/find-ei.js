const fs = require('fs');

const code = fs.readFileSync('docs/research/belgrade-arbor/chunks/0rr1c7aibu-sx.formatted.js', 'utf8');

// Find all occurrences of eI
let pos = 0;
while (true) {
  const idx = code.indexOf('(0,r.jsx)(eI', pos);
  if (idx === -1) break;
  console.log('eI called at pos:', idx);
  console.log(code.slice(idx - 200, idx + 1000));
  pos = idx + 1;
}
