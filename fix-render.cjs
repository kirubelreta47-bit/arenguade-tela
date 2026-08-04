const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const oldRender = /let isMoreOpen = false;[\s\S]*?function switchTab\(t\) \{ \n      activeTabText = t; \n      isMoreOpen = false;\n      showAllItems = false;\n      renderMenu\(\); \n    \}/;

const newRender = `    let fullMenuActiveTab = "የፆም ምሳ";

    function renderFeaturedMenu() {
      const gridCont = document.getElementById('menuGrid');
      const tabsCont = document.getElementById('menuTabs');
      if (tabsCont) tabsCont.style.display = 'none'; // hide tabs on featured menu
      
      // Get first 4 items from first category
      const featuredItems = menuData["የፆም ምሳ"].slice(0, 4);
      
      gridCont.innerHTML = featuredItems.map((itm, i) => \`
        <div class="menu-card reveal active">
          <img src="https://image.pollinations.ai/prompt/delicious%20\${encodeURIComponent(itm.n)}%20ethiopian%20food%20plate%20photography%20restaurant?width=500&height=350&nologo=true" alt="\${itm.n}" loading="lazy">
          <div class="menu-card-body">
            <div>
              <h3 class="mb-1" style="font-size:20px;">\${itm.n}</h3>
              <p class="gray mb-2" style="font-size:13px; min-height:40px;">\${itm.d}</p>
            </div>
            <div class="flex" style="justify-content:space-between; margin-top:15px; border-top:1px solid rgba(255,255,255,0.05); padding-top:15px;">
              <span class="gold" style="font-weight:600; font-size:18px;">\${itm.p} ETB</span>
              <button class="btn btn-o btn-sm" onclick="addToCart('\${itm.n}', \${itm.p})">Add to Cart</button>
            </div>
          </div>
        </div>
      \`).join('');

      const btnHtml = \`<div style="text-align: center; margin-top: 40px; width: 100%;"><button class="btn" onclick="navigateTo('view-full-menu'); return false;">View Full Menu</button></div>\`;
      gridCont.insertAdjacentHTML('afterend', btnHtml);
    }

    function renderFullMenu() {
      const tabsCont = document.getElementById('fullMenuTabs');
      const gridCont = document.getElementById('fullMenuGrid');
      
      const keys = Object.keys(menuData);
      
      let tabsHtml = keys.map(k => 
        \`<button class="tab \${k === fullMenuActiveTab ? 'active' : ''}" onclick="switchFullTab('\${k}')">\${k}</button>\`
      ).join('');
      
      tabsCont.innerHTML = tabsHtml;

      const items = menuData[fullMenuActiveTab];
      gridCont.innerHTML = items.map((itm, i) => \`
        <div class="menu-card reveal active">
          <img src="https://image.pollinations.ai/prompt/delicious%20\${encodeURIComponent(itm.n)}%20\${encodeURIComponent(fullMenuActiveTab === 'Pizza' || fullMenuActiveTab === 'Burger' || fullMenuActiveTab === 'Sandwich' || fullMenuActiveTab === 'Wrap' || fullMenuActiveTab === 'Spaghetti' || fullMenuActiveTab === 'Salad' ? fullMenuActiveTab : 'ethiopian food plate')}%20photography%20restaurant?width=500&height=350&nologo=true" alt="\${itm.n}" loading="lazy">
          <div class="menu-card-body">
            <div>
              <h3 class="mb-1" style="font-size:20px;">\${itm.n}</h3>
              <p class="gray mb-2" style="font-size:13px; min-height:40px;">\${itm.d}</p>
            </div>
            <div class="flex" style="justify-content:space-between; margin-top:15px; border-top:1px solid rgba(255,255,255,0.05); padding-top:15px;">
              <span class="gold" style="font-weight:600; font-size:18px;">\${itm.p} ETB</span>
              <button class="btn btn-o btn-sm" onclick="addToCart('\${itm.n}', \${itm.p})">Add to Cart</button>
            </div>
          </div>
        </div>
      \`).join('');
    }

    function switchFullTab(t) { 
      fullMenuActiveTab = t; 
      renderFullMenu(); 
    }

    // Call both
    renderFeaturedMenu();
    renderFullMenu();`;

if (content.match(oldRender)) {
  content = content.replace(oldRender, newRender);
  content = content.replace(/renderMenu\(\);/g, ''); // cleanup any stray calls
  fs.writeFileSync('index.html', content);
  console.log("Updated rendering logic.");
} else {
  console.log("Could not find the target to replace.");
}
