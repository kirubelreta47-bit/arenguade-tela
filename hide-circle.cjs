const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');
content = content.replace(/<div class="wheel-wrap" style="animation: float 6s ease-in-out infinite;">/, '<div class="wheel-wrap" style="display: none; animation: float 6s ease-in-out infinite;">');
fs.writeFileSync('index.html', content);
