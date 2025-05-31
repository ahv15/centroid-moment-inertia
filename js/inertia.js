/**
 * Moment of inertia calculation functions for Project_centroid
 * Functions for calculating moment of inertia about specified axes
 */

// Global variables for moment of inertia calculations
let inertiaShapes = {
  rectangles: [],
  circles: [],
  triangles: [],
  arcs: []
};

/**
 * Calculate moment of inertia for a rectangle
 * @param {Object} rect - Rectangle data {length, width, centerX, centerY, area}
 * @param {number} axisX - Reference axis X coordinate
 * @param {number} axisY - Reference axis Y coordinate
 * @returns {Object} Moment of inertia about X and Y axes
 */
function calculateRectangleInertia(rect, axisX, axisY) {
  const dx = (rect.area) * ((rect.centerX) - (axisX)) * ((rect.centerX) - (axisX));
  const dy = (rect.area) * ((rect.centerY) - (axisY)) * ((rect.centerY) - (axisY));
  
  const ixx = ((rect.length) * (rect.width) * (rect.width) * (rect.width)) / 12 + dy;
  const iyy = ((rect.length) * (rect.width) * (rect.length) * (rect.length)) / 12 + dx;
  
  return {
    ixx: Math.abs(ixx),
    iyy: Math.abs(iyy)
  };
}

/**
 * Calculate moment of inertia for a circle
 * @param {Object} circle - Circle data {radius, centerX, centerY, area}
 * @param {number} axisX - Reference axis X coordinate
 * @param {number} axisY - Reference axis Y coordinate
 * @returns {Object} Moment of inertia about X and Y axes
 */
function calculateCircleInertia(circle, axisX, axisY) {
  const dx = (circle.area) * ((circle.centerX) - (axisX)) * ((circle.centerX) - (axisX));
  const dy = (circle.area) * ((circle.centerY) - (axisY)) * ((circle.centerY) - (axisY));
  
  const baseInertia = (Math.PI) * (circle.radius) * (circle.radius) * (circle.radius) * (circle.radius) / 4;
  
  const ixx = baseInertia + dy;
  const iyy = baseInertia + dx;
  
  return {
    ixx: Math.abs(ixx),
    iyy: Math.abs(iyy)
  };
}

/**
 * Calculate moment of inertia for a triangle
 * @param {Object} triangle - Triangle data {base, height, centerX, centerY, area}
 * @param {number} axisX - Reference axis X coordinate
 * @param {number} axisY - Reference axis Y coordinate
 * @returns {Object} Moment of inertia about X and Y axes
 */
function calculateTriangleInertia(triangle, axisX, axisY) {
  const dx = (triangle.area) * ((triangle.centerX) - (axisX)) * ((triangle.centerX) - (axisX));
  const dy = (triangle.area) * ((triangle.centerY) - (axisY)) * ((triangle.centerY) - (axisY));
  
  // Approximate using base and height
  const baseInertia = triangle.base * triangle.height * triangle.height * triangle.height / 36;
  
  const ixx = baseInertia + dy;
  const iyy = triangle.base * triangle.height * triangle.height * triangle.height / 12 + dx;
  
  return {
    ixx: Math.abs(ixx),
    iyy: Math.abs(iyy)
  };
}

/**
 * Calculate moment of inertia for a semi-circle
 * @param {Object} arc - Arc data {radius, centerX, centerY, area}
 * @param {number} axisX - Reference axis X coordinate
 * @param {number} axisY - Reference axis Y coordinate
 * @returns {Object} Moment of inertia about X and Y axes
 */
