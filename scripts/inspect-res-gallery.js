const fs = require('fs');
const path = require('path');

const resCode = fs.readFileSync('docs/research/belgrade-arbor/live-chunks/095uk5okkp766.js', 'utf8');

// search for keen-slider or gallery
const idx = resCode.indexOf('residence-gallery-parallaxWrap');
console.log(resCode.slice(idx - 300, idx + 2500));
