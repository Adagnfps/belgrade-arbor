const fs = require('fs');
const path = require('path');
const dir = 'docs/research/belgrade-arbor/chunks';

for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith('.js')) continue;
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  if (content.includes('65144')) {
    console.log(`Found 65144 in ${file}`);
    const idx = content.indexOf('65144');
    console.log(content.slice(Math.max(0, idx - 100), idx + 500));
  }
}
