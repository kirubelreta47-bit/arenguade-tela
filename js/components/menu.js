/* ==========================================================================
   ARENGUADE TILA - MENU RENDERER & TAB CONTROLLER
   ========================================================================== */

let activeFeaturedTab = "የፆም ምሳ";
let fullMenuActiveTab = "ሁሉንም / All Items";

/**
 * Generates unified HTML string for luxury menu cards
 * @param {Object} item Menu item data object
 * @param {number} index Animation index
 * @returns {string} HTML markup string
 */
function renderLuxuryCardHtml(item, index) {
  const safeName = (item.n || '').replace(/'/g, "\\'");
  
  // Clean button to view details
  let ingredientMarkup = `<button onclick="event.stopPropagation(); openDishModal('${safeName}')" style="background: transparent; border: 1px solid rgba(212, 175, 55, 0.4); color: var(--gold); padding: 6px 14px; border-radius: 6px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; cursor: pointer; margin-top: 10px; transition: all 0.2s ease;" onmouseover="this.style.background='rgba(212,175,55,0.1)'" onmouseout="this.style.background='transparent'">View Details</button>`;

  let heatHtml = '';
  if (item.heat) {
    heatHtml = `<div class="heat-dots">
      <div class="heat-dot ${item.heat >= 1 ? 'hot' : ''}"></div>
      <div class="heat-dot ${item.heat >= 2 ? 'hot' : ''}"></div>
      <div class="heat-dot ${item.heat >= 3 ? 'hot' : ''}"></div>
    </div>`;
  }

  const pairHtml = item.pair ? `<div>${item.pair}</div>` : '';
  const enSubtitle = (item.en && item.en !== item.n) ? item.en : '';

  return `
    <div class="luxury-card reveal active w-full h-full min-h-[220px] flex flex-col justify-between" onclick="openDishModal('${safeName}')" style="animation-delay: ${index * 0.05}s; height: 100%;">
      <div class="luxury-card-body flex flex-col justify-between" style="width: 100%; height: 100%;">
        <div>
          <div class="luxury-card-head">
            <h3>${item.n}</h3>
            <span class="luxury-card-price">${item.p} ETB</span>
          </div>
          ${enSubtitle ? `<div class="luxury-card-sub">${enSubtitle}</div>` : ''}
          ${ingredientMarkup}
        </div>
        
        <div class="luxury-card-foot mt-auto">
          <div class="luxury-pair-box">
            ${heatHtml}
            ${pairHtml}
          </div>
          <button class="add-btn" onclick="event.stopPropagation(); openDishModal('${safeName}');" title="Quick View & Reserve">+</button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders the featured menu cards on the home page (2 rows x 3 columns = 6 highlight items)
 */
function renderFeaturedMenu() {
  const gridCont = document.getElementById('menuGrid');
  const tabsCont = document.getElementById('menuTabs');
  
  if (tabsCont) tabsCont.style.display = 'none';
  if (!gridCont) return;

  // Curate 6 top signature items across categories for a balanced 2-row x 3-column layout
  const featuredItems = [
    menuData["የፆም ምሳ"][1], // Fasting Agalta Platter
    menuData["የፆም ምሳ"][3], // Tegabino Shiro
    menuData["የፍስክ ምሳ"][0], // Fisik Agalta Platter
    (menuData["ክትፎ"] && menuData["ክትፎ"][2]) || menuData["የፍስክ ምሳ"][1], // Special Kitfo or Banatu
    (menuData["Pizza"] && menuData["Pizza"][5]) || menuData["Pizza"][0], // Meat Lover Pizza
    (menuData["Salad"] && menuData["Salad"][0]) // Arenguade Tila Special Salad
  ].filter(Boolean);

  gridCont.innerHTML = featuredItems.map((itm, i) => renderLuxuryCardHtml(itm, i)).join('');
}

function handleMenuFilter() {
  renderFullMenu();
}

function renderFullMenu() {
  const tabsCont = document.getElementById('fullMenuTabs');
  const gridCont = document.getElementById('fullMenuGrid');

  if (!tabsCont || !gridCont) return;

  const categories = Object.keys(menuData);
  const allTabs = ["ሁሉንም / All Items", ...categories];

  tabsCont.innerHTML = allTabs.map(cat => `
    <button class="luxury-tab ${fullMenuActiveTab === cat ? 'active' : ''}" onclick="switchFullTab('${cat}')" style="white-space: nowrap; font-size: 13px;">${cat}</button>
  `).join('');

  const searchQuery = (document.getElementById('menuSearchInput')?.value || "").toLowerCase().trim();
  const fastingOnly = document.getElementById('fastingToggle')?.checked || false;

  let renderHtml = '';
  let foundAny = false;

  const categoriesToRender = fullMenuActiveTab === "ሁሉንም / All Items" ? categories : [fullMenuActiveTab];

  categoriesToRender.forEach(cat => {
    let items = menuData[cat] || [];
    
    // Apply filters
    if (fastingOnly) {
      if (!cat.includes("ፆም") && !cat.includes("መጠጥ")) {
         items = items.filter(itm => itm.n.toLowerCase().includes("fasting") || itm.n.includes("ፆም"));
      }
    }
    
    if (searchQuery) {
      items = items.filter(itm => 
        itm.n.toLowerCase().includes(searchQuery) || 
        (itm.en && itm.en.toLowerCase().includes(searchQuery)) || 
        (itm.d && itm.d.toLowerCase().includes(searchQuery))
      );
    }

    if (items.length > 0) {
      foundAny = true;
      renderHtml += `
        <div class="w-full max-w-7xl mx-auto px-4" style="margin-bottom: 50px; display: block; clear: both;" id="cat-${cat.replace(/\s+/g, '-')}">
          <h3 style="color: var(--gold); font-family: 'Cormorant Garamond', serif; font-size: 32px; margin-bottom: 24px; padding-bottom: 10px; border-bottom: 1px solid rgba(212,175,55,0.3); width: 100%; display: block;">${cat}</h3>
          <div class="grid grid-4" style="gap: 24px;">
            ${items.map((itm, i) => renderLuxuryCardHtml(itm, i)).join('')}
          </div>
        </div>
      `;
    }
  });

  if (!foundAny) {
    renderHtml = `
      <div style="text-align: center; padding: 60px 20px; color: #94a3b8;">
        <div style="font-size: 40px; margin-bottom: 15px;">🔍</div>
        <h3 style="font-size: 20px; font-weight: 600; color: #fff; margin-bottom: 10px;">No exact matches found</h3>
        <p>Try adjusting your search terms or clearing the filters.</p>
      </div>
    `;
  }

  gridCont.innerHTML = renderHtml;
}

function switchFullTab(tabName) {
  fullMenuActiveTab = tabName;
  const gridCont = document.getElementById('fullMenuGrid');
  
  if (gridCont) {
    gridCont.style.opacity = '0.3';
    gridCont.style.transform = 'translateY(6px)';
    setTimeout(() => {
      renderFullMenu();
      gridCont.style.opacity = '1';
      gridCont.style.transform = 'translateY(0)';
      
      // If we clicked a specific tab, it's nice to ensure the top of the menu is visible
      const stickyHeader = document.getElementById('fullMenuTabs');
      if (stickyHeader) {
        const offsetPosition = stickyHeader.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }

    }, 150);
  } else {
    renderFullMenu();
  }
}
