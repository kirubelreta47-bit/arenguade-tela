const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Insert closing div for main-scroll-page
content = content.replace(/<\/section>\n\n  <\/div>\n\n  <!-- 18. FOOTER -->/, '</section>\n\n  </div>\n</div>\n\n  <!-- FULL MENU PAGE -->\n  <div id="full-menu-page" style="display: none; padding: 100px 0; min-height: 100vh;">\n    <div class="container">\n      <div class="text-center mb-4">\n        <h2 class="gold mb-1" style="font-size: 36px;">Our Complete Menu</h2>\n        <p class="gray">Explore our full selection of dishes and beverages.</p>\n      </div>\n      <div class="menu-tabs" id="fullMenuTabs" style="flex-wrap: wrap; justify-content: center; gap: 10px;">\n        <!-- JS Populated -->\n      </div>\n      <div class="grid grid-4" id="fullMenuGrid">\n        <!-- JS Populated -->\n      </div>\n    </div>\n  </div>\n\n  <!-- 18. FOOTER -->');

fs.writeFileSync('index.html', content);
