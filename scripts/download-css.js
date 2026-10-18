const fs = require('fs');
const https = require('https');
const path = require('path');

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
  const cssList = [
    '/_next/static/chunks/12m-e7sqki26v.css?dpl=dpl_9vfWxZ1qaij1e1XxVKNPCxjbXgUi',
    '/_next/static/chunks/13l3zbj81552..css?dpl=dpl_9vfWxZ1qaij1e1XxVKNPCxjbXgUi',
    '/_next/static/chunks/0eqspdm2dt5_-.css?dpl=dpl_9vfWxZ1qaij1e1XxVKNPCxjbXgUi',
    '/_next/static/chunks/108.zndoyfq76.css?dpl=dpl_9vfWxZ1qaij1e1XxVKNPCxjbXgUi'
  ];

  for (let i = 0; i < cssList.length; i++) {
    const rawUrl = cssList[i].split('?')[0];
    const fullUrl = `https://belgradearbor.rs${rawUrl}`;
    const filename = path.basename(rawUrl);
    const dest = path.join('docs/research/belgrade-arbor/css', filename);
    console.log(`Downloading ${fullUrl} -> ${dest}`);
    try {
      await downloadFile(fullUrl, dest);
      console.log(`Downloaded ${filename}`);
    } catch (e) {
      console.error(`Error downloading ${filename}:`, e.message);
    }
  }
}

main();
