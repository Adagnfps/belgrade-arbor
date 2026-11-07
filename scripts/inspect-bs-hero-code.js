const fs = require('fs');

const code = fs.readFileSync('docs/research/belgrade-arbor/chunks/0rr1c7aibu-sx.formatted.js', 'utf8');

const idx = code.indexOf('id:"BusinessSpaces"');
console.log(code.slice(idx, idx + 2500));
