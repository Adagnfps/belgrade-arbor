const fs = require('fs');
const https = require('https');
const path = require('path');

const downloads = [
  {
    url: 'https://belgradearbor.rs/home/business-options/business-options.webp',
    targets: [
      'public/home/business-options/business-options.webp',
      'public/sites/belgrade-arbor/home/business-options/business-options.webp'
    ]
  },
  {
    url: 'https://belgradearbor.rs/home/residences/interior.mp4',
    targets: [
      'public/home/residences/interior.mp4',
      'public/sites/belgrade-arbor/home/residences/interior.mp4'
    ]
  },
  {
    url: 'https://belgradearbor.rs/home/business/business.mp4',
    targets: [
      'public/home/business/business.mp4',
      'public/sites/belgrade-arbor/home/business/business.mp4'
    ]
  }
];

function download(url, targetPaths) {
  return new Promise((resolve) => {
    console.log(`Downloading ${url}...`);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        for (const t of targetPaths) {
          const dir = path.dirname(t);
          if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(t, buffer);
          console.log(`Saved ${t} (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
        }
        resolve();
      });
    }).on('error', err => {
      console.error('Error downloading:', err);
      resolve();
    });
  });
}

(async () => {
  for (const item of downloads) {
    await download(item.url, item.targets);
  }
  console.log('All missing assets downloaded successfully!');
})();
