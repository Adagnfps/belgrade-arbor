const fs = require('fs');

console.log('==================== section-Residences.html ====================');
console.log(fs.readFileSync('docs/research/belgrade-arbor/section-Residences.html', 'utf8'));

console.log('\n==================== section-BusinessSpaces.html ====================');
console.log(fs.readFileSync('docs/research/belgrade-arbor/section-BusinessSpaces.html', 'utf8'));

console.log('\n==================== section-Amenities.html ====================');
console.log(fs.readFileSync('docs/research/belgrade-arbor/section-Amenities.html', 'utf8'));
