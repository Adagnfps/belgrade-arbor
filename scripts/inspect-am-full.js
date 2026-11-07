const fs = require('fs');
const path = require('path');

const amCode = fs.readFileSync('docs/research/belgrade-arbor/live-chunks/0-eq9er4__8p7.js', 'utf8');

const compIdx = amCode.indexOf('amenities-options-trigger');
console.log(amCode.slice(compIdx - 300, compIdx + 3000));
