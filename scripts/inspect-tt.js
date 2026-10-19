const fs = require('fs');
const code = fs.readFileSync('docs/research/belgrade-arbor/chunks/roots-code.js', 'utf8');

const ttPos = code.indexOf('function tt(');
if (ttPos !== -1) {
  console.log(code.slice(ttPos, ttPos + 3000));
}
