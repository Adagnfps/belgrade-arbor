const fs = require('fs');

const html = fs.readFileSync('scripts/live-page.html', 'utf8');

const sectionIds = [
  'Introduction',
  'Location',
  'Around',
  'Residences',
  'ResidenceOptions',
  'BusinessSpaces',
  'BusinessSpacesOptions',
  'Roots',
  'Amenities',
  'AmenitiesOptions',
  'Horizontal',
  'Installment'
];

for (const id of sectionIds) {
  const start = html.indexOf(`id="${id}"`);
  if (start !== -1) {
    // Find next section tag or EOF
    const nextStart = html.indexOf('<section', start + 1);
    const sectionHtml = nextStart !== -1 ? html.slice(start, nextStart) : html.slice(start, start + 3000);
    console.log(`\n==================== LIVE SECTION: ${id} (Length: ${sectionHtml.length}) ====================`);
    // extract main classes and first 800 chars
    console.log(sectionHtml.slice(0, 800).replace(/\s+/g, ' '));
  } else {
    console.log(`\n==================== LIVE SECTION: ${id} NOT FOUND ====================`);
  }
}
