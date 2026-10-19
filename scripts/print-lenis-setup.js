const fs = require('fs');
const code = fs.readFileSync('docs/research/belgrade-arbor/chunks/09j7w4tn._mx1.js', 'utf8');

console.log(code.slice(17600, 18600));
