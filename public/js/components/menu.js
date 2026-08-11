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
  let ingredientMarkup = '';

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
  const safeName = (item.n || '').replace(/'/g, "\\'");

  return `
    <div class="luxury-card reveal active" onclick="openDishModal('${safeName}')" style="animation-delay: ${index * 0.05}s">
      <div class="luxury-card-body" style="width: 100%;">
        <div>
          <div class="luxury-card-head">
            <h3>${item.n}</h3>
            <span class="luxury-card-price">${item.p} ETB</span>
          </div>
          ${enSubtitle ? `<div class="luxury-card-sub">${enSubtitle}</div>` : ''}
          ${ingredientMarkup}
        </div>
        
        <div class="luxury-card-foot" style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
          <button style="background: transparent; border: 1px solid var(--gold); color: var(--gold); padding: 4px 12px; font-size: 11px; border-radius: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; transition: 0.3s;" onclick="event.stopPropagation(); openDishModal('${safeName}');" onmouseover="this.style.background='var(--gold)'; this.style.color='#010306';" onmouseout="this.style.background='transparent'; this.style.color='var(--gold)';">Details</button>
          <div style="display: flex; gap: 8px; align-items: center;">
            <div class="luxury-pair-box" style="margin-bottom: 0;">
              ${heatHtml}
              ${pairHtml}
            </div>
            <button class="add-btn" onclick="event.stopPropagation(); openDishModal('${safeName}');" title="Quick View & Reserve">+</button>
          </div>
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

/**
 * Renders the complete menu page with category navigation tabs
 */
function renderFullMenu() {
  const tabsCont = document.getElementById('fullMenuTabs');
  const gridCont = document.getElementById('fullMenuGrid');

  if (!tabsCont || !gridCont) return;

  const categories = Object.keys(menuData);
  const allTabs = ["ሁሉንም / All Items", ...categories];

  tabsCont.innerHTML = allTabs.map(cat => `
    <button class="luxury-tab ${fullMenuActiveTab === cat ? 'active' : ''}" onclick="switchFullTab('${cat}')">${cat}</button>
  `).join('');

  let itemsToRender = [];
  if (fullMenuActiveTab === "ሁሉንም / All Items") {
    for (let cat in menuData) {
      itemsToRender = itemsToRender.concat(menuData[cat]);
    }
  } else {
    itemsToRender = menuData[fullMenuActiveTab] || [];
  }

  gridCont.innerHTML = itemsToRender.map((itm, i) => renderLuxuryCardHtml(itm, i)).join('');
}

/**
 * Tab switching handler with smooth fade transition
 * @param {string} tabName Category tab name
 */
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
    }, 150);
  } else {
    renderFullMenu();
  }
}
