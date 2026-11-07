const fs = require('fs');

const files = [
  'section-Residences.html',
  'section-ResidenceOptions.html',
  'section-BusinessSpaces.html',
  'section-BusinessSpacesOptions.html',
  'section-Amenities.html',
  'section-AmenitiesOptions.html',
  'section-Horizontal.html',
  'section-Installment.html'
];

for (const file of files) {
  const p = `docs/research/belgrade-arbor/${file}`;
  if (fs.existsSync(p)) {
    const content = fs.readFileSync(p, 'utf8');
    console.log(`\n=== ${file} (${content.length} chars) ===`);
    // print first 500 chars
    console.log(content.slice(0, 500).replace(/\s+/g, ' '));
  } else {
    console.log(`\n=== ${file} NOT FOUND ===`);
  }
}
