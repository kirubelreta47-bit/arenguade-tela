/* ==========================================================================
   ARENGUADE TILA - UI HELPERS & UTILITIES
   ========================================================================== */

/**
 * Escapes single quotes for inline JS string attributes
 * @param {string} str 
 * @returns {string} Escaped string
 */
function escapeJsString(str) {
  return String(str || '').replace(/'/g, "\\'");
}

/**
 * Rating star state management
 */
let currentRating = 4;

function setRating(val) {
  currentRating = val;
  const ratingInput = document.getElementById('ratingValue');
  if (ratingInput) ratingInput.value = val;
  renderStars(val);
}

function hoverRating(val) {
  renderStars(val);
}

function resetRating() {
  renderStars(currentRating);
}

function renderStars(val) {
  const stars = document.querySelectorAll('.stars span');
  stars.forEach((starEl, index) => {
    starEl.innerText = index < val ? '★' : '☆';
    starEl.style.transform = index < val ? 'scale(1.2)' : 'scale(1)';
    starEl.style.opacity = index < val ? '1' : '0.5';
  });
}

/**
 * Initializes date picker min dates for native date inputs
 */
function initDatePicker() {
  // Prevent past dates in native date inputs
  document.querySelectorAll('input[type="date"]').forEach(inputEl => {
    inputEl.min = new Date().toISOString().split('T')[0];
  });
}
