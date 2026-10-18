const fs = require('fs');

const css = fs.readFileSync('docs/research/belgrade-arbor/combined.css', 'utf8');

// Find all CSS rules setting background-color or color with custom names
const colors = ['vanilla', 'pine-green', 'navy', 'cream', 'cream-dark', 'golden', 'sand', 'green'];
for (const color of colors) {
  // Check utility classes like .bg-green, .text-golden, etc.
  const regex = new RegExp(`\\.(bg|text|border)-${color}[^\{]*\{([^\}]+)\}`, 'g');
  const matches = [...css.matchAll(regex)].map(m => m[0]);
  console.log(`Class matches for ${color}:`, matches.slice(0, 3));
  
  // Also check variable definitions
  const varRegex = new RegExp(`--[a-zA-Z0-9_\-]*${color}[a-zA-Z0-9_\-]*\\s*:[^;\}]+`, 'g');
  const varMatches = [...new Set([...css.matchAll(varRegex)].map(m => m[0]))];
  console.log(`Variable matches for ${color}:`, varMatches);
}
