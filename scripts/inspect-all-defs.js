const fs = require('fs');

const code = fs.readFileSync('docs/research/belgrade-arbor/chunks/0rr1c7aibu-sx.formatted.js', 'utf8');

function findDefinition(varName) {
  const match = code.match(new RegExp(`function\\s+${varName}\\s*\\(`));
  if (match) {
    console.log(`\n=== FUNCTION ${varName} ===`);
    console.log(code.slice(match.index, match.index + 800));
  } else {
    // search for let varName = 
    const idx = code.indexOf(`let ${varName}=`);
    if (idx !== -1) {
      console.log(`\n=== LET ${varName} ===`);
      console.log(code.slice(idx, idx + 800));
    } else {
      console.log(`\n=== ${varName} NOT FOUND ===`);
    }
  }
}

findDefinition('ts');
findDefinition('er');
findDefinition('es');
findDefinition('eS');
findDefinition('e_');
findDefinition('d');
findDefinition('e0');
findDefinition('e1');
findDefinition('e4');
findDefinition('w');
findDefinition('tt');
