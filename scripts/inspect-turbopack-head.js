const fs = require('fs');

const turbopack = fs.readFileSync('docs/research/belgrade-arbor/chunks/turbopack-11d20dr7kd-ys.js', 'utf8');

console.log(turbopack.slice(0, 1500));
