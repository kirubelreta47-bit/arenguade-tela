const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

content = content.replace(/ctx\.fillStyle = i % 2 === 0 \? '#060E1C' : '#FFD13B';/, "ctx.fillStyle = i % 2 === 0 ? '#1A2333' : '#FFD13B';");
content = content.replace(/ctx\.fillStyle = i % 2 === 0 \? '#FFFFFF' : '#030811';/, "ctx.fillStyle = i % 2 === 0 ? '#FFFFFF' : '#030811';");

fs.writeFileSync('index.html', content);
