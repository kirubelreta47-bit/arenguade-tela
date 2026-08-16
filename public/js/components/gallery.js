/* ==========================================================================
   ARENGUADE TILA - GALLERY COMPONENT
   Showcase grids for restaurant interior + food (ready for real photos).
   --------------------------------------------------------------------------
   HOW TO ADD PHOTOS:
   Add a `src` field to any item:
     { title: 'Kitfo Special', cap: 'Hand-chopped beef', src: '/images/kitfo.jpg' }
   Items WITHOUT a src render as designed placeholders.
   ========================================================================== */

const GALLERY_SECTIONS = [
  {
    id: 'interior',
    num: '01',
    icon: '🛋️',
    title: 'Interior & Ambiance',
    amh: 'የውስጥ ማስጌጫ',
    tagline: 'Deep blues, warm gold and candlelight — rooms built for long evenings and quiet conversations.',
    layout: 'showcase',
    accent: '#7C93B8',
    items: [
      { title: 'The Main Dining Hall', cap: 'Where evenings begin' },
      { title: 'Golden Hour Seating', cap: 'Light through the windows' },
      { title: 'Private Corner', cap: 'Quiet tables for two' },
      { title: 'Candlelit Tables', cap: 'The after-dark glow' },
      { title: 'The Lounge', cap: 'Low seats, slow drinks' },
      { title: 'Window Views', cap: 'Kenenisa Avenue below' },
      { title: 'Bar & Counter', cap: 'Where the night opens' },
      { title: 'Terrace Glow', cap: 'Third-floor air & skyline' }
    ]
  },
  {
    id: 'food',
    num: '02',
    icon: '🍽️',
    title: 'Food & Plates',
    amh: 'ምግቦች',
    tagline: 'Signature plates from the kitchen — kitfo, shiro, tibs and the dishes guests come back for.',
    layout: 'showcase',
    accent: '#C9A227',
    items: [
      { title: 'Kitfo Special', cap: 'Hand-chopped beef, spiced butter & mitmita' },
      { title: 'Tegabino Shiro', cap: 'Sizzling clay-pot shiro' },
      { title: 'Shekla Tibs', cap: 'Flame-seared beef, rosemary smoke' },
      { title: 'Fasting Agalta', cap: 'The full vegetarian spread' },
      { title: 'Special Dulet', cap: 'Minced tripe & liver, berbere kiss' },
      { title: 'Chechebsa', cap: 'Pancake ribbons, kibbeh & honey' },
      { title: 'Meat Lover Pizza', cap: 'House favourite from the oven' },
      { title: 'Arenguade Salad', cap: 'Fresh, bright, composed' },
      { title: 'Honey Cake', cap: 'A sweet finish' }
    ]
  },
  {
    id: 'drinks',
    num: '03',
    icon: '🍹',
    title: 'Coffee & Drinks',
    amh: 'ቡና እና መጠጦች',
    tagline: 'From the jebena to the bar — coffee, tej, fresh juices and cocktails poured with care.',
    layout: 'showcase-tight',
    accent: '#D98E32',
    items: [
      { title: 'Coffee Ceremony', cap: 'Roasted, ground and poured at your table' },
      { title: 'Espresso & Macchiato', cap: 'House roast, strong and clean' },
      { title: 'Classic Tej', cap: 'Golden honey wine' },
      { title: 'Fresh Juices', cap: 'Mango, avocado & seasonal blends' },
      { title: 'Signature Cocktails', cap: 'Mint, citrus and slow evenings' },
      { title: 'Spiced Latte', cap: 'Cinnamon, cardamom & cream' },
      { title: 'Mocktails', cap: 'Zero-proof, full flavor' },
      { title: 'Soft Drinks & Water', cap: 'Cold and ready' }
    ]
  }
];

/**
 * Flat list of image-bearing items, in display order (for the lightbox).
 */
let galleryImages = [];
let galleryImgIndex = 0;
let currentGalleryIndex = 0;

/** Minimal HTML escaper for rendered data */
const escHtml = (str) => String(str ?? '').replace(/[&<>"']/g,
  c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/**
 * Renders a single tile.
 */
function galleryItemHtml(item, section, imgIndex) {
  const hasImg = imgIndex >= 0 && item.src;

  if (hasImg) {
    return `
      <figure class="gal-item gal-img" onclick="openGalleryLightbox(${imgIndex})" role="button" tabindex="0"
        onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGalleryLightbox(${imgIndex});}">
        <img src="${escHtml(item.src)}" alt="${escHtml(item.title)}" loading="lazy" decoding="async">
        <span class="gal-view">⤢</span>
        <figcaption class="gal-cap">
          <span class="gal-cap-title">${escHtml(item.title)}</span>
          ${item.cap ? `<span class="gal-cap-sub">${escHtml(item.cap)}</span>` : ''}
        </figcaption>
      </figure>`;
  }

  return `
    <div class="gal-item gal-ph" aria-label="${escHtml(item.title)} — photo coming soon">
      <span class="gal-ph-icon">${section.icon}</span>
      <div class="gal-ph-body">
        <span class="gal-ph-title">${escHtml(item.title)}</span>
        ${item.cap ? `<span class="gal-ph-cap">${escHtml(item.cap)}</span>` : ''}
        <span class="gal-ph-note">Photo coming soon</span>
      </div>
    </div>`;
}

/**
 * Renders one full chapter: header + grid.
 */
function gallerySectionHtml(section) {
  const itemsHtml = section.items.map(item => {
    if (!item.src) return galleryItemHtml(item, section, -1);
    const idx = galleryImgIndex++;
    galleryImages.push({
      src: item.src,
      title: item.title,
      cap: item.cap || '',
      section: section.title
    });
    return galleryItemHtml(item, section, idx);
  }).join('');

  return `
    <section class="gal-section" id="gal-${section.id}" data-target="${section.id}" style="--acc: ${section.accent}">
      <header class="gal-section-head">
        <span class="gal-num" aria-hidden="true">${section.num}</span>
        <div class="gal-head-text">
          <span class="gal-eyebrow">${section.icon} <span>${escHtml(section.amh)}</span></span>
          <h2 class="gal-title">${escHtml(section.title)}</h2>
          <p class="gal-tagline">${escHtml(section.tagline)}</p>
        </div>
      </header>
      <div class="gal-grid gal-layout-${section.layout}">${itemsHtml}</div>
    </section>`;
}

/**
 * Renders the sticky chapter quick-nav.
 */
function renderGalleryNav() {
  const nav = document.getElementById('galleryNav');
  if (!nav) return;
  nav.innerHTML = GALLERY_SECTIONS.map(s => `
    <a class="gn-pill" href="#gal-${s.id}" data-target="${s.id}">
      <span class="gn-num">${s.num}</span>${escHtml(s.title)}
    </a>`).join('');
}

/**
 * Scrollspy — highlights the quick-nav pill for the section in view.
 */
function initGalleryScrollspy() {
  const pills = document.querySelectorAll('.gn-pill');
  if (!pills.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target.dataset.target;
        pills.forEach(p => p.classList.toggle('active', p.dataset.target === target));
      }
    });
  }, { rootMargin: '-25% 0px -65% 0px', threshold: 0 });

  document.querySelectorAll('.gal-section').forEach(sec => observer.observe(sec));
}

/**
 * Initialize and render the gallery.
 */
function initializeGallery() {
  galleryImages = [];
  galleryImgIndex = 0;
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  grid.innerHTML = GALLERY_SECTIONS.map(gallerySectionHtml).join('');
  renderGalleryNav();
  initGalleryScrollspy();
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
