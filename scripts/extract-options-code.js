const fs = require('fs');

const code = fs.readFileSync('docs/research/belgrade-arbor/chunks/0rr1c7aibu-sx.formatted.js', 'utf8');

function findSnippet(keyword, length = 1500) {
  const idx = code.indexOf(keyword);
  if (idx !== -1) {
    console.log(`\n=== SNIPPET FOR ${keyword} (at pos ${idx}) ===`);
    console.log(code.slice(idx - 100, idx + length));
  } else {
    console.log(`\n=== KEYWORD NOT FOUND: ${keyword} ===`);
  }
}

findSnippet('ResidenceOptions');
findSnippet('BusinessSpacesOptions');
findSnippet('AmenitiesOptions');
