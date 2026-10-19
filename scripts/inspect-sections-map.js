const fs = require('fs');
const content = fs.readFileSync('docs/research/belgrade-arbor/chunks/0rr1c7aibu-sx.formatted.js', 'utf8');
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('useTranslations(') || line.includes('id:') || line.startsWith('function e') || line.startsWith('function t') || line.startsWith('function w') || line.startsWith('function d')) {
    console.log(`${i+1}: ${line.trim().slice(0, 100)}`);
  }
}
