/* ==========================================================================
   ARENGUADE TILA - API CONFIGURATION & ENVIRONMENT UTILITIES
   ========================================================================== */

/**
 * Default production backend URL endpoint
 */
const DEFAULT_PROD_API_URL = 'https://backend-api-1-qhnn.onrender.com';

/**
 * Resolves the dynamic backend API base URL based on the current hostname environment.
 * @returns {string} Fully qualified backend base URL
 */
function getApiBaseUrl() {
  const hostname = window.location.hostname;
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
  
  if (isLocal) {
    return 'http://localhost:3001';
  }
  
  if (window.VITE_API_URL) {
    return window.VITE_API_URL.replace(/\/$/, '');
  }
  
  return DEFAULT_PROD_API_URL;
}
