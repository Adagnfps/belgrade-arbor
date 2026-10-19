const https = require('https');
const fs = require('fs');
const path = require('path');

const videos = [
  '/home/hero.mp4',
  '/home/hero-m.webm',
  '/home/location/location.mp4',
  '/home/amenities/amenities.mp4',
  '/home/roots/image1.mp4'
];

async function download(urlPath) {
  const destPublic = path.join('public', urlPath.replace(/\//g, path.sep));
  const destSite = path.join('public/sites/belgrade-arbor', urlPath.replace(/\//g, path.sep));
  
  [destPublic, destSite].forEach(d => {
    const dir = path.dirname(d);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  const fullUrl = 'https://belgradearbor.rs' + urlPath;
  return new Promise((resolve) => {
    https.get(fullUrl, (res) => {
      if (res.statusCode !== 200) {
        console.log(`Failed ${urlPath}: status ${res.statusCode}`);
        return resolve();
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        fs.writeFileSync(destPublic, buffer);
        fs.writeFileSync(destSite, buffer);
        console.log(`Downloaded ${urlPath} (${buffer.length} bytes)`);
        resolve();
      });
    }).on('error', err => {
      console.error(`Error downloading ${urlPath}:`, err);
      resolve();
    });
  });
}

(async () => {
  for (const v of videos) {
    await download(v);
  }
  console.log('Video download completed');
})();
