const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

content = content.replace(/<button class="btn btn-o btn-sm" onclick="addToCart\('\$\{itm.n\}', \$\{itm.p\}\)">Add to Cart<\/button>/g, '');

fs.writeFileSync('index.html', content);
