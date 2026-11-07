const fs = require('fs');
const path = require('path');

const code = fs.readFileSync('docs/research/belgrade-arbor/live-chunks/095uk5okkp766.js', 'utf8');
console.log('Size:', code.length);
console.log(code.slice(0, 3000));
