const fs = require('fs');
const code = fs.readFileSync('docs/research/belgrade-arbor/chunks/0rr1c7aibu-sx.js', 'utf8');

// turbopack modules
const regex = /TURBOPACK.*?push\(\[.*?,(\d+),/g;
let m;
const modules = [];
while ((m = regex.exec(code)) !== null) {
  modules.push(m[1]);
}
console.log('Module IDs in 0rr1c7aibu-sx.js:', modules);

// Let's search for Introduction, Roots, Horizontal code blocks
const introIdx = code.indexOf('id="Introduction"');
console.log('Intro index:', introIdx);
if (introIdx !== -1) {
  console.log('Intro snippet:\n', code.slice(Math.max(0, introIdx - 1000), introIdx + 1500));
}

const rootsIdx = code.indexOf('id="Roots"');
console.log('Roots index:', rootsIdx);
if (rootsIdx !== -1) {
  console.log('Roots snippet:\n', code.slice(Math.max(0, rootsIdx - 1000), rootsIdx + 1500));
}

const horizIdx = code.indexOf('id="Horizontal"');
console.log('Horiz index:', horizIdx);
if (horizIdx !== -1) {
  console.log('Horiz snippet:\n', code.slice(Math.max(0, horizIdx - 1000), horizIdx + 1500));
}
