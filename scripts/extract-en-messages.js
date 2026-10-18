const fs = require('fs');

const line344 = fs.readFileSync('docs/research/belgrade-arbor/options-line-344.txt', 'utf8');

// The format is: 15:["$","$L17",null,{"formats":...}]
const jsonPart = line344.replace(/^\d+:\["\$","\$L\w+",null,/, '').replace(/\]$/, '');
try {
  const parsed = JSON.parse(jsonPart);
  fs.writeFileSync('docs/research/belgrade-arbor/en-messages.json', JSON.stringify(parsed, null, 2));
  console.log('Successfully parsed English messages and saved to en-messages.json!');
  console.log('Top keys in messages:', Object.keys(parsed.messages || {}));
} catch (e) {
  console.error('Error parsing JSON:', e.message);
  // write raw substring
  fs.writeFileSync('docs/research/belgrade-arbor/raw-line-344.txt', jsonPart);
}
