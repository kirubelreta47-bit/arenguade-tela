const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

content = content.replace(/const limit = showAllItems \? items\.length : 12;/, 'const limit = showAllItems ? items.length : 8;');
content = content.replace(/if \(items\.length > 12 && !showAllItems\) \{/, 'if (items.length > 8 && !showAllItems) {');
content = content.replace(/<button class="btn" onclick="showMoreItems\(\)">View More<\/button>/, '<button class="btn" onclick="showMoreItems()">View Full Menu</button>');

fs.writeFileSync('index.html', content);
