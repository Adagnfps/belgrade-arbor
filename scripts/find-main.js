const fs = require('fs');

const code = fs.readFileSync('docs/research/belgrade-arbor/chunks/0rr1c7aibu-sx.formatted.js', 'utf8');

const idx = code.indexOf('"main"');
console.log('Search for "main":', idx);
if (idx !== -1) {
  console.log(code.slice(idx - 100, idx + 2500));
} else {
  // search for all component calls in export default
  const exportIdx = code.lastIndexOf('export default');
  console.log('Export default at:', exportIdx);
  console.log(code.slice(exportIdx, exportIdx + 2000));
}
