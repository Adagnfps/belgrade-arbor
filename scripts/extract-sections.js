const fs = require('fs');
const html = fs.readFileSync('docs/research/belgrade-arbor/page.html', 'utf8');

// Find all sections by id
const sectionIds = [
  'Introduction',
  'IntroductionMobile',
  'Location',
  'Around',
  'Residences',
  'ResidenceOptions',
  'BusinessSpaces',
  'BusinessSpacesOptions',
  'Roots',
  'RootsMobile',
  'Amenities',
  'AmenitiesOptions',
  'Horizontal',
  'Installment'
];

const parsedSections = {};

for (const id of sectionIds) {
  const regex = new RegExp(`<section id="${id}"[^>]*>(.*?)</section>`, 's');
  const match = html.match(regex);
  if (match) {
    parsedSections[id] = match[0];
    fs.writeFileSync(`docs/research/belgrade-arbor/section-${id}.html`, match[0]);
    console.log(`Saved section-${id}.html (${match[0].length} chars)`);
  } else {
    console.log(`Section ${id} not found by direct regex, trying looser match`);
    const loose = html.match(new RegExp(`<section[^>]*id="${id}"[^>]*>`, 's'));
    if (loose) {
      console.log(`Found start tag:`, loose[0]);
    }
  }
}

// Find navbar
const navMatch = html.match(/<div class="[^"]*fixed top-6 left-1\/2[^"]*"[^>]*>.*?<\/div><\/div><\/div>/s);
if (navMatch) {
  fs.writeFileSync('docs/research/belgrade-arbor/navbar.html', navMatch[0]);
  console.log('Saved navbar.html');
}

// Find footer
const footerMatch = html.match(/<footer[^>]*>.*?<\/footer>/s);
if (footerMatch) {
  fs.writeFileSync('docs/research/belgrade-arbor/footer.html', footerMatch[0]);
  console.log('Saved footer.html');
} else {
  console.log('Footer tag not found, searching id=Footer or class=footer');
  const fMatch = html.match(/<div[^>]*id="Footer"[^>]*>.*?<\/div>/s) || html.match(/id="Footer"[^>]*>.*?$/s);
  if (fMatch) {
    fs.writeFileSync('docs/research/belgrade-arbor/footer.html', fMatch[0]);
    console.log('Saved footer by id');
  }
}
