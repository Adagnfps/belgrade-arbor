const fs = require('fs');

const code = fs.readFileSync('docs/research/belgrade-arbor/chunks/0rr1c7aibu-sx.formatted.js', 'utf8');

function findVar(name) {
  const regex = new RegExp(`(?:function|var|let|const)\\s+${name}\\b`);
  const match = code.match(regex);
  if (match) {
    const start = match.index;
    console.log(`\n=== DECLARATION ${name} (at pos ${start}) ===`);
    console.log(code.slice(start, start + 3000));
  } else {
    // Also look for name = ...
    const idx = code.indexOf(name + '=');
    if (idx !== -1) {
      console.log(`\n=== ASSIGNMENT ${name} ===`);
      console.log(code.slice(idx, idx + 3000));
    } else {
      console.log(`DECLARATION ${name} not found`);
    }
  }
}

findVar('eR');
findVar('eF');
findVar('e2');
