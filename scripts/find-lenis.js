const fs = require('fs');
const code = fs.readFileSync('docs/research/belgrade-arbor/chunks/09j7w4tn._mx1.js', 'utf8');

const regex = /lenis/gi;
let match;
while ((match = regex.exec(code)) !== null) {
  console.log(`Match at ${match.index}:`);
  console.log(code.slice(Math.max(0, match.index - 100), match.index + 200));
  console.log('---');
}
