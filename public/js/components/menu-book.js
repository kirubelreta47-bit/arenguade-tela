/* ==========================================================================
   ARENGUADE TILA - RESPONSIVE 3D MENU BOOK
   - Desktop (> 820px): Starts closed (Cover Page 1), slides open to 2-page spreads.
   - Mobile (<= 820px): Strictly ONE single page at a time (Page 1 -> 2 -> ... -> 10).
   - Universal Mobile Phone Swiping: Full-view touch detection, directional lock,
     flick support, and OS cancel protection.
   ========================================================================== */

(function () {
  'use strict';

  const TOTAL_PAGES = 10;
  const MENU_PAGES = Array.from({ length: TOTAL_PAGES }, (_, i) => `/menu-pages/page-${i + 1}.jpg`);

  // Desktop 2-Page Spreads:
  const SPREADS = [
    { type: 'cover', left: 1, right: 1, label: 'Welcome · Cover' },
    { type: 'spread', left: 2, right: 3, label: 'Pages 2 - 3' },
    { type: 'spread', left: 4, right: 5, label: 'Pages 4 - 5' },
    { type: 'spread', left: 6, right: 7, label: 'Pages 6 - 7' },
    { type: 'spread', left: 8, right: 9, label: 'Pages 8 - 9' },
    { type: 'back', left: 10, right: 10, label: 'Page 10 · Back' }
  ];

  let currentSpreadIdx = 0; // For desktop
  let mobileCurrentPage = 1; // For mobile (1 through 10)
  let isFlipping = false;
  let gesturesInitialized = false;

  function isMobile() {
    return window.innerWidth <= 820 || (('ontouchstart' in window) && window.innerWidth < 1024 && window.matchMedia('(orientation: portrait)').matches);
  }



  function renderCurrentState() {
    const container = document.getElementById('bookSpreadContainer');
    const leftImg = document.getElementById('spreadLeftImg');
    const rightImg = document.getElementById('spreadRightImg');
    const pageNumEl = document.getElementById('menuBookCurrentPage');

    if (!container) return;

    if (isMobile()) {
      // Mobile: Strictly 1 page at a time
      container.classList.add('is-closed-cover');
      if (rightImg) rightImg.src = MENU_PAGES[mobileCurrentPage - 1];
      if (pageNumEl) {
        if (mobileCurrentPage === 1) pageNumEl.textContent = 'Page 1 · Welcome';
        else if (mobileCurrentPage === TOTAL_PAGES) pageNumEl.textContent = 'Page 10 · Back';
        else pageNumEl.textContent = `Page ${mobileCurrentPage} of ${TOTAL_PAGES}`;
      }
    } else {
      // Desktop: 2-page spreads
      const spread = SPREADS[currentSpreadIdx];
      if (spread.type === 'cover') {
        container.classList.add('is-closed-cover');
        if (rightImg) rightImg.src = MENU_PAGES[0];
      } else {
        container.classList.remove('is-closed-cover');
        if (leftImg) leftImg.src = MENU_PAGES[spread.left - 1];
        if (rightImg) rightImg.src = MENU_PAGES[spread.right - 1];
      }
      if (pageNumEl) pageNumEl.textContent = spread.label;
    }
  }

  /**
   * Flip Forward
   */
  function menuBookNext() {
    if (isFlipping) return;

    if (isMobile()) {
      // Mobile Next (1 page at a time)
      if (mobileCurrentPage >= TOTAL_PAGES) return;
      isFlipping = true;


      const fromP = mobileCurrentPage;
      const toP = mobileCurrentPage + 1;

      const leaf = document.getElementById('spreadFlippingLeaf');
      const leafFrontImg = document.getElementById('leafFrontImg');
      const leafBackImg = document.getElementById('leafBackImg');
      const leafFrontShadow = document.getElementById('leafFrontShadow');
      const leafBackShadow = document.getElementById('leafBackShadow');
      const rightImg = document.getElementById('spreadRightImg');

      leafFrontImg.src = MENU_PAGES[fromP - 1];
      leafBackImg.src = MENU_PAGES[toP - 1];
      rightImg.src = MENU_PAGES[toP - 1];

      leaf.style.transition = 'none';
      leaf.style.transform = 'rotateY(0deg)';
      leaf.style.visibility = 'visible';
      if (leafFrontShadow) leafFrontShadow.style.opacity = '0';
      if (leafBackShadow) leafBackShadow.style.opacity = '0.35';

      void leaf.offsetWidth;

      leaf.style.transition = 'transform 0.46s cubic-bezier(0.28, 0, 0.18, 1)';
      leaf.style.transform = 'rotateY(-180deg)';
      if (leafFrontShadow) leafFrontShadow.style.opacity = '0.45';
      if (leafBackShadow) leafBackShadow.style.opacity = '0';

      setTimeout(() => {
        mobileCurrentPage = toP;
        renderCurrentState();
        leaf.style.visibility = 'hidden';
        leaf.style.transition = 'none';
        leaf.style.transform = 'rotateY(0deg)';
        isFlipping = false;
      }, 480);

    } else {
      // Desktop Next (2-page spread)
      if (currentSpreadIdx >= SPREADS.length - 1) return;
      isFlipping = true;

      const curr = SPREADS[currentSpreadIdx];
      const next = SPREADS[currentSpreadIdx + 1];

      const container = document.getElementById('bookSpreadContainer');
      const leaf = document.getElementById('spreadFlippingLeaf');
      const leafFrontImg = document.getElementById('leafFrontImg');
      const leafBackImg = document.getElementById('leafBackImg');
      const leafFrontShadow = document.getElementById('leafFrontShadow');
      const leafBackShadow = document.getElementById('leafBackShadow');
      const rightImg = document.getElementById('spreadRightImg');
      const leftImg = document.getElementById('spreadLeftImg');

      if (curr.type === 'cover') {
        container.classList.remove('is-closed-cover');
        leafFrontImg.src = MENU_PAGES[0];
        leafBackImg.src = MENU_PAGES[1]; // Page 2
        rightImg.src = MENU_PAGES[2]; // Page 3
        if (leftImg) leftImg.src = MENU_PAGES[1];
      } else {
        leafFrontImg.src = MENU_PAGES[curr.right - 1];
        leafBackImg.src = MENU_PAGES[next.left - 1];
        rightImg.src = MENU_PAGES[next.right - 1];
      }

      leaf.style.transition = 'none';
      leaf.style.transform = 'rotateY(0deg)';
      leaf.style.visibility = 'visible';
      if (leafFrontShadow) leafFrontShadow.style.opacity = '0';
      if (leafBackShadow) leafBackShadow.style.opacity = '0.35';

      void leaf.offsetWidth;

      leaf.style.transition = 'transform 0.52s cubic-bezier(0.28, 0, 0.18, 1)';
      leaf.style.transform = 'rotateY(-180deg)';
      if (leafFrontShadow) leafFrontShadow.style.opacity = '0.45';
      if (leafBackShadow) leafBackShadow.style.opacity = '0';

      setTimeout(() => {
        currentSpreadIdx++;
        renderCurrentState();
        leaf.style.visibility = 'hidden';
        leaf.style.transition = 'none';
        leaf.style.transform = 'rotateY(0deg)';
        isFlipping = false;
      }, 540);
    }
  }

  /**
   * Flip Backward (Fixed Realistic Page Flip Mechanics)
   */
  function menuBookPrev() {
    if (isFlipping) return;

    if (isMobile()) {
      // Mobile Prev (1 page at a time)
      if (mobileCurrentPage <= 1) return;
      isFlipping = true;

      const fromP = mobileCurrentPage;
      const toP = mobileCurrentPage - 1;

      const leaf = document.getElementById('spreadFlippingLeaf');
      const leafFrontImg = document.getElementById('leafFrontImg');
      const leafBackImg = document.getElementById('leafBackImg');
      const leafFrontShadow = document.getElementById('leafFrontShadow');
      const leafBackShadow = document.getElementById('leafBackShadow');
      const rightImg = document.getElementById('spreadRightImg');

      leafFrontImg.src = MENU_PAGES[toP - 1];
      leafBackImg.src = MENU_PAGES[fromP - 1];
      rightImg.src = MENU_PAGES[fromP - 1];

      leaf.style.transition = 'none';
      leaf.style.transform = 'rotateY(-180deg)';
      leaf.style.visibility = 'visible';
      if (leafFrontShadow) leafFrontShadow.style.opacity = '0.45';
      if (leafBackShadow) leafBackShadow.style.opacity = '0';

      void leaf.offsetWidth;

      leaf.style.transition = 'transform 0.46s cubic-bezier(0.28, 0, 0.18, 1)';
      leaf.style.transform = 'rotateY(0deg)';
      if (leafFrontShadow) leafFrontShadow.style.opacity = '0';
      if (leafBackShadow) leafBackShadow.style.opacity = '0.35';

      setTimeout(() => {
        rightImg.src = MENU_PAGES[toP - 1];
        mobileCurrentPage = toP;
        renderCurrentState();
        leaf.style.visibility = 'hidden';
        leaf.style.transition = 'none';
        leaf.style.transform = 'rotateY(0deg)';
        isFlipping = false;
      }, 480);

    } else {
      // Desktop Prev (2-page spread)
      if (currentSpreadIdx <= 0) return;
      isFlipping = true;

      const curr = SPREADS[currentSpreadIdx];
      const prev = SPREADS[currentSpreadIdx - 1];

      const container = document.getElementById('bookSpreadContainer');
      const leaf = document.getElementById('spreadFlippingLeaf');
      const leafFrontImg = document.getElementById('leafFrontImg');
      const leafBackImg = document.getElementById('leafBackImg');
      const leafFrontShadow = document.getElementById('leafFrontShadow');
      const leafBackShadow = document.getElementById('leafBackShadow');
      const leftImg = document.getElementById('spreadLeftImg');
      const rightImg = document.getElementById('spreadRightImg');

      if (prev.type === 'cover') {
        leafFrontImg.src = MENU_PAGES[0];
        leafBackImg.src = MENU_PAGES[curr.left - 1];
        rightImg.src = MENU_PAGES[curr.right - 1];
      } else {
        leafFrontImg.src = MENU_PAGES[prev.right - 1];
        leafBackImg.src = MENU_PAGES[curr.left - 1];
        leftImg.src = MENU_PAGES[prev.left - 1];
        rightImg.src = MENU_PAGES[curr.right - 1];
      }

      leaf.style.transition = 'none';
      leaf.style.transform = 'rotateY(-180deg)';
      leaf.style.visibility = 'visible';
      if (leafFrontShadow) leafFrontShadow.style.opacity = '0.45';
      if (leafBackShadow) leafBackShadow.style.opacity = '0';

      void leaf.offsetWidth;

      leaf.style.transition = 'transform 0.52s cubic-bezier(0.28, 0, 0.18, 1)';
      leaf.style.transform = 'rotateY(0deg)';
      if (leafFrontShadow) leafFrontShadow.style.opacity = '0';
      if (leafBackShadow) leafBackShadow.style.opacity = '0.35';

      setTimeout(() => {
        currentSpreadIdx--;
        renderCurrentState();
        leaf.style.visibility = 'hidden';
        leaf.style.transition = 'none';
        leaf.style.transform = 'rotateY(0deg)';
        isFlipping = false;
      }, 540);
    }
  }

  /**
   * Robust Gesture Engine for Phones (iOS & Android) & Desktop
   */
  function setupGestures() {
    if (gesturesInitialized) return;

    const menuPage = document.getElementById('full-menu-page');
    if (!menuPage) return;

    gesturesInitialized = true;

    // --- TOUCH EVENTS (Phones & Tablets) ---
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let touchHorizontalLock = false;

    function handleTouchStart(e) {
      if (isFlipping) return;
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      touchStartX = t.clientX;
      touchStartY = t.clientY;
      touchStartTime = Date.now();
      touchHorizontalLock = false;
    }

    function handleTouchMove(e) {
      if (isFlipping) return;
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      const diffX = t.clientX - touchStartX;
      const diffY = t.clientY - touchStartY;
      const absX = Math.abs(diffX);
      const absY = Math.abs(diffY);

      // Lock to horizontal swipe if moving more horizontally than vertically
      if (!touchHorizontalLock && absX > 10) {
        if (absX > absY) {
          touchHorizontalLock = true;
        }
      }

      // Prevent native horizontal gesture interference
      if (touchHorizontalLock && e.cancelable) {
        e.preventDefault();
      }
    }

    function handleTouchEnd(e) {
      if (isFlipping) return;
      const t = e.changedTouches ? e.changedTouches[0] : null;
      if (!t) return;

      const diffX = t.clientX - touchStartX;
      const diffY = t.clientY - touchStartY;
      const absX = Math.abs(diffX);
      const absY = Math.abs(diffY);
      const duration = Date.now() - touchStartTime;

      // Swipe detected:
      // 1. Horizontal movement dominates vertical movement
      // 2. Either moved at least 25px, OR quick flick (at least 15px in < 350ms)
      if (absX > absY && (absX >= 25 || (absX >= 15 && duration < 350))) {
        if (diffX < 0) {
          menuBookNext(); // Swipe left -> Next page
        } else {
          menuBookPrev(); // Swipe right -> Previous page
        }
      }

      touchHorizontalLock = false;
    }

    // Attach to entire menuPage view so touch anywhere on screen registers
    menuPage.addEventListener('touchstart', handleTouchStart, { passive: true });
    menuPage.addEventListener('touchmove', handleTouchMove, { passive: false });
    menuPage.addEventListener('touchend', handleTouchEnd, { passive: true });
    menuPage.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    // --- MOUSE DRAG FOR DESKTOP ---
    let mouseStartX = 0;
    let isMouseDown = false;

    menuPage.addEventListener('mousedown', (e) => {
      if (isFlipping || e.button !== 0) return;
      if (e.target.closest('nav, button, a')) return;
      isMouseDown = true;
      mouseStartX = e.clientX;
    });

    window.addEventListener('mouseup', (e) => {
      if (!isMouseDown) return;
      isMouseDown = false;
      if (isFlipping) return;

      const diffX = e.clientX - mouseStartX;
      if (Math.abs(diffX) >= 28) {
        if (diffX < 0) menuBookNext();
        else menuBookPrev();
      }
    });
  }

  function initMenuBook() {
    renderCurrentState();
    setupGestures();
  }

  // Handle window resizing / rotation between desktop & mobile modes
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      renderCurrentState();
    }, 150);
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    const fullMenuPage = document.getElementById('full-menu-page');
    if (!fullMenuPage || fullMenuPage.style.display === 'none') return;
    if (e.key === 'ArrowLeft') menuBookPrev();
    else if (e.key === 'ArrowRight') menuBookNext();
  });

  document.addEventListener('DOMContentLoaded', () => {
    initMenuBook();
  });

  // Expose globals
  window.initMenuBook = initMenuBook;
  window.menuBookNext = menuBookNext;
  window.menuBookPrev = menuBookPrev;

})();
