const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Change grid-3 to grid-4
content = content.replace(/<div class="grid grid-3" id="menuGrid">/, '<div class="grid grid-4" id="menuGrid">');

const newRenderMenu = `
    let isMoreOpen = false;
    let showAllItems = false;
    function renderMenu() {
      const keys = Object.keys(menuData);
      const visibleKeys = keys.slice(0, 4);
      const moreKeys = keys.slice(4);

      let html = visibleKeys.map(k => 
        \`<button class="tab \${k === activeTabText ? 'active' : ''}" onclick="switchTab('\${k}')">\${k}</button>\`
      ).join('');

      html += \`<div style="position: relative; display: inline-block;">
        <button class="tab \${moreKeys.includes(activeTabText) ? 'active' : ''}" onclick="toggleMoreTabs(event)">More ▾</button>
        <div id="moreTabsDropdown" style="display: \${isMoreOpen ? 'grid' : 'none'}; grid-template-columns: repeat(3, 1fr); gap: 10px; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); background: var(--nm); border: 1px solid rgba(212,175,55,0.3); padding: 15px; border-radius: 8px; z-index: 100; min-width: 300px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          \${moreKeys.map(k => 
            \`<button class="tab \${k === activeTabText ? 'active' : ''}" style="width: 100%; text-align: center; font-size: 11px; padding: 8px;" onclick="switchTab('\${k}')">\${k}</button>\`
          ).join('')}
        </div>
      </div>\`;
      
      tabsCont.innerHTML = html;

      const items = menuData[activeTabText];
      const limit = showAllItems ? items.length : 12;
      const visibleItems = items.slice(0, limit);

      gridCont.innerHTML = visibleItems.map((itm, i) => \`
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

      const viewMoreBtnCont = document.getElementById('viewMoreBtnCont');
      if (items.length > 12 && !showAllItems) {
        if(!viewMoreBtnCont) {
          const btnHtml = \`<div id="viewMoreBtnCont" style="text-align: center; margin-top: 40px; width: 100%;"><button class="btn" onclick="showMoreItems()">View More</button></div>\`;
          gridCont.insertAdjacentHTML('afterend', btnHtml);
        } else {
          viewMoreBtnCont.style.display = 'block';
        }
      } else {
        if(viewMoreBtnCont) {
          viewMoreBtnCont.style.display = 'none';
        }
      }
    }

    function showMoreItems() {
      showAllItems = true;
      renderMenu();
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
      showAllItems = false;
      renderMenu(); 
    }
`;

content = content.replace(/let isMoreOpen = false;[\s\S]*?function switchTab\(t\) \{ \n      activeTabText = t; \n      isMoreOpen = false;\n      renderMenu\(\); \n    \}/, newRenderMenu);

fs.writeFileSync('index.html', content);
