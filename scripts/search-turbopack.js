const fs = require('fs');

const turbopack = fs.readFileSync('docs/research/belgrade-arbor/chunks/turbopack-11d20dr7kd-ys.js', 'utf8');

[46990, 8764, 74727, 34827, 79046, 25709].forEach(id => {
  const idx = turbopack.indexOf(String(id));
  if (idx !== -1) {
    console.log(`Found ${id} in turbopack runtime:`);
    console.log(turbopack.slice(Math.max(0, idx - 50), idx + 200));
  } else {
    console.log(`${id} not in turbopack runtime`);
  }
});
