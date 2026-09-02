/* ==========================================================================
   ARENGUADE TILA - RESPONSIVE 3D MENU BOOK
   - Desktop (> 768px): Starts closed (Cover Page 1), slides open to 2-page spreads.
   - Mobile (<= 768px): Strictly ONE single page at a time (Page 1 -> 2 -> ... -> 10).
   - Touch Swiping for Mobile Phones: Native TouchEvents with directional lock.
   - Pointer Dragging for Desktop Mouse.
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

      leafFrontImg.src = MENU_PAGES[fromP - 1];
      leafBackImg.src = MENU_PAGES[toP - 1];
      rightImg.src = MENU_PAGES[toP - 1];

      leaf.style.transition = 'none';
      leaf.style.transform = 'rotateY(0deg)';
      leaf.style.visibility = 'visible';
      if (leafFrontShadow) leafFrontShadow.style.opacity = '0';
      if (leafBackShadow) leafBackShadow.style.opacity = '0.35';

      void leaf.offsetWidth;

      leaf.style.transition = 'transform 0.48s cubic-bezier(0.28, 0, 0.18, 1)';
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
      }, 500);

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
   * Flip Backward
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

      leafFrontImg.src = MENU_PAGES[toP - 1];
      leafBackImg.src = MENU_PAGES[fromP - 1];
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
   * Setup Robust Gesture Detection (TouchEvents for Phones + Pointer for Mouse)
   */
  function setupGestures() {
    const stage = document.getElementById('bookSpreadContainer');
    const bookSpread = document.getElementById('bookSpread');
    if (!stage || !bookSpread) return;

    // 1. DEDICATED TOUCH EVENT HANDLING FOR PHONES (iOS & Android)
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let touchDiffX = 0;
    let touchDiffY = 0;
    let isHorizontalSwipe = false;

    stage.addEventListener('touchstart', (e) => {
      if (isFlipping) return;
      if (e.touches.length !== 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
      touchDiffX = 0;
      touchDiffY = 0;
      isHorizontalSwipe = false;
      bookSpread.classList.add('is-dragging');
    }, { passive: true });

    stage.addEventListener('touchmove', (e) => {
      if (isFlipping || e.touches.length !== 1) return;
      touchDiffX = e.touches[0].clientX - touchStartX;
      touchDiffY = e.touches[0].clientY - touchStartY;

      if (!isHorizontalSwipe && (Math.abs(touchDiffX) > 8 || Math.abs(touchDiffY) > 8)) {
        if (Math.abs(touchDiffX) > Math.abs(touchDiffY)) {
          isHorizontalSwipe = true;
        }
      }

      // If user is swiping horizontally on phone, prevent page from scrolling
      if (isHorizontalSwipe && e.cancelable) {
        e.preventDefault();
      }
    }, { passive: false });

    function handleTouchEnd() {
      bookSpread.classList.remove('is-dragging');
      if (isFlipping) return;

      const absX = Math.abs(touchDiffX);
      const absY = Math.abs(touchDiffY);

      // Trigger flip if moved horizontally at least 25px
      if (isHorizontalSwipe && absX >= 25 && absX > absY) {
        if (touchDiffX < 0) {
          menuBookNext(); // Swiped left
        } else {
          menuBookPrev(); // Swiped right
        }
      }

      touchDiffX = 0;
      touchDiffY = 0;
      isHorizontalSwipe = false;
    }

    stage.addEventListener('touchend', handleTouchEnd, { passive: true });
    stage.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    // 2. POINTER EVENTS FOR DESKTOP MOUSE DRAG
    let mouseStartX = 0;
    let isMouseDragging = false;
    let mouseDiffX = 0;

    stage.addEventListener('mousedown', (e) => {
      if (isFlipping || e.button !== 0) return;
      isMouseDragging = true;
      mouseStartX = e.clientX;
      mouseDiffX = 0;
      bookSpread.classList.add('is-dragging');
    });

    window.addEventListener('mousemove', (e) => {
      if (!isMouseDragging || isFlipping) return;
      mouseDiffX = e.clientX - mouseStartX;
    });

    window.addEventListener('mouseup', () => {
      if (!isMouseDragging) return;
      isMouseDragging = false;
      bookSpread.classList.remove('is-dragging');

      if (Math.abs(mouseDiffX) >= 30) {
        if (mouseDiffX < 0) menuBookNext();
        else menuBookPrev();
      }
      mouseDiffX = 0;
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
