const https = require('https');
const fs = require('fs');

https.get('https://belgradearbor.rs/en', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const scripts = [...data.matchAll(/<script[^>]+src="([^"]+)"/g)].map(m => m[1]);
    console.log('Scripts found:', scripts.length);
    scripts.forEach(s => console.log('Script:', s));
    fs.writeFileSync('docs/research/belgrade-arbor/live-scripts.json', JSON.stringify(scripts, null, 2));
  });
}).on('error', console.error);
