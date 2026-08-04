const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');
content = content.replace(/@media\(max-width: 768px\) \{\s*\.menu-tabs \{ flex-wrap: nowrap; justify-content: flex-start; overflow-x: auto; padding-bottom: 12px; -webkit-overflow-scrolling: touch; \}\s*\.menu-tabs::-webkit-scrollbar \{ height: 4px; \}\s*\.menu-tabs::-webkit-scrollbar-track \{ background: rgba\(255,255,255,0\.05\); border-radius: 4px; \}\s*\.menu-tabs::-webkit-scrollbar-thumb \{ background: rgba\(212,175,55,0\.3\); border-radius: 4px; \}\s*\}/, '');
fs.writeFileSync('index.html', content);
