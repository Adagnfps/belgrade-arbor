const fs = require('fs');
const path = require('path');

const dir = 'docs/research/belgrade-arbor/chunks';
const files = fs.readdirSync(dir);

for (const file of files) {
  if (!file.endsWith('.js')) continue;
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const pos = content.indexOf('useAnimation');
  if (pos !== -1) {
    console.log(`Found useAnimation in ${file} at ${pos}`);
    console.log(content.slice(Math.max(0, pos - 200), pos + 400));
    console.log('---');
  }
}
