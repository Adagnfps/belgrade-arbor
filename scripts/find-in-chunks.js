const fs = require('fs');
const path = require('path');

const dir = 'docs/research/belgrade-arbor/chunks';
const files = fs.readdirSync(dir);

const keywords = ['Introduction', 'Roots', 'Horizontal', 'ScrollTrigger', 'gsap', 'lenis', 'morphClip', 'h-[900vh]'];

for (const file of files) {
  if (!file.endsWith('.js')) continue;
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  for (const kw of keywords) {
    if (content.includes(kw)) {
      console.log(`Found "${kw}" in ${file}`);
    }
  }
}
