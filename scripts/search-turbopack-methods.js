const fs = require('fs');

const turbopack = fs.readFileSync('docs/research/belgrade-arbor/chunks/turbopack-11d20dr7kd-ys.js', 'utf8');

const regex = /u\.[A-Z]\s*=\s*function/g;
let m;
while ((m = regex.exec(turbopack)) !== null) {
  console.log(m[0], 'at', m.index);
  console.log(turbopack.slice(m.index, m.index + 300));
}
