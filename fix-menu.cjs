const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const newRenderMenu = `
    let isMoreOpen = false;
    function renderMenu() {
      const keys = Object.keys(menuData);
      const visibleKeys = keys.slice(0, 4);
      const moreKeys = keys.slice(4);

      let html = visibleKeys.map(k => 
        \`<button class="tab \${k === activeTabText ? 'active' : ''}" onclick="switchTab('\${k}')">\${k}</button>\`
      ).join('');

      html += \`<div style="position: relative; display: inline-block;">
        <button class="tab \${moreKeys.includes(activeTabText) ? 'active' : ''}" onclick="toggleMoreTabs(event)">More ▾</button>
        <div id="moreTabsDropdown" style="display: \${isMoreOpen ? 'grid' : 'none'}; grid-template-columns: repeat(3, 1fr); gap: 10px; position: absolute; top: 100%; right: 0; background: var(--nm); border: 1px solid rgba(212,175,55,0.3); padding: 15px; border-radius: 8px; z-index: 100; min-width: 300px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          \${moreKeys.map(k => 
            \`<button class="tab \${k === activeTabText ? 'active' : ''}" style="width: 100%; text-align: center; font-size: 11px; padding: 8px;" onclick="switchTab('\${k}')">\${k}</button>\`
          ).join('')}
        </div>
      </div>\`;
      
      tabsCont.innerHTML = html;

      const items = menuData[activeTabText];
      gridCont.innerHTML = items.map((itm, i) => \`
        <div class="menu-card reveal active">
          <img src="https://image.pollinations.ai/prompt/delicious%20\${encodeURIComponent(itm.n)}%20\${encodeURIComponent(activeTabText === 'Pizza' || activeTabText === 'Burger' || activeTabText === 'Sandwich' || activeTabText === 'Wrap' || activeTabText === 'Spaghetti' || activeTabText === 'Salad' ? activeTabText : 'ethiopian food plate')}%20photography%20restaurant?width=500&height=350&nologo=true" alt="\${itm.n}" loading="lazy">
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

    function toggleMoreTabs(e) {
      if(e) e.stopPropagation();
      isMoreOpen = !isMoreOpen;
      renderMenu();
    }

    // Close more dropdown when clicking outside
    document.addEventListener('click', (e) => {
      const dropdown = document.getElementById('moreTabsDropdown');
      if(isMoreOpen && dropdown && !e.target.closest('.menu-tabs')) {
        isMoreOpen = false;
        renderMenu();
      }
    });

    function switchTab(t) { 
      activeTabText = t; 
      isMoreOpen = false;
      renderMenu(); 
    }
`;

content = content.replace(/function renderMenu\(\) \{[\s\S]*?function switchTab\(t\) \{ activeTabText = t; renderMenu\(\); \}/, newRenderMenu);

fs.writeFileSync('index.html', content);