function calculateArcInertia(arc, axisX, axisY) {
  const dx = (arc.area) * ((arc.centerX) - (axisX)) * ((arc.centerX) - (axisX));
  const dy = (arc.area) * ((arc.centerY) - (axisY)) * ((arc.centerY) - (axisY));
  
  const baseInertiaX = (Math.PI) * (arc.radius) * (arc.radius) * (arc.radius) * (arc.radius) / 8 - 
                      (arc.radius) * (arc.radius) * (arc.radius) * (arc.radius) * 8 / (9 * (Math.PI));
  const baseInertiaY = (Math.PI) * (arc.radius) * (arc.radius) * (arc.radius) * (arc.radius) / 8;
  
  const ixx = baseInertiaX + dy;
  const iyy = baseInertiaY + dx;
  
  return {
    ixx: Math.abs(ixx),
    iyy: Math.abs(iyy)
  };
}

/**
 * Add a rectangle for inertia calculation
 * @param {Object} rect - Rectangle data
 * @param {boolean} isSubtraction - Whether this is a cutout
 */
function addRectangleInertia(rect, isSubtraction = false) {
  inertiaShapes.rectangles.push({
    ...rect,
    isSubtraction: isSubtraction
  });
}

/**
 * Add a circle for inertia calculation
 * @param {Object} circle - Circle data
 * @param {boolean} isSubtraction - Whether this is a cutout
 */
function addCircleInertia(circle, isSubtraction = false) {
  inertiaShapes.circles.push({
    ...circle,
    isSubtraction: isSubtraction
  });
}

/**
 * Add a triangle for inertia calculation
 * @param {Object} triangle - Triangle data
 * @param {boolean} isSubtraction - Whether this is a cutout
 */
function addTriangleInertia(triangle, isSubtraction = false) {
  inertiaShapes.triangles.push({
    ...triangle,
    isSubtraction: isSubtraction
  });
}

/**
 * Add an arc for inertia calculation
 * @param {Object} arc - Arc data
 * @param {boolean} isSubtraction - Whether this is a cutout
 */
function addArcInertia(arc, isSubtraction = false) {
  inertiaShapes.arcs.push({
    ...arc,
    isSubtraction: isSubtraction
  });
}

/**
 * Calculate total moment of inertia for all shapes
 * @param {number} axisX - Reference axis X coordinate
 * @param {number} axisY - Reference axis Y coordinate
 * @returns {Object} Total moment of inertia about X and Y axes
 */
function calculateTotalInertia(axisX, axisY) {
  let totalIxx = 0;
  let totalIyy = 0;
  
  // Calculate for rectangles
  inertiaShapes.rectangles.forEach(rect => {
    const inertia = calculateRectangleInertia(rect, axisX, axisY);
    const factor = rect.isSubtraction ? -1 : 1;
    totalIxx += factor * inertia.ixx;
    totalIyy += factor * inertia.iyy;
  });
  
  // Calculate for circles
  inertiaShapes.circles.forEach(circle => {
    const inertia = calculateCircleInertia(circle, axisX, axisY);
    const factor = circle.isSubtraction ? -1 : 1;
    totalIxx += factor * inertia.ixx;
    totalIyy += factor * inertia.iyy;
  });
  
  // Calculate for triangles
  inertiaShapes.triangles.forEach(triangle => {
    const inertia = calculateTriangleInertia(triangle, axisX, axisY);
    const factor = triangle.isSubtraction ? -1 : 1;
    totalIxx += factor * inertia.ixx;
    totalIyy += factor * inertia.iyy;
  });
  
  // Calculate for arcs
  inertiaShapes.arcs.forEach(arc => {
    const inertia = calculateArcInertia(arc, axisX, axisY);
    const factor = arc.isSubtraction ? -1 : 1;
    totalIxx += factor * inertia.ixx;
    totalIyy += factor * inertia.iyy;
  });
  
  return {
    ixx: Math.abs(totalIxx),
    iyy: Math.abs(totalIyy)
  };
}

/**
 * Clear all inertia shape data
 */
function clearInertiaShapes() {
  inertiaShapes.rectangles = [];
  inertiaShapes.circles = [];
  inertiaShapes.triangles = [];
  inertiaShapes.arcs = [];
}
