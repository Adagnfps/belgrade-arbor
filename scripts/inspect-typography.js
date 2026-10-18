const fs = require('fs');

const css = fs.readFileSync('docs/research/belgrade-arbor/combined.css', 'utf8');

const classNames = ['heading-1', 'heading-2', 'heading-3', 'heading-4', 'paragraph', 'small', 'detail', 'wrapper', 'link', 'menu'];

for (const name of classNames) {
  const regex = new RegExp(`\\.${name}\\b[^{]*\\{[^}]+\\}`, 'g');
  const matches = [...css.matchAll(regex)].map(m => m[0]);
  console.log(`=== .${name} ===`);
  matches.forEach(m => console.log(m));
}
