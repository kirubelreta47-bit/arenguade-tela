const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');
content = content.replace(/\.wheel-wrap canvas \{ width: 100%; height: 100%; border-radius: 50%; border: 1px solid rgba\(212,175,55,0\.3\); box-shadow: 0 0 40px rgba\(0,0,0,0\.3\); transition: transform 4\.5s cubic-bezier\(0\.1, 0\.7, 0\.1, 1\); background: var\(--nm\); \}/, '.wheel-wrap canvas { width: 100%; height: 100%; transition: transform 4.5s cubic-bezier(0.1, 0.7, 0.1, 1); }');
fs.writeFileSync('index.html', content);
