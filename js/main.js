/* ==========================================================================
   ARENGUADE TILA - MAIN APPLICATION ROUTER & INITIALIZER
   ========================================================================== */

/**
 * Overlay View Identifiers
 */
const OVERLAY_VIEWS = ['view-rewards', 'view-reservations'];

/**
 * Closes all open full-screen overlay views
 */
function closeOverlays() {
  OVERLAY_VIEWS.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
}

/**
 * Mobile Navbar Toggle Controls
 */
function toggleMenu() { 
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.toggle('open'); 
}

function closeMenu() { 
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.remove('open'); 
}

/**
 * Triggers subtle minimalist page entrance animation
 * @param {HTMLElement} el View element to animate
 */
function triggerViewAnimation(el) {
  if (!el) return;
  el.classList.remove('view-entering');
  void el.offsetWidth; // Force reflow
  el.classList.add('view-entering');
  setTimeout(() => el.classList.remove('view-entering'), 460);
}

/**
 * Navigation Router
 * @param {string} viewId Target view ID
 */
function navigateTo(viewId) {
  const mainPage = document.getElementById('main-scroll-page');
  const fullMenuPage = document.getElementById('full-menu-page');
  const fullGalleryPage = document.getElementById('full-gallery-page');
  const siteFooter = document.querySelector('footer');

  if (!mainPage || !fullMenuPage || !fullGalleryPage) return;

  const setFooterVisible = (visible) => {
    if (siteFooter) siteFooter.style.display = visible ? '' : 'none';
  };

  // Handle overlay views (Rewards, Reservations)
  if (OVERLAY_VIEWS.includes(viewId)) {
    mainPage.style.display = 'block';
    fullMenuPage.style.display = 'none';
    fullGalleryPage.style.display = 'none';
    setFooterVisible(true);
    closeOverlays();
    
    const overlay = document.getElementById(viewId);
    if (overlay) {
      overlay.classList.add('active');
      overlay.scrollTop = 0;
      triggerViewAnimation(overlay);
    }
    closeMenu();
    return;
  }

  // Handle regular views
  closeOverlays();

  if (viewId === 'view-full-menu') {
    mainPage.style.display = 'none';
    fullMenuPage.style.display = 'block';
    fullGalleryPage.style.display = 'none';
    setFooterVisible(false);
    window.scrollTo(0, 0);
    triggerViewAnimation(fullMenuPage);
  } else if (viewId === 'view-gallery') {
    mainPage.style.display = 'none';
    fullMenuPage.style.display = 'none';
    fullGalleryPage.style.display = 'block';
    setFooterVisible(false);
    window.scrollTo(0, 0);
    triggerViewAnimation(fullGalleryPage);
  } else {
    mainPage.style.display = 'block';
    fullMenuPage.style.display = 'none';
    fullGalleryPage.style.display = 'none';
    setFooterVisible(true);

    const el = document.getElementById(viewId);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      triggerViewAnimation(el);
    } else {
      triggerViewAnimation(mainPage);
    }
  }
  closeMenu();
}

/**
 * Navbar scroll observer setup
 */
function initNavbarScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

let scrollObserver = null;

/**
 * Intersection Observer for scroll animations with responsive margin
 */
function initScrollAnimations() {
  if (!scrollObserver) {
    scrollObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '40px 0px 40px 0px' });
  }

  document.querySelectorAll('.reveal:not(.active)').forEach(el => scrollObserver.observe(el));
}

/**
 * Optimize hero video for fast loading and instant playback
 */
function optimizeHeroVideo() {
  const video = document.querySelector('.hero-video');
  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      video.addEventListener('canplay', () => video.play().catch(() => {}), { once: true });
    });
  }

  // Pause when offscreen to conserve GPU/CPU, resume when visible
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(video);
  }
}

/**
 * Application Entry Point Initialization
 */
document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initDatePicker();
  initReservationForm();
  
  renderFeaturedMenu();
  renderFullMenu();
  renderEventsList();
  initializeGallery();
  optimizeHeroVideo();
  
  drawWheel();
  initScrollAnimations();
});
