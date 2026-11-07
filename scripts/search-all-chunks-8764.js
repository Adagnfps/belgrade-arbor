const fs = require('fs');

const dir = 'docs/research/belgrade-arbor/chunks';
const files = fs.readdirSync(dir);

for (const f of files) {
  const code = fs.readFileSync(dir + '/' + f, 'utf8');
  if (code.includes('8764')) {
    console.log(`8764 found in ${f}`);
    const idx = code.indexOf('8764');
    console.log(code.slice(Math.max(0, idx - 100), idx + 200));
  }
}
