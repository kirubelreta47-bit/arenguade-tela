const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

content = content.replace(/const limit = showAllItems \? items\.length : 8;/, 'const limit = showAllItems ? items.length : 4;');
content = content.replace(/if \(items\.length > 8 && !showAllItems\) \{/, 'if (items.length > 4 && !showAllItems) {');

fs.writeFileSync('index.html', content);
