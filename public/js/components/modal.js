/* ==========================================================================
   ARENGUADE TILA - MODAL & LIGHTBOX COMPONENTS
   ========================================================================== */

/**
 * State variable for the currently selected dish name
 */
let selectedDishName = "";

/**
 * Opens the Quick View dish detail modal with ingredient breakdown
 * @param {string} name Dish title name
 */
function openDishModal(name) {
  let foundItem = null;
  let foundCategory = "";

  for (const category in menuData) {
    const item = menuData[category].find(x => x.n === name);
    if (item) {
      foundItem = item;
      foundCategory = category;
      break;
    }
  }

  if (!foundItem) return;

  selectedDishName = foundItem.n;
  document.getElementById('dishModalCategory').innerText = foundCategory;
  document.getElementById('dishModalTitle').innerText = foundItem.n;
  document.getElementById('dishModalPrice').innerText = foundItem.p + ' ETB';
  document.getElementById('dishModalDesc').innerText = foundItem.d;

  let ingredients = foundItem.ings;
  if (!ingredients) {
    ingredients = foundItem.d.split(/·|,|፣|\//).map(x => x.trim()).filter(x => x.length > 0);
  }

  const pillHtml = ingredients.map(ing => `<span class="luxury-pill">${ing}</span>`).join('');
  document.getElementById('dishModalPills').innerHTML = pillHtml;

  document.getElementById('dishModalReserveBtn').innerText = `Reserve a Table`;
  
  const modalEl = document.getElementById('dishDetailModal');
  if (modalEl) modalEl.classList.add('active');
}

/**
 * Closes the dish detail modal
 */
function closeDishModal() {
  const modalEl = document.getElementById('dishDetailModal');
  if (modalEl) modalEl.classList.remove('active');
}

/**
 * Pre-fills reservation request for selected dish and navigates to form
 */
function reserveSelectedDish() {
  closeDishModal();
  navigateTo('view-reservations');
  setTimeout(() => {
    const textarea = document.querySelector('#reservationFormWrapper textarea');
    if (textarea && selectedDishName) {
      textarea.value = `Table reservation request for: ${selectedDishName}`;
      textarea.focus();
    }
  }, 300);
}

/**
 * Generic Modal triggers
 */
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('active');
}

/**
 * Lightbox Gallery Handler
 */
let lbImages = [];
let lbCurIndex = 0;

function openLightbox(src) {
  const lbContainer = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  
  lbImages = Array.from(document.querySelectorAll('.masonry-item img')).map(img => img.src);
  lbCurIndex = lbImages.indexOf(src);
  
  if (lbImg) lbImg.src = src;
  if (lbContainer) lbContainer.classList.add('active');
}

function closeLightbox() {
  const lbContainer = document.getElementById('lightbox');
  if (lbContainer) lbContainer.classList.remove('active');
}

function lbNavigate(dir) {
  if (window.event) window.event.stopPropagation();
  const lbImg = document.getElementById('lb-img');
  if (lbImages.length === 0) return;
  
  lbCurIndex = (lbCurIndex + dir + lbImages.length) % lbImages.length;
  if (lbImg) lbImg.src = lbImages[lbCurIndex];
}

/**
 * Backdrop click handler for overlay modals
 */
window.onclick = function (e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
  if (e.target.id === 'lightbox') {
    closeLightbox();
  }
};
