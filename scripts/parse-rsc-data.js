const fs = require('fs');

const rsc = fs.readFileSync('docs/research/belgrade-arbor/rsc-data.txt', 'utf8');

// Find all JSON objects in rsc by searching for chunks that start with { and end with }
// or let's search for "en" or english strings
const lines = rsc.split('\n');
console.log('Total lines:', lines.length);

// Let's search for Studio, One-bedroom, Two-bedroom etc.
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('ResidenceOptions') || line.includes('AmenitiesOptions') || line.includes('BusinessSpacesOptions')) {
    console.log(`Line ${i} matches options:`, line.substring(0, 300));
    fs.writeFileSync(`docs/research/belgrade-arbor/options-line-${i}.txt`, line);
  }
}
