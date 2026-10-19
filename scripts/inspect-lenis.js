const fs = require('fs');
const code = fs.readFileSync('docs/research/belgrade-arbor/chunks/09j7w4tn._mx1.js', 'utf8');

const pos = code.indexOf('useLenis');
console.log('useLenis pos:', pos);
if (pos !== -1) {
  console.log(code.slice(pos - 300, pos + 800));
}

const lenisPos = code.indexOf('new o(');
console.log('new o (Lenis) pos:', lenisPos);
if (lenisPos !== -1) {
  console.log(code.slice(lenisPos - 200, lenisPos + 500));
}
