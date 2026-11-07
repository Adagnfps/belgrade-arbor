const fs = require('fs');

const html = fs.readFileSync('scripts/live-page.html', 'utf8');

const regex = /<script[^>]*src=["']([^"']+)["']/g;
let m;
const scripts = [];
while ((m = regex.exec(html)) !== null) {
  scripts.push(m[1]);
}

console.log(`Found ${scripts.length} script tags:`);
scripts.forEach((s, i) => console.log(`${i + 1}: ${s}`));
