/* ==========================================================================
   ARENGUADE TILA - GALLERY COMPONENT
   ========================================================================== */

/**
 * Gallery data with images and descriptions
 */
const galleryData = [
  {
    src: 'https://images.unsplash.com/photo-1584622614875-e62df8ac371f?w=600&h=600&fit=crop&q=80',
    title: 'Elegant Dining Space',
    category: 'Interior'
  },
  {
    src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=600&fit=crop&q=80',
    title: 'Gourmet Plating',
    category: 'Food'
  },
  {
    src: 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=600&h=600&fit=crop&q=80',
    title: 'Coffee Culture',
    category: 'Beverages'
  },
  {
    src: 'https://images.unsplash.com/photo-1504674900968-f873feac2859?w=600&h=600&fit=crop&q=80',
    title: 'Fine Dining Experience',
    category: 'Moments'
  },
  {
    src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop&q=80',
    title: 'Restaurant Interior',
    category: 'Interior'
  },
  {
    src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=600&fit=crop&q=80',
    title: 'Sophisticated Bar',
    category: 'Interior'
  },
  {
    src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=600&fit=crop&q=80',
    title: 'Artisan Cuisine',
    category: 'Food'
  },
  {
    src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=600&fit=crop&q=80',
    title: 'Premium Ingredients',
    category: 'Food'
  },
  {
    src: 'https://images.unsplash.com/photo-1537621793619-4f624139054d?w=600&h=600&fit=crop&q=80',
    title: 'Delicate Plating',
    category: 'Food'
  },
  {
    src: 'https://images.unsplash.com/photo-1495640388908-05a76f1ea362?w=600&h=600&fit=crop&q=80',
    title: 'Wine Selection',
    category: 'Beverages'
  },
  {
    src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=600&fit=crop&q=80',
    title: 'Table Setting',
    category: 'Interior'
  },
  {
    src: 'https://images.unsplash.com/photo-1495474472645-4c71bcdd2014?w=600&h=600&fit=crop&q=80',
    title: 'Culinary Art',
    category: 'Food'
  },
  {
    src: 'https://images.unsplash.com/photo-1414235077418-8a1af50b9338?w=600&h=600&fit=crop&q=80',
    title: 'Evening Ambiance',
    category: 'Moments'
  },
  {
    src: 'https://images.unsplash.com/photo-1513985248281-a7b0f8a8e8c1?w=600&h=600&fit=crop&q=80',
    title: 'Chef\'s Presentation',
    category: 'Behind the Scenes'
  },
  {
    src: 'https://images.unsplash.com/photo-1537909352847-f1cea42e09cb?w=600&h=600&fit=crop&q=80',
    title: 'Community Dining',
    category: 'Moments'
  },
  {
    src: 'https://images.unsplash.com/photo-1460873646552-4d580d50b0e9?w=600&h=600&fit=crop&q=80',
    title: 'Signature Dish',
    category: 'Food'
  },
  {
    src: 'https://images.unsplash.com/photo-1504674900968-f873feac2859?w=600&h=600&fit=crop&q=80',
    title: 'Ambient Lighting',
    category: 'Interior'
  },
  {
    src: 'https://images.unsplash.com/photo-1555939594-58d7cb561e1f?w=600&h=600&fit=crop&q=80',
    title: 'Fresh Vegetables',
    category: 'Food'
  },
  {
    src: 'https://images.unsplash.com/photo-1504674900968-f873feac2859?w=600&h=600&fit=crop&q=80',
    title: 'Plated Masterpiece',
    category: 'Food'
  },
  {
    src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=600&fit=crop&q=80',
    title: 'Lounge Area',
    category: 'Interior'
  },
  {
    src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop&q=80',
    title: 'Restaurant Ambiance',
    category: 'Interior'
  },
  {
    src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=600&fit=crop&q=80',
    title: 'Gourmet Meal',
    category: 'Food'
  },
  {
    src: 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=600&h=600&fit=crop&q=80',
    title: 'Espresso Service',
    category: 'Beverages'
  },
  {
    src: 'https://images.unsplash.com/photo-1495640388908-05a76f1ea362?w=600&h=600&fit=crop&q=80',
    title: 'Cocktail Bar',
    category: 'Beverages'
  },
  {
    src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=600&fit=crop&q=80',
    title: 'Spice Market',
    category: 'Food'
  },
  {
    src: 'https://images.unsplash.com/photo-1537621793619-4f624139054d?w=600&h=600&fit=crop&q=80',
    title: 'Chef Selection',
    category: 'Food'
  },
  {
    src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=600&fit=crop&q=80',
    title: 'Place Setting',
    category: 'Interior'
  },
  {
    src: 'https://images.unsplash.com/photo-1495474472645-4c71bcdd2014?w=600&h=600&fit=crop&q=80',
    title: 'Plate Artistry',
    category: 'Food'
  },
  {
    src: 'https://images.unsplash.com/photo-1414235077418-8a1af50b9338?w=600&h=600&fit=crop&q=80',
    title: 'Night Dining',
    category: 'Moments'
  },
  {
    src: 'https://images.unsplash.com/photo-1513985248281-a7b0f8a8e8c1?w=600&h=600&fit=crop&q=80',
    title: 'Kitchen Art',
    category: 'Behind the Scenes'
  },
  {
    src: 'https://images.unsplash.com/photo-1537909352847-f1cea42e09cb?w=600&h=600&fit=crop&q=80',
    title: 'Gathering Moment',
    category: 'Moments'
  }
];

