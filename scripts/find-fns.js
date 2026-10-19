const fs = require('fs');
const code = fs.readFileSync('docs/research/belgrade-arbor/chunks/0rr1c7aibu-sx.js', 'utf8');

['function eS(', 'function e_(', 'function eI(', 'function eV('].forEach(fn => {
  const pos = code.indexOf(fn);
  console.log(fn, pos);
  if (pos !== -1) {
    console.log(code.slice(pos, pos + 800));
    console.log('---');
  }
});
