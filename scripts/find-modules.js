const fs = require('fs');
const path = require('path');

const dir = 'docs/research/belgrade-arbor/chunks';
const files = fs.readdirSync(dir);

const modules = [8764, 28954, 13744, 34827, 16721, 51271, 25709, 70090, 73108];

for (const mod of modules) {
  let found = false;
  for (const f of files) {
    const code = fs.readFileSync(path.join(dir, f), 'utf8');
    // webpack/turbopack module definition pattern
    const patterns = [
      `"${mod}":`,
      `'${mod}':`,
      `[${mod}]:`,
      `function(${mod},`,
      `e.d(t,${mod}`,
      `${mod}:`
    ];
    for (const p of patterns) {
      if (code.includes(p)) {
        console.log(`Module ${mod} matched in ${f} with pattern ${p}`);
        found = true;
        break;
      }
    }
    if (found) break;
  }
  if (!found) {
    console.log(`Module ${mod} NOT found directly`);
  }
}