/**
 * Current lightbox state
 */
let currentGalleryIndex = 0;

/**
 * Initialize and render the gallery
 */
function initializeGallery() {
  renderGalleryGrid();
  setupGalleryEventListeners();
}

/**
 * Render gallery grid
 */
function renderGalleryGrid() {
  const galleryGrid = document.getElementById('galleryGrid');
  if (!galleryGrid) return;

  galleryGrid.innerHTML = galleryData.map((item, index) => `
    <div class="gallery-item" onclick="openGalleryLightbox(${index})">
      <img 
        src="${item.src}" 
        alt="${item.title}" 
        loading="lazy"
        decoding="async"
        data-category="${item.category}">
      <div class="gallery-overlay">
        <div class="gallery-icon">🖼️</div>
      </div>
    </div>
  `).join('');
}

/**
 * Open lightbox with specific image
 */
function openGalleryLightbox(index) {
  currentGalleryIndex = index;
  const modal = document.getElementById('galleryLightbox');
  
  if (!modal) {
    createGalleryLightbox();
    return openGalleryLightbox(index);
  }

  updateGalleryLightbox();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Create lightbox modal if it doesn't exist
 */
function createGalleryLightbox() {
  const modal = document.createElement('div');
  modal.id = 'galleryLightbox';
  modal.className = 'lightbox-modal';
  modal.innerHTML = `
    <div class="lightbox-close" onclick="closeGalleryLightbox()">×</div>
    <div class="lightbox-nav lightbox-prev" onclick="galleryNavigate(-1)">‹</div>
    <div class="lightbox-content">
      <img id="galleryLbImg" src="" alt="Gallery Image">
    </div>
    <div class="lightbox-nav lightbox-next" onclick="galleryNavigate(1)">›</div>
    <div class="gallery-counter">
      <span id="galleryCounter"></span>
    </div>
  `;
  document.body.appendChild(modal);

  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeGalleryLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', handleGalleryKeyboard);
}

/**
 * Update lightbox content
 */
function updateGalleryLightbox() {
  const item = galleryData[currentGalleryIndex];
  const imgElement = document.getElementById('galleryLbImg');
  const counter = document.getElementById('galleryCounter');

  if (imgElement) {
    imgElement.src = item.src;
    imgElement.alt = item.title;
  }

  if (counter) {
    counter.textContent = `${currentGalleryIndex + 1} / ${galleryData.length}`;
  }
}

/**
 * Navigate gallery
 */
function galleryNavigate(direction) {
  currentGalleryIndex = (currentGalleryIndex + direction + galleryData.length) % galleryData.length;
  updateGalleryLightbox();
}

/**
 * Handle keyboard navigation
 */
function handleGalleryKeyboard(e) {
  if (!document.getElementById('galleryLightbox')?.classList.contains('active')) return;

  if (e.key === 'ArrowLeft') galleryNavigate(-1);
  if (e.key === 'ArrowRight') galleryNavigate(1);
  if (e.key === 'Escape') closeGalleryLightbox();
}

/**
 * Close lightbox
 */
function closeGalleryLightbox() {
  const modal = document.getElementById('galleryLightbox');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  document.removeEventListener('keydown', handleGalleryKeyboard);
}

/**
 * Setup event listeners for gallery
 */
function setupGalleryEventListeners() {
  // Gallery items already have onclick handlers
  // This function can be expanded for additional interactions
}
