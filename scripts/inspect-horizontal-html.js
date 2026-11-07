const fs = require('fs');

const hHtml = fs.readFileSync('docs/research/belgrade-arbor/section-Horizontal.html', 'utf8');
console.log('Horizontal length:', hHtml.length);
console.log(hHtml);
