const fs = require('fs');

const aroundHtml = fs.readFileSync('docs/research/belgrade-arbor/section-Around.html', 'utf8');

const rightStart = aroundHtml.indexOf('reveal-image');
if (rightStart !== -1) {
  console.log(aroundHtml.slice(rightStart - 100, rightStart + 3000));
}
