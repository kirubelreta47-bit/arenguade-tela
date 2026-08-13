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
 * Navigation Router
 * @param {string} viewId Target view ID
 */
function navigateTo(viewId) {
  const mainPage = document.getElementById('main-scroll-page');
  const fullMenuPage = document.getElementById('full-menu-page');
  const fullGalleryPage = document.getElementById('full-gallery-page');

  if (!mainPage || !fullMenuPage || !fullGalleryPage) return;

  // Handle overlay views (Rewards, Reservations)
  if (OVERLAY_VIEWS.includes(viewId)) {
    mainPage.style.display = 'block';
    fullMenuPage.style.display = 'none';
    fullGalleryPage.style.display = 'none';
    closeOverlays();
    
    const overlay = document.getElementById(viewId);
    if (overlay) {
      overlay.classList.add('active');
      overlay.scrollTop = 0;
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
    window.scrollTo(0, 0);
  } else if (viewId === 'view-gallery') {
    mainPage.style.display = 'none';
    fullMenuPage.style.display = 'none';
    fullGalleryPage.style.display = 'block';
    window.scrollTo(0, 0);
  } else {
    mainPage.style.display = 'block';
    fullMenuPage.style.display = 'none';
    fullGalleryPage.style.display = 'none';

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

/**
 * Intersection Observer for scroll animations
 */
function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/**
 * Optimize hero video for fast loading
 */
function optimizeHeroVideo() {
  const video = document.querySelector('.hero-video');
  if (!video) return;

  // Ensure video plays immediately when loaded
  video.addEventListener('loadedmetadata', () => {
    video.play().catch(err => {
      console.log('Video autoplay prevented:', err);
      // Fallback if autoplay is blocked
    });
  });

  // Handle cases where video is already loaded
  if (video.readyState >= 1) {
    video.play().catch(err => {
      console.log('Video autoplay prevented:', err);
    });
  }

  // Set up intersection observer for video performance
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play().catch(err => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.25 });
    
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
