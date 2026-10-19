const fs = require('fs');

const code = fs.readFileSync('docs/research/belgrade-arbor/chunks/0rr1c7aibu-sx.js', 'utf8');

// Let's beautify or search for functions
fs.writeFileSync('docs/research/belgrade-arbor/chunks/0rr1c7aibu-sx.formatted.js', code.replace(/;/g, ';\n').replace(/{/g, '{\n').replace(/}/g, '\n}\n'));
console.log('Formatted written. Length:', code.length);
