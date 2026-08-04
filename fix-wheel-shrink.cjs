const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');
content = content.replace(/\.wheel-wrap \{ position: relative; width: 300px; height: 300px; margin: 0 auto; \}/, '.wheel-wrap { position: relative; width: 300px; height: 300px; min-height: 300px; min-width: 300px; flex-shrink: 0; margin: 0 auto; }');
fs.writeFileSync('index.html', content);
