const fs = require('fs');
const path = require('path');

const dir = 'docs/research/belgrade-arbor/chunks';
const files = fs.readdirSync(dir);

for (const f of files) {
  const code = fs.readFileSync(path.join(dir, f), 'utf8');
  if (code.includes('unitsAvailable') || code.includes('viewAll') || code.includes('withoutLivingRoom')) {
    console.log(`FOUND in ${f}:`);
    const idx = code.indexOf('withoutLivingRoom');
    console.log(code.slice(Math.max(0, idx - 200), idx + 800));
  }
}
