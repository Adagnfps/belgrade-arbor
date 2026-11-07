const fs = require('fs');

const rootsHtml = fs.readFileSync('docs/research/belgrade-arbor/section-Roots.html', 'utf8');
console.log('Roots length:', rootsHtml.length);
console.log(rootsHtml.slice(0, 3000));
