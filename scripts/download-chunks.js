const https = require('https');
const fs = require('fs');
const path = require('path');

const scripts = JSON.parse(fs.readFileSync('docs/research/belgrade-arbor/live-scripts.json', 'utf8'));
const dir = 'docs/research/belgrade-arbor/chunks';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function download(urlPath) {
  const cleanName = path.basename(urlPath.split('?')[0]);
  const dest = path.join(dir, cleanName);
  const fullUrl = 'https://belgradearbor.rs' + urlPath;
  return new Promise((resolve) => {
    https.get(fullUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        fs.writeFileSync(dest, data);
        console.log(`Saved ${cleanName} (${data.length} bytes)`);
        resolve();
      });
    }).on('error', (err) => {
      console.error(err);
      resolve();
    });
  });
}

(async () => {
  for (const s of scripts) {
    await download(s);
  }
  console.log('All chunks downloaded!');
})();
