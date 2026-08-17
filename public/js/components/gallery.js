/* ==========================================================================
   ARENGUADE TILA - PHOTO GALLERY COMPONENT
   Compact Multi-Style Mosaic Layout & Full-Screen Lightbox
   ========================================================================== */

const GALLERY_ITEMS = [
  // --- First 3: Interior ---
  {
    title: 'Main Dining Hall',
    cap: 'Warm golden lighting and intimate candlelit table settings',
    src: '/gallary/interior.jpg',
    layout: 'landscape'
  },
  {
    title: 'Velvet Lounge Seating',
    cap: 'Plush seating designed for relaxed conversations',
    src: '/gallary/interior-2.jpg',
    layout: 'square'
  },
  {
    title: 'Modern Lounge Ambiance',
    cap: 'Contemporary Ethiopian interior design and comfort',
    src: '/gallary/interior-4.jpg',
    layout: 'square'
  },

  // --- Next 2: Coffee ---
  {
    title: 'Traditional Buna Ceremony',
    cap: 'Authentic Ethiopian coffee roasted and brewed with heritage craft',
    src: '/gallary/coffee-section.jpg',
    layout: 'square'
  },
  {
    title: 'Artisan Coffee Roasting',
    cap: 'Clay jebena brewing and traditional incense ritual',
    src: '/gallary/coffee-section-2.jpg',
    layout: 'square'
  },

  // --- Mix of Cuisine, Beverages, Cakes & Views ---
  {
    title: 'Signature Ethiopian Cuisine',
    cap: 'Authentic traditional dishes prepared with premium spices',
    src: '/gallary/foods.jpg',
    layout: 'landscape'
  },
  {
    title: 'Signature Beverages',
    cap: 'Vibrant handcrafted juices and iced fruit infusions',
    src: '/gallary/beverges.jpg',
    layout: 'square'
  },
  {
    title: 'Artisan Cake Collection',
    cap: 'Gourmet multi-layered cakes freshly baked daily',
    src: '/gallary/cakes.jpg',
    layout: 'square'
  },
  {
    title: 'Panoramic Avenue View',
    cap: 'Floor-to-ceiling windows overlooking Kenenisa Avenue',
    src: '/gallary/window-view.jpg',
    layout: 'landscape'
  },
  {
    title: 'Crafted Mocktails',
    cap: 'Refreshing citrus, mint and herbal blends',
    src: '/gallary/beverges-2.jpg',
    layout: 'square'
  },
  {
    title: 'Private Dining Corners',
    cap: 'Quiet tables for romantic dinners and private meetings',
    src: '/gallary/interior-3.jpg',
    layout: 'square'
  },
  {
    title: 'Pastry & Dessert Display',
    cap: 'Delicate chocolate tortes and sweet slices',
    src: '/gallary/cakes-2.jpg',
    layout: 'square'
  },
  {
    title: 'Mixology & Cold Drinks',
    cap: 'Artisan iced beverages poured fresh from the bar',
    src: '/gallary/beverges-3.jpg',
    layout: 'square'
  },
  {
    title: 'Daylight Terrace Outlook',
    cap: 'Sunlit dining spaces with open city skyline views',
    src: '/gallary/window-view-2.jpg',
    layout: 'landscape'
  },
  {
    title: 'Family & Group Tables',
    cap: 'Comfortable spacious booths curated for celebrations',
    src: '/gallary/interior-5.jpg',
    layout: 'square'
  },
  {
    title: 'Sweet Confections',
    cap: 'Rich treats to conclude your dining experience',
    src: '/gallary/cakes-3.jpg',
    layout: 'square'
  },
  {
    title: 'Bar & Night Ambiance',
    cap: 'Warm ambient glow across the main bar counter',
    src: '/gallary/interior-6.jpg',
    layout: 'landscape'
  }
];

let galleryImages = [];
let currentGalleryIndex = 0;

