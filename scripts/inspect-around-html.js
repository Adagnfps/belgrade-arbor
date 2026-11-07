const fs = require('fs');

const aroundHtml = fs.readFileSync('docs/research/belgrade-arbor/section-Around.html', 'utf8');
console.log('Around length:', aroundHtml.length);
console.log(aroundHtml.slice(0, 3000));
