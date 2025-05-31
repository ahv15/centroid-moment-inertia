/**
 * UI interaction functions for Project_centroid
 * Handles form interactions, shape creation, and UI updates
 */

// Canvas context
let canvas;
let ctx;

/**
 * Initialize the canvas and UI
 */
function initializeUI() {
  canvas = document.getElementById(\"myCanvas\");
  ctx = canvas.getContext(\"2d\");
  
  // Hide all forms initially
  const formIds = [
    \"Square1\", \"Circle1\", \"Triangle1\", \"Polygon1\", \"Arc\",
    \"Square2\", \"Circle2\", \"Triangle2\", \"Polygon2\", \"Arc1\"
  ];
  hideElements(formIds);
}

/**
 * Handle origin form submission
 * @param {HTMLFormElement} form - The origin form
 */
function handleOriginForm(form) {
  const x = parseFormValue(form.oX);
  const y = parseFormValue(form.oY);
  setOrigin(x, y);
}

/**
 * Handle reference axis form submission
 * @param {HTMLFormElement} form - The axis form
 */
function handleAxisForm(form) {
  const x = parseFormValue(form.ox);
  const y = parseFormValue(form.oy);
  setReferenceAxis(x, y);
}

/**
 * Show rectangle form for shape creation
 * @param {number} mode - 1 for creation, other values for other modes
 */
function showRectangleForm(mode) {
  if (mode === 1) {
    const hideIds = [\"Polygon1\", \"Arc\", \"Circle1\", \"Triangle1\"];
    hideElements(hideIds);
    showElement(\"Square1\");
  }
}

/**
 * Show circle form for shape creation
 * @param {number} mode - 1 for creation, other values for other modes
 */
function showCircleForm(mode) {
  if (mode === 1) {
    const hideIds = [\"Polygon1\", \"Arc\", \"Square1\", \"Triangle1\"];
    hideElements(hideIds);
    showElement(\"Circle1\");
  }
}

/**
 * Show triangle form for shape creation
 * @param {number} mode - 1 for creation, other values for other modes
 */
function showTriangleForm(mode) {
  if (mode === 1) {
    const hideIds = [\"Polygon1\", \"Arc\", \"Square1\", \"Circle1\"];
    hideElements(hideIds);
    showElement(\"Triangle1\");
  }
}

/**
 * Show polygon form for shape creation
 * @param {number} mode - 1 for creation, other values for other modes
 */
function showPolygonForm(mode) {
  if (mode === 1) {
    const hideIds = [\"Triangle1\", \"Arc\", \"Square1\", \"Circle1\"];
    hideElements(hideIds);
    showElement(\"Polygon1\");
  }
}

/**
 * Show semi-circle form for shape creation
 * @param {number} mode - 1 for creation, other values for other modes
 */
function showSemiCircleForm(mode) {
  if (mode === 1) {
    const hideIds = [\"Triangle1\", \"Polygon1\", \"Square1\", \"Circle1\"];
    hideElements(hideIds);
    showElement(\"Arc\");
  }
}

/**
 * Show cutout rectangle form
 * @param {number} mode - 1 for creation, other values for other modes
 */
function showCutoutRectangleForm(mode) {
  if (mode === 1) {
    const hideIds = [\"Circle2\", \"Triangle2\", \"Polygon2\", \"Arc1\"];
    hideElements(hideIds);
    showElement(\"Square2\");
  }
}

/**
 * Show cutout circle form
 * @param {number} mode - 1 for creation, other values for other modes
 */
function showCutoutCircleForm(mode) {
  if (mode === 1) {
    const hideIds = [\"Square2\", \"Triangle2\", \"Polygon2\", \"Arc1\"];
    hideElements(hideIds);
    showElement(\"Circle2\");
  }
}

/**
 * Show cutout triangle form
 * @param {number} mode - 1 for creation, other values for other modes
 */
function showCutoutTriangleForm(mode) {
  if (mode === 1) {
    const hideIds = [\"Square2\", \"Circle2\", \"Polygon2\", \"Arc1\"];
    hideElements(hideIds);
    showElement(\"Triangle2\");
  }
}

/**
 * Show cutout polygon form
 * @param {number} mode - 1 for creation, other values for other modes
 */
function showCutoutPolygonForm(mode) {
  if (mode === 1) {
    const hideIds = [\"Square2\", \"Circle2\", \"Triangle2\", \"Arc1\"];
    hideElements(hideIds);
    showElement(\"Polygon2\");
  }
}

/**
 * Show cutout semi-circle form
 * @param {number} mode - 1 for creation, other values for other modes
 */
function showCutoutSemiCircleForm(mode) {
  if (mode === 1) {
    const hideIds = [\"Square2\", \"Circle2\", \"Triangle2\", \"Polygon2\"];
    hideElements(hideIds);
    showElement(\"Arc1\");
  }
}

/**
 * Create a rectangle shape
 * @param {HTMLFormElement} form - The rectangle form
 * @param {boolean} isSubtraction - Whether this is a cutout
 */
function createRectangle(form, isSubtraction = false) {
  const x = parseFormValue(form.sx);
  const y = parseFormValue(form.sy);
  const length = parseFormValue(form.length3);
  const width = parseFormValue(form.width3);
  
  const color = isSubtraction ? \"white\" : \"blue\";
  drawRectangle(ctx, x + originX, originY - y, length, -width, color);
  drawAxisLines(ctx, originX, originY);
  
  addRectangle({ x, y, length, width, isSubtraction });
}

/**
 * Create a circle shape
 * @param {HTMLFormElement} form - The circle form
 * @param {boolean} isSubtraction - Whether this is a cutout
 */
function createCircle(form, isSubtraction = false) {
  const x = parseFormValue(form.cx);
  const y = parseFormValue(form.cy);
  const radius = parseFormValue(form.radius);
  
  const color = isSubtraction ? \"white\" : \"#FF0000\";
  drawCircle(ctx, x + originX, originY - y, radius, color);
  drawAxisLines(ctx, originX, originY);
  
  addCircle({ x, y, radius, isSubtraction });
}

/**
 * Create a triangle shape
 * @param {HTMLFormElement} form - The triangle form
 * @param {boolean} isSubtraction - Whether this is a cutout
 */
function createTriangle(form, isSubtraction = false) {
  const x1 = parseFormValue(form.X1);
  const y1 = parseFormValue(form.Y1);
  const x2 = parseFormValue(form.X2);
  const y2 = parseFormValue(form.Y2);
  const x3 = parseFormValue(form.X3);
  const y3 = parseFormValue(form.Y3);
  
  const color = isSubtraction ? \"white\" : \"#FFCC00\";
  drawTriangle(ctx, 
    x1 + originX, originY - y1,
    x2 + originX, originY - y2,
    x3 + originX, originY - y3,
    color
  );
  drawAxisLines(ctx, originX, originY);
  
  addTriangle({ x1, y1, x2, y2, x3, y3, isSubtraction });
}

/**
 * Create a semi-circle shape
 * @param {HTMLFormElement} form - The arc form
 * @param {boolean} isSubtraction - Whether this is a cutout
 */
function createSemiCircle(form, isSubtraction = false) {
  const x = parseFormValue(form.arcx);
  const y = parseFormValue(form.arcy);
  const radius = parseFormValue(form.radius);
  
  const color = isSubtraction ? \"white\" : \"#FF0000\";
  drawSemiCircle(ctx, x + originX, originY - y, radius, color);
  drawAxisLines(ctx, originX, originY);
  
  addArc({ x, y, radius, isSubtraction });
}

/**
 * Display the final centroid calculation result
 */
function displayCentroidResult() {
  const result = calculateCentroid();
  
  if (result.valid) {
    // Draw centroid point
    drawCircle(ctx, result.x + originX, originY - result.y, 2, \"black\");
    alert(`The centroid is at (${result.x.toFixed(2)}, ${result.y.toFixed(2)})`);
  } else {
    alert(\"Unable to calculate centroid. Please add some shapes first.\");
  }
}

/**
 * Display the moment of inertia calculation result
 */
function displayInertiaResult() {
  const result = calculateTotalInertia(referenceX, referenceY);
  alert(`Moment of inertia about x and y axes respectively are ${result.ixx.toFixed(2)} and ${result.iyy.toFixed(2)}`);
}

// Polygon handling variables
let polygonPoints = [];
let polygonVertexCount = 0;

/**
 * Add a vertex to the current polygon
 * @param {HTMLFormElement} form - The polygon form
 */
function addPolygonVertex(form) {
  const x = parseFormValue(form.px) + originX;
  const y = originY - parseFormValue(form.py);
  
  polygonPoints.push(x, y);
  polygonVertexCount++;
}

/**
 * Create polygon from collected vertices
 * @param {HTMLFormElement} form - The polygon form
 * @param {boolean} isSubtraction - Whether this is a cutout
 */
function createPolygon(form, isSubtraction = false) {
  if (polygonPoints.length < 6) return; // Need at least 3 vertices
  
  const color = isSubtraction ? \"white\" : \"blue\";
  drawPolygon(ctx, polygonPoints, color);
  drawAxisLines(ctx, originX, originY);
  
  // Reset for next polygon
  polygonPoints = [];
  polygonVertexCount = 0;
}

// Alias functions to maintain compatibility with original code
const abc = showRectangleForm;
const abd = showCircleForm;
const abe = showTriangleForm;
const abg = showPolygonForm;
const abf = showSemiCircleForm;

const cabc = showCutoutRectangleForm;
const cabd = showCutoutCircleForm;
const cabe = showCutoutTriangleForm;
const cabg = showCutoutPolygonForm;
const cabf = showCutoutSemiCircleForm;

const cSquare = (form) => createRectangle(form, false);
const cCircle = (form) => createCircle(form, false);
const cTriangle = (form) => createTriangle(form, false);
const arc = (form) => createSemiCircle(form, false);

const cuSquare = (form) => createRectangle(form, true);
const cuCircle = (form) => createCircle(form, true);
const cuTriangle = (form) => createTriangle(form, true);
const carc = (form) => createSemiCircle(form, true);

const aPolygon = addPolygonVertex;
const cPolygon = (form) => createPolygon(form, false);
const clPolygon = (form) => createPolygon(form, true);

const oRigin = handleOriginForm;
const axis = handleAxisForm;
const centroid = displayCentroidResult;
