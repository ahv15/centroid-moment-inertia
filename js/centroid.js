/**
 * Centroid calculation functions for Project_centroid
 * Core mathematical functions for centroid computation
 */

// Global variables for centroid calculations
let originX = 300;
let originY = 200;
let referenceX = 300;
let referenceY = 200;

// Shape data storage
let shapes = {
  rectangles: [],
  circles: [],
  triangles: [],
  polygons: [],
  arcs: []
};

/**
 * Set the origin point for calculations
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 */
function setOrigin(x, y) {
  originX = x;
  originY = y;
}

/**
 * Set the reference axis point
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 */
function setReferenceAxis(x, y) {
  referenceX = originX + x;
  referenceY = originY - y;
}

/**
 * Calculate area of a triangle using coordinates
 * @param {number} x1 - First vertex X
 * @param {number} y1 - First vertex Y
 * @param {number} x2 - Second vertex X
 * @param {number} y2 - Second vertex Y
 * @param {number} x3 - Third vertex X
 * @param {number} y3 - Third vertex Y
 * @returns {number} Triangle area
 */
function calculateTriangleArea(x1, y1, x2, y2, x3, y3) {
  const area = ((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
  return Math.abs(area);
}

/**
 * Calculate area of polygon using shoelace formula
 * @param {Array} xCoords - Array of X coordinates
 * @param {Array} yCoords - Array of Y coordinates
 * @param {number} numPoints - Number of vertices
 * @returns {number} Polygon area
 */
function calculatePolygonArea(xCoords, yCoords, numPoints) {
  let area = 0;
  let j = numPoints - 1;
  for (let i = 0; i < numPoints; i++) {
    area = area + (xCoords[j] + xCoords[i]) * (yCoords[j] - yCoords[i]);
    j = i;
  }
  return Math.abs(area / 2);
}

/**
 * Add a rectangle to the calculation
 * @param {Object} rect - Rectangle data {x, y, length, width, isSubtraction}
 */
function addRectangle(rect) {
  const area = rect.length * rect.width;
  const centerX = rect.x + originX + (rect.length / 2);
  const centerY = originY - rect.y - (rect.width / 2);
  
  shapes.rectangles.push({
    area: Math.abs(area),
    centerX: centerX,
    centerY: centerY,
    isSubtraction: rect.isSubtraction || false
  });
}

/**
 * Add a circle to the calculation
 * @param {Object} circle - Circle data {x, y, radius, isSubtraction}
 */
function addCircle(circle) {
  const area = Math.PI * circle.radius * circle.radius;
  const centerX = circle.x + originX;
  const centerY = originY - circle.y;
  
  shapes.circles.push({
    area: Math.abs(area),
    centerX: centerX,
    centerY: centerY,
    isSubtraction: circle.isSubtraction || false
  });
}

/**
 * Add a triangle to the calculation
 * @param {Object} triangle - Triangle data {x1, y1, x2, y2, x3, y3, isSubtraction}
 */
function addTriangle(triangle) {
  const area = calculateTriangleArea(
    triangle.x1, triangle.y1,
    triangle.x2, triangle.y2,
    triangle.x3, triangle.y3
  );
  
  const centerX = (triangle.x1 + originX + triangle.x2 + originX + triangle.x3 + originX) / 3;
  const centerY = (originY - triangle.y1 + originY - triangle.y2 + originY - triangle.y3) / 3;
  
  shapes.triangles.push({
    area: area,
    centerX: centerX,
    centerY: centerY,
    isSubtraction: triangle.isSubtraction || false
  });
}

/**
 * Add a semi-circle (arc) to the calculation
 * @param {Object} arc - Arc data {x, y, radius, isSubtraction}
 */
function addArc(arc) {
  const area = (Math.PI * arc.radius * arc.radius) / 2;
  const centerX = (arc.x + originX) / 2;
  const centerY = (originY - arc.y - 4 * arc.radius / (3 * Math.PI)) / 2;
  
  shapes.arcs.push({
    area: area,
    centerX: centerX,
    centerY: centerY,
    isSubtraction: arc.isSubtraction || false
  });
}

/**
 * Calculate the final centroid of all shapes
 * @returns {Object} Centroid coordinates and total area
 */
function calculateCentroid() {
  let totalWeightedX = 0;
  let totalWeightedY = 0;
  let totalArea = 0;
  
  // Process all shape types
  const allShapes = [
    ...shapes.rectangles,
    ...shapes.circles,
    ...shapes.triangles,
    ...shapes.arcs
  ];
  
  allShapes.forEach(shape => {
    const factor = shape.isSubtraction ? -1 : 1;
    totalWeightedX += factor * shape.area * shape.centerX;
    totalWeightedY += factor * shape.area * shape.centerY;
    totalArea += factor * shape.area;
  });
  
  if (totalArea === 0) {
    return { x: 0, y: 0, area: 0, valid: false };
  }
  
  const centroidX = totalWeightedX / totalArea;
  const centroidY = totalWeightedY / totalArea;
  
  return {
    x: centroidX - originX,
    y: -(centroidY - originY),
    area: totalArea,
    valid: true
  };
}

/**
 * Clear all shape data
 */
function clearShapes() {
  shapes.rectangles = [];
  shapes.circles = [];
  shapes.triangles = [];
  shapes.polygons = [];
  shapes.arcs = [];
}
