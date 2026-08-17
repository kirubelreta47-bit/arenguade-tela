/* ==========================================================================
   ARENGUADE TILA - API CONFIGURATION & ENVIRONMENT UTILITIES
   ========================================================================== */

/**
 * Default production backend URL endpoint
 */
const DEFAULT_PROD_API_URL = 'https://backend-api-1-qhnn.onrender.com';

/**
 * Resolves the dynamic backend API base URL based on the current hostname environment.
 * Local Vite uses same-origin `/api` (proxied to :3001). Production uses Render.
 * @returns {string} Fully qualified backend base URL (or empty string for same-origin)
 */
function getApiBaseUrl() {
  const hostname = window.location.hostname;
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.') || hostname.startsWith('10.');

  if (window.VITE_API_URL) {
    return window.VITE_API_URL.replace(/\/$/, '');
  }

  if (isLocal) {
    // Prefer Vite proxy (/api → localhost:3001) to avoid CORS in local dev.
    // If the proxy backend is down, callers can fall back to the production API.
    return '';
  }

  return DEFAULT_PROD_API_URL;
}

/**
 * Builds a reservation API URL, with optional production fallback for local outages.
 * @param {boolean} useProdFallback
 * @returns {string}
 */
function getReservationUrl(useProdFallback = false) {
  if (useProdFallback) {
    return `${DEFAULT_PROD_API_URL}/api/reservation`;
  }
  const base = getApiBaseUrl();
  return `${base}/api/reservation`;
}
