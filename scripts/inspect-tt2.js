const fs = require('fs');
const code = fs.readFileSync('docs/research/belgrade-arbor/chunks/0rr1c7aibu-sx.js', 'utf8');

const ttPos = code.indexOf('function tt(');
if (ttPos !== -1) {
  console.log(code.slice(ttPos, ttPos + 4000));
}
