const fs = require('fs');

const data = JSON.parse(fs.readFileSync('docs/research/belgrade-arbor/en-messages.json', 'utf8'));

console.log('=== ResidenceOptions ===');
console.log(JSON.stringify(data.messages.Home.ResidenceOptions, null, 2));

console.log('\n=== BusinessSpacesOptions ===');
console.log(JSON.stringify(data.messages.Home.BusinessSpacesOptions, null, 2));

console.log('\n=== AmenitiesOptions ===');
console.log(JSON.stringify(data.messages.Home.AmenitiesOptions, null, 2));
