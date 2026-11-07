const fs = require('fs');

const code = fs.readFileSync('docs/research/belgrade-arbor/chunks/0rr1c7aibu-sx.formatted.js', 'utf8');

// Find the page component that lists the sections
const pageRegex = /function\s+Page\b|function\s+HomePage\b|function\s+[a-zA-Z0-9_]+\s*\([^)]*\)\s*\{[^}]*Introduction[^}]*Location/g;
// Or search for all uses of (0,r.jsx)(e_
// Let's search for "id:\"Location\"" or similar
const locIdx = code.indexOf('id:"Location"');
console.log('Around Location:', locIdx);
console.log(code.slice(locIdx - 500, locIdx + 1500));
