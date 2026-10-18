const fs = require('fs');
const path = require('path');
const https = require('https');

const assets = JSON.parse(fs.readFileSync('docs/research/belgrade-arbor/assets.json', 'utf8'));

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const dir = path.dirname(dest);
      fs.mkdirSync(dir, { recursive: true });
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  const targetBase = 'public/sites/belgrade-arbor';
  
  for (const asset of assets) {
    let sourceUrl = '';
    let localRelPath = '';

    if (asset.startsWith('../media/')) {
      const cleanName = asset.replace('../media/', '').split('?')[0];
      sourceUrl = `https://belgradearbor.rs/_next/static/media/${cleanName}`;
      localRelPath = path.join('fonts', cleanName);
    } else if (asset.startsWith('/')) {
      sourceUrl = `https://belgradearbor.rs${asset}`;
      localRelPath = asset.replace(/^\//, '');
    } else {
      continue;
    }

    const dest = path.join(targetBase, localRelPath);
    if (fs.existsSync(dest)) {
      continue;
    }

    try {
      console.log(`Downloading: ${sourceUrl}`);
      await downloadFile(sourceUrl, dest);
      console.log(`Saved -> ${dest}`);
    } catch (err) {
      console.error(`Failed ${sourceUrl}:`, err.message);
    }
  }
  console.log('Download complete!');
}

main();
