const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Navbar link
content = content.replace(/<li><a href="#" onclick="navigateTo\('view-menu'\); return false;">Menu<\/a><\/li>/, '<li><a href="#" onclick="navigateTo(\'view-full-menu\'); return false;">Menu</a></li>');
// Footer link
content = content.replace(/<li><a href="#" onclick="navigateTo\('view-menu'\); return false;">Menu<\/a><\/li>/, '<li><a href="#" onclick="navigateTo(\'view-full-menu\'); return false;">Menu</a></li>');

// Hero button
content = content.replace(/<a href="#" onclick="navigateTo\('view-menu'\); return false;" class="btn btn-o">Order Online<\/a>/, '<a href="#" onclick="navigateTo(\'view-full-menu\'); return false;" class="btn btn-o">Order Online</a>');

fs.writeFileSync('index.html', content);
