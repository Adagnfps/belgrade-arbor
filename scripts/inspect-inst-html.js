const fs = require('fs');

const instHtml = fs.readFileSync('docs/research/belgrade-arbor/section-Installment.html', 'utf8');
console.log('Installment length:', instHtml.length);
console.log(instHtml.slice(0, 3000));
