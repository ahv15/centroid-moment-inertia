/**
 * Application initialization and configuration
 * Entry point for the refactored Project_centroid application
 */

// Global configuration
const APP_CONFIG = {
  defaultOriginX: 300,
  defaultOriginY: 200,
  canvasWidth: 700,
  canvasHeight: 500
};

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeUI();
  
  // Set default origin
  setOrigin(APP_CONFIG.defaultOriginX, APP_CONFIG.defaultOriginY);
  
  console.log('Project_centroid application initialized successfully');
});

// Export for global access if needed
window.PROJECT_CENTROID = {
  version: '2.0.0',
  config: APP_CONFIG
};
