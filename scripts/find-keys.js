const fs = require('fs');
const path = require('path');

const dir = 'docs/research/belgrade-arbor/chunks';
const files = fs.readdirSync(dir);

for (const f of files) {
  const code = fs.readFileSync(path.join(dir, f), 'utf8');
  ['ResidenceOptions', 'BusinessSpacesOptions', 'AmenitiesOptions'].forEach(key => {
    if (code.includes(key)) {
      console.log(`Key ${key} in ${f}`);
    }
  });
}
