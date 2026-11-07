const fs = require('fs');
const path = require('path');

const dir = 'docs/research/belgrade-arbor/live-chunks';

console.log('=== ResidenceOptions (095uk5okkp766.js) ===');
const resCode = fs.readFileSync(path.join(dir, '095uk5okkp766.js'), 'utf8');
// find the export component
const compIdx = resCode.indexOf('residence-options-trigger');
console.log(resCode.slice(compIdx - 300, compIdx + 3500));