/** Minimal HTML escaper */
const escHtml = (str) => String(str ?? '').replace(/[&<>"']/g,
  c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/**
 * Renders a single compact mosaic card
 */
function renderGalleryCard(item, index) {
  const layoutClass = item.layout ? `gal-card--${item.layout}` : 'gal-card--square';
  
  return `
    <article class="gal-card ${layoutClass}" onclick="openGalleryLightbox(${index})" role="button" tabindex="0"
      onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGalleryLightbox(${index});}"
      aria-label="${escHtml(item.title)}">
      <div class="gal-media">
        <img src="${escHtml(item.src)}" alt="${escHtml(item.title)}" loading="lazy" decoding="async"
          onerror="this.closest('.gal-card')?.classList.add('gal-card--fallback');">
        <span class="gal-expand-icon" aria-hidden="true">⤢</span>
      </div>
      <div class="gal-info">
        <h3 class="gal-info-title">${escHtml(item.title)}</h3>
        ${item.cap ? `<p class="gal-info-desc">${escHtml(item.cap)}</p>` : ''}
      </div>
    </article>
  `;
}

/**
 * Initialize and render the compact mosaic gallery
 */
function initializeGallery() {
  galleryImages = GALLERY_ITEMS;
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  grid.innerHTML = GALLERY_ITEMS.map((item, index) => renderGalleryCard(item, index)).join('');
}

/* ==========================================================================
   LIGHTBOX
   ========================================================================== */

function openGalleryLightbox(index) {
  const item = galleryImages[index];
  if (!item) return;

  currentGalleryIndex = index;

  let modal = document.getElementById('galleryLightbox');
  if (!modal) {
    createGalleryLightbox();
    modal = document.getElementById('galleryLightbox');
  }

  updateGalleryLightbox();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function createGalleryLightbox() {
  const modal = document.createElement('div');
  modal.id = 'galleryLightbox';
  modal.className = 'lightbox-modal';
  modal.innerHTML = `
    <div class="lightbox-close" onclick="closeGalleryLightbox()" aria-label="Close">×</div>
    <div class="lightbox-nav lightbox-prev" onclick="galleryNavigate(-1)" aria-label="Previous">‹</div>
    <div class="lightbox-content">
      <img id="galleryLbImg" src="" alt="">
    </div>
    <div class="lightbox-nav lightbox-next" onclick="galleryNavigate(1)" aria-label="Next">›</div>
    <div class="lb-meta">
      <div class="lb-meta-caption">
        <span id="galleryLbTitle"></span>
        <span id="galleryLbCap"></span>
      </div>
      <span class="gallery-counter"><span id="galleryCounter"></span></span>
    </div>
  `;
  document.body.appendChild(modal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeGalleryLightbox();
  });

  document.addEventListener('keydown', handleGalleryKeyboard);
}

function updateGalleryLightbox() {
  const item = galleryImages[currentGalleryIndex];
  if (!item) return;

  const imgElement = document.getElementById('galleryLbImg');
  const counter = document.getElementById('galleryCounter');
  const titleEl = document.getElementById('galleryLbTitle');
  const capEl = document.getElementById('galleryLbCap');

  if (imgElement) { imgElement.src = item.src; imgElement.alt = item.title; }
  if (counter) counter.textContent = `${currentGalleryIndex + 1} / ${galleryImages.length}`;
  if (titleEl) titleEl.textContent = item.title;
  if (capEl) capEl.textContent = item.cap;
}

function galleryNavigate(direction) {
  if (galleryImages.length === 0) return;
  currentGalleryIndex = (currentGalleryIndex + direction + galleryImages.length) % galleryImages.length;
  updateGalleryLightbox();
}

function handleGalleryKeyboard(e) {
  if (!document.getElementById('galleryLightbox')?.classList.contains('active')) return;
  if (e.key === 'ArrowLeft') galleryNavigate(-1);
  if (e.key === 'ArrowRight') galleryNavigate(1);
  if (e.key === 'Escape') closeGalleryLightbox();
}

function closeGalleryLightbox() {
  const modal = document.getElementById('galleryLightbox');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  document.removeEventListener('keydown', handleGalleryKeyboard);
}
