const fs = require('fs');
const code = fs.readFileSync('docs/research/belgrade-arbor/chunks/0rr1c7aibu-sx.js', 'utf8');

// Let's extract Horizontal (around index 3000 to 7000)
fs.writeFileSync('docs/research/belgrade-arbor/chunks/horizontal-code.js', code.slice(3000, 7500));

// Let's find Introduction: search for 'Introduction'
const introPos = code.indexOf('"Home.Introduction"');
console.log('introPos:', introPos);
if (introPos !== -1) {
  fs.writeFileSync('docs/research/belgrade-arbor/chunks/intro-code.js', code.slice(introPos - 500, introPos + 26000));
}

// Let's find Roots: search for 'Home.Roots'
const rootsPos = code.indexOf('"Home.Roots"');
console.log('rootsPos:', rootsPos);
if (rootsPos !== -1) {
  fs.writeFileSync('docs/research/belgrade-arbor/chunks/roots-code.js', code.slice(rootsPos - 500, rootsPos + 15000));
}

console.log('Extracted code files written.');
