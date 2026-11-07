const fs = require('fs');
const path = require('path');

const dir = 'docs/research/belgrade-arbor/live-chunks';

console.log('=== CSS (08lyp3oopz8f3.css) ===');
console.log(fs.readFileSync(path.join(dir, '08lyp3oopz8f3.css'), 'utf8'));

console.log('\n=== BusinessSpacesOptions (0t6f78-uqoue4.js) ===');
const bsCode = fs.readFileSync(path.join(dir, '0t6f78-uqoue4.js'), 'utf8');
console.log(bsCode.slice(0, 3000));

console.log('\n=== AmenitiesOptions (0-eq9er4__8p7.js) ===');
const amCode = fs.readFileSync(path.join(dir, '0-eq9er4__8p7.js'), 'utf8');
console.log(amCode.slice(0, 3000));
