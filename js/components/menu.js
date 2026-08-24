/* ==========================================================================
   ARENGUADE TILA - MENU RENDERER & TAB CONTROLLER
   ========================================================================== */

let activeFeaturedTab = "Breakfast / ቁርስ";
let fullMenuActiveTab = "ሁሉንም / All Items";

/**
 * Builds the card media layer (background photo or themed fallback)
 * @param {Object} item Menu item
 * @returns {string}
 */
function renderMenuMediaHtml(item) {
  const src = item.img || item.image || item.src || '';
  const alt = item.en || item.n || 'Menu item';

  if (src) {
    return `
      <div class="luxury-card-media">
        <img src="${src}" alt="${alt.replace(/"/g, '&quot;')}" loading="lazy"
          onerror="this.closest('.luxury-card')?.classList.add('luxury-card--no-photo'); this.remove();">
      </div>`;
  }

  return `<div class="luxury-card-media luxury-card-media--fallback" aria-hidden="true"></div>`;
}

/**
 * Generates unified HTML string for luxury menu cards
 * @param {Object} item Menu item data object
 * @param {number} index Animation index
 * @param {string} [category] Optional category label
 * @returns {string} HTML markup string
 */
function renderLuxuryCardHtml(item, index, category) {
  const safeName = (item.n || '').replace(/'/g, "\\'");
  const hasPhoto = !!(item.img || item.image || item.src);
  
  const enSubtitle = (item.en && item.en !== item.n) ? item.en : (category || '');

  let heatHtml = '';
  if (item.heat) {
    heatHtml = `<div class="heat-dots">
      <div class="heat-dot ${item.heat >= 1 ? 'hot' : ''}"></div>
      <div class="heat-dot ${item.heat >= 2 ? 'hot' : ''}"></div>
      <div class="heat-dot ${item.heat >= 3 ? 'hot' : ''}"></div>
    </div>`;
  }

  const pairHtml = item.pair ? `<div class="luxury-pair-line">${item.pair}</div>` : '';
  const metaHtml = (heatHtml || pairHtml)
    ? `<div class="luxury-pair-box">${heatHtml}${pairHtml}</div>`
    : '';

  return `
    <div class="luxury-card ${hasPhoto ? 'luxury-card--photo' : 'luxury-card--no-photo'} reveal active" onclick="openDishModal('${safeName}')" style="animation-delay: ${index * 0.05}s;">
      ${renderMenuMediaHtml(item)}
      <div class="luxury-card-overlay" aria-hidden="true"></div>
      <span class="luxury-card-price">${item.p} ETB</span>
      <div class="luxury-card-body">
        <div class="luxury-card-main">
          <h3 class="luxury-card-title">${item.n}</h3>
          ${enSubtitle ? `<div class="luxury-card-sub">${enSubtitle}</div>` : ''}
          <button type="button" onclick="event.stopPropagation(); openDishModal('${safeName}')" class="luxury-view-btn">View Details</button>
        </div>
        ${metaHtml}
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
    { item: menuData["Fasting Lunch / የጾም ምሳ"]?.[0], cat: "Fasting Lunch / የጾም ምሳ" },
    { item: menuData["Non-Fasting Lunch / የፍስክ ምሳ"]?.[1], cat: "Non-Fasting Lunch / የፍስክ ምሳ" },
    { item: menuData["Breakfast / ቁርስ"]?.[1], cat: "Breakfast / ቁርስ" },
    { item: menuData["Pizza / ፒዛ"]?.[5], cat: "Pizza / ፒዛ" },
    { item: menuData["Sandwiches / ሳንድዊች"]?.[3], cat: "Sandwiches / ሳንድዊች" },
    { item: menuData["Salads / ሰላጣ"]?.[0], cat: "Salads / ሰላጣ" }
  ].filter(entry => entry && entry.item);

  gridCont.innerHTML = featuredItems.map((entry, i) => renderLuxuryCardHtml(entry.item, i, entry.cat)).join('');
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
    
    // Apply fasting filter
    if (fastingOnly) {
      if (!cat.includes("ጾም") && !cat.includes("ፆም") && !cat.includes("መጠጥ")) {
         items = items.filter(itm => 
           (itm.n && (itm.n.toLowerCase().includes("fasting") || itm.n.includes("ጾም") || itm.n.includes("ፆም"))) ||
           (itm.d && (itm.d.toLowerCase().includes("fasting") || itm.d.includes("ጾም") || itm.d.includes("ፆም")))
         );
      }
    }
    
    // Apply search filter
    if (searchQuery) {
      items = items.filter(itm => 
        (itm.n && itm.n.toLowerCase().includes(searchQuery)) || 
        (itm.en && itm.en.toLowerCase().includes(searchQuery)) || 
        (itm.d && itm.d.toLowerCase().includes(searchQuery))
      );
    }

    if (items.length > 0) {
      foundAny = true;
      renderHtml += `
        <div class="menu-category-block" id="cat-${cat.replace(/[\s\/\(\)]+/g, '-')}">
          <h3 class="menu-category-title">${cat}</h3>
          <div class="menu-cards-grid">
            ${items.map((itm, i) => renderLuxuryCardHtml(itm, i, cat)).join('')}
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
      
      const stickyHeader = document.getElementById('fullMenuTabs');
      if (stickyHeader) {
        const offsetPosition = stickyHeader.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }

    }, 150);
  } else {
    renderFullMenu();
  }
  if (typeof initScrollAnimations === 'function') initScrollAnimations();
}
