const fs = require('fs');
const path = require('path');

const dir = 'docs/research/belgrade-arbor/chunks';
const files = fs.readdirSync(dir);

for (const f of files) {
  const code = fs.readFileSync(path.join(dir, f), 'utf8');
  if (code.includes('unitsAvailable') || code.includes('Studio') || code.includes('One Bedroom')) {
    console.log(`Found apartment options in: ${f} (${code.length} bytes)`);
  }
  if (code.includes('Wing A') || code.includes('Wing B') || code.includes('retail and hospitality')) {
    console.log(`Found business spaces options in: ${f} (${code.length} bytes)`);
  }
  if (code.includes('Private fitness space') || code.includes('Rooftop') && code.includes('amenitiesTypes')) {
    console.log(`Found amenities options in: ${f} (${code.length} bytes)`);
  }
}
