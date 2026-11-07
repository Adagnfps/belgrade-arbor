const fs = require('fs');

const code = fs.readFileSync('docs/research/belgrade-arbor/chunks/0rr1c7aibu-sx.formatted.js', 'utf8');

// Find where <main> or the page sections are rendered
const mainIdx = code.indexOf('<main');
if (mainIdx !== -1) {
  console.log('Found <main at:', mainIdx);
  console.log(code.slice(mainIdx - 200, mainIdx + 2000));
} else {
  // search for "Introduction" or "ResidenceOptions" in JSX
  const idx = code.indexOf('IntroductionMobile');
  console.log('Around IntroductionMobile:');
  console.log(code.slice(idx - 200, idx + 1500));
}
