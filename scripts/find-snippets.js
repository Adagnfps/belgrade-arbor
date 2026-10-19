const fs = require('fs');
const code = fs.readFileSync('docs/research/belgrade-arbor/chunks/0rr1c7aibu-sx.js', 'utf8');

function findSnippets(term) {
  let idx = 0;
  console.log(`=== Matches for ${term} ===`);
  while ((idx = code.indexOf(term, idx)) !== -1) {
    console.log(`[pos ${idx}]:`, code.slice(Math.max(0, idx - 150), idx + 250));
    console.log('---');
    idx += term.length;
  }
}

findSnippets('Introduction');
findSnippets('Roots');
findSnippets('Horizontal');
findSnippets('ScrollTrigger');
