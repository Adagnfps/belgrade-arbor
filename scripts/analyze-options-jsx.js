const fs = require('fs');
const path = require('path');

const dir = 'docs/research/belgrade-arbor/live-chunks';

function analyzeChunk(fileName) {
  const code = fs.readFileSync(path.join(dir, fileName), 'utf8');
  console.log(`\n============================= ${fileName} =============================`);
  // Look for return(0,a.jsx) or return(0,r.jsx) or return(0,r.jsxs)
  const matches = [...code.matchAll(/return\s*\([0-9a-zA-Z_.,\s]*\("section"|\("div",\{className:[^}]+\}/g)];
  for (const m of matches.slice(0, 10)) {
    console.log(m[0].slice(0, 200));
  }
}

analyzeChunk('095uk5okkp766.js');
analyzeChunk('0t6f78-uqoue4.js');
analyzeChunk('0-eq9er4__8p7.js');
