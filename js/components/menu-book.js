/* ==========================================================================
   ARENGUADE TILA - RESPONSIVE 3D MENU BOOK
   - Desktop (> 768px): Starts closed (Cover Page 1), slides open to 2-page spreads.
   - Mobile (<= 768px): Strictly ONE single page at a time (Page 1 -> 2 -> ... -> 10).
   - Authentic 3D Page Turn: Zero abrupt image switching, exact physical faces.
   - Strictly SLIDING/DRAGGING gesture required (no accidental single-touch/click flips).
   - Fully scrollable page, natural flow, no button clutter.
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

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function playPaperSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!window._menuAudioCtx) window._menuAudioCtx = new AudioCtx();
      const ctx = window._menuAudioCtx;
      if (ctx.state === 'suspended') ctx.resume();

      const duration = 0.22;
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        const progress = i / bufferSize;
        const decay = Math.exp(-progress * 5.5);
        output[i] = (Math.random() * 2 - 1) * decay * (0.8 + Math.sin(progress * 35) * 0.2);
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(650, ctx.currentTime + duration);
      filter.Q.value = 1.1;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
    } catch (e) {}
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
      playPaperSound();

      const fromP = mobileCurrentPage;
      const toP = mobileCurrentPage + 1;

      const leaf = document.getElementById('spreadFlippingLeaf');
      const leafFrontImg = document.getElementById('leafFrontImg');
      const leafBackImg = document.getElementById('leafBackImg');
      const leafFrontShadow = document.getElementById('leafFrontShadow');
      const leafBackShadow = document.getElementById('leafBackShadow');
      const rightImg = document.getElementById('spreadRightImg');

      // The leaf starts at 0deg on the right showing fromP
      leafFrontImg.src = MENU_PAGES[fromP - 1];
      // When it flips to -180deg on the left, its back face will show toP
      leafBackImg.src = MENU_PAGES[toP - 1];
      // Underneath, the static layer is already set to toP!
      rightImg.src = MENU_PAGES[toP - 1];

      leaf.style.transition = 'none';
      leaf.style.transform = 'rotateY(0deg)';
      leaf.style.visibility = 'visible';
      if (leafFrontShadow) leafFrontShadow.style.opacity = '0';
      if (leafBackShadow) leafBackShadow.style.opacity = '0.35';

      void leaf.offsetWidth;

      leaf.style.transition = 'transform 0.5s cubic-bezier(0.28, 0, 0.18, 1)';
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
      }, 520);

    } else {
      // Desktop Next (2-page spread)
      if (currentSpreadIdx >= SPREADS.length - 1) return;
      isFlipping = true;
      playPaperSound();

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
      playPaperSound();

      const fromP = mobileCurrentPage;
      const toP = mobileCurrentPage - 1;

      const leaf = document.getElementById('spreadFlippingLeaf');
      const leafFrontImg = document.getElementById('leafFrontImg');
      const leafBackImg = document.getElementById('leafBackImg');
      const leafFrontShadow = document.getElementById('leafFrontShadow');
      const leafBackShadow = document.getElementById('leafBackShadow');
      const rightImg = document.getElementById('spreadRightImg');

      // REALISTIC MECHANICS:
      // Page toP is flipping back from the left to land on the right over fromP.
      // When it lands on the right at 0deg, the face looking at user is leafFront.
      // So leafFrontImg MUST be toP!
      leafFrontImg.src = MENU_PAGES[toP - 1];
      // While it starts on the left at -180deg, its back is leafBackImg.
      leafBackImg.src = MENU_PAGES[fromP - 1];

      // Underneath, the static layer holds fromP until toP covers it
      rightImg.src = MENU_PAGES[fromP - 1];

      leaf.style.transition = 'none';
      leaf.style.transform = 'rotateY(-180deg)';
      leaf.style.visibility = 'visible';
      if (leafFrontShadow) leafFrontShadow.style.opacity = '0.45';
      if (leafBackShadow) leafBackShadow.style.opacity = '0';

      void leaf.offsetWidth;

      leaf.style.transition = 'transform 0.5s cubic-bezier(0.28, 0, 0.18, 1)';
      leaf.style.transform = 'rotateY(0deg)';
      if (leafFrontShadow) leafFrontShadow.style.opacity = '0';
      if (leafBackShadow) leafBackShadow.style.opacity = '0.35';

      setTimeout(() => {
        // When landing completes at 0deg, rightImg is already covered by leafFront (toP).
        // Update rightImg to toP before hiding leaf, ensuring ZERO image flicker!
        rightImg.src = MENU_PAGES[toP - 1];
        mobileCurrentPage = toP;
        renderCurrentState();
        leaf.style.visibility = 'hidden';
        leaf.style.transition = 'none';
        leaf.style.transform = 'rotateY(0deg)';
        isFlipping = false;
      }, 520);

    } else {
      // Desktop Prev (2-page spread)
      if (currentSpreadIdx <= 0) return;
      isFlipping = true;
      playPaperSound();

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
        // Closing back onto cover:
        // Left page (Page 2) lifts and closes over right page to become Cover Page 1
        leafFrontImg.src = MENU_PAGES[0]; // Front face becomes Cover Page 1
        leafBackImg.src = MENU_PAGES[curr.left - 1]; // Back face was Page 2
        // Right under-layer stays curr.right until covered
        rightImg.src = MENU_PAGES[curr.right - 1];
      } else {
        // Turning backward between spreads (e.g. Pages 4-5 -> 2-3):
        // Page 3 flips from left to right to land on the right stack
        leafFrontImg.src = MENU_PAGES[prev.right - 1]; // Will show Page 3 when landing at 0deg
        leafBackImg.src = MENU_PAGES[curr.left - 1]; // Shows Page 4 swinging away from left
        // Underneath on the left, Page 2 is revealed immediately as Page 4 lifts!
        leftImg.src = MENU_PAGES[prev.left - 1];
        // Underneath on the right, stays Page 5 until Page 3 lands
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
   * Setup Slide / Swipe Gestures
   * Strictly requires sliding motion (> 35px). Clicking or tapping does NOT flip.
   */
  function setupSlideGestures() {
    const stage = document.getElementById('bookSpreadContainer');
    const bookSpread = document.getElementById('bookSpread');
    if (!stage || !bookSpread) return;

    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragDistance = 0;
    let dragDirection = null;
    let isHorizontalSlide = false;

    function onPointerDown(e) {
      if (isFlipping) return;
      isDragging = true;
      isHorizontalSlide = false;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      dragDistance = 0;
      dragDirection = null;
      bookSpread.classList.add('is-dragging');
    }

    function onPointerMove(e) {
      if (!isDragging || isFlipping) return;

      const diffX = e.clientX - dragStartX;
      const diffY = e.clientY - dragStartY;

      if (!isHorizontalSlide && (Math.abs(diffX) > 10 || Math.abs(diffY) > 10)) {
        if (Math.abs(diffX) > Math.abs(diffY)) {
          isHorizontalSlide = true;
        } else {
          isDragging = false;
          bookSpread.classList.remove('is-dragging');
          return;
        }
      }

      if (isHorizontalSlide) {
        dragDistance = diffX;
        if (diffX < -15) {
          dragDirection = 'next';
        } else if (diffX > 15) {
          dragDirection = 'prev';
        }
      }
    }

    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      bookSpread.classList.remove('is-dragging');

      if (isHorizontalSlide && Math.abs(dragDistance) >= 35) {
        if (dragDirection === 'next') {
          menuBookNext();
        } else if (dragDirection === 'prev') {
          menuBookPrev();
        }
      }

      dragDistance = 0;
      dragDirection = null;
      isHorizontalSlide = false;
    }

    stage.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  }

  function initMenuBook() {
    renderCurrentState();
    setupSlideGestures();
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
