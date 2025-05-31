/**
 * Utility functions for Project_centroid
 * Common helper functions used across the application
 */

/**
 * Hide all form elements by setting display to 'none'
 * @param {Array} elementIds - Array of element IDs to hide
 */
function hideElements(elementIds) {
  elementIds.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = "none";
    }
  });
}

/**
 * Show a specific element by setting display to 'block'
 * @param {string} elementId - ID of element to show
 */
function showElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.display = "block";
  }
}

/**
 * Parse form values to float with error handling
 * @param {HTMLInputElement} input - Input element to parse
 * @returns {number} Parsed float value
 */
function parseFormValue(input) {
  return parseFloat(input.value) || 0;
}

/**
 * Draw axis lines on canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} ox - Origin X coordinate
 * @param {number} oy - Origin Y coordinate
 */
function drawAxisLines(ctx, ox, oy) {
  // Vertical axis line
  ctx.beginPath();
  ctx.rect(ox, 0, 0.5, 500);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
  
  // Horizontal axis line
  ctx.beginPath();
  ctx.rect(0, oy, 700, 0.5);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}