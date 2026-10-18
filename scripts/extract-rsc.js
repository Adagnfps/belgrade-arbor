const fs = require('fs');

const html = fs.readFileSync('docs/research/belgrade-arbor/page.html', 'utf8');

// Match all self.__next_f.push([1, "..."])
const rscPushes = [...html.matchAll(/self\.__next_f\.push\(\[1,\s*"(.*?)"\]\)/gs)];
console.log('RSC pushes found:', rscPushes.length);

let combinedRsc = '';
for (const [_, content] of rscPushes) {
  // unescape \" and \\
  const unescaped = content
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
    .replace(/\\n/g, '\n');
  combinedRsc += unescaped + '\n';
}

fs.writeFileSync('docs/research/belgrade-arbor/rsc-data.txt', combinedRsc);
console.log('Saved rsc-data.txt, size:', combinedRsc.length);

// Let's find JSON objects inside
// Look for ResidenceOptions, AmenitiesOptions, etc.
const residenceOptionsMatch = combinedRsc.match(/"ResidenceOptions":\s*(\{.*?\})/);
if (residenceOptionsMatch) {
  console.log('ResidenceOptions found!');
}

// Find all occurrences of keys
const keys = ['residenceTypes', 'amenities', 'businessSpaces', 'around', 'installment', 'introduction'];
for (const k of keys) {
  const m = combinedRsc.match(new RegExp(`"${k}":\\s*(\\[.*?\\]|\\{.*?\\})`));
  if (m) {
    console.log(`Key ${k} found:`, m[0].substring(0, 150));
  }
}
