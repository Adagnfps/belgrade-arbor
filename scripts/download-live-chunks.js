const fs = require('fs');
const https = require('https');
const path = require('path');

const chunks = [
  '095uk5okkp766.js',
  '11-jbnjmn3saw.js',
  '0t6f78-uqoue4.js',
  '0-eq9er4__8p7.js',
  '08lyp3oopz8f3.css'
];

const dir = 'docs/research/belgrade-arbor/live-chunks';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function downloadChunk(chunk) {
  return new Promise((resolve) => {
    const url = `https://belgradearbor.rs/_next/static/chunks/${chunk}`;
    console.log(`Downloading ${chunk}...`);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        fs.writeFileSync(path.join(dir, chunk), data);
        console.log(`Saved ${chunk} (${data.length} bytes, status ${res.statusCode})`);
        resolve();
      });
    }).on('error', (err) => {
      console.error(`Error downloading ${chunk}:`, err);
      resolve();
    });
  });
}

(async () => {
  for (const c of chunks) {
    await downloadChunk(c);
  }
})();
