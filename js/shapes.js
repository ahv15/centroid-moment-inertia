/**
 * Shape drawing functions for Project_centroid
 * Functions to draw various geometric shapes on canvas
 */

/**
 * Draw a rectangle on canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} length - Rectangle length
 * @param {number} width - Rectangle width
 * @param {string} color - Fill color (default: 'blue')
 */
function drawRectangle(ctx, x, y, length, width, color = "blue") {
  ctx.beginPath();
  ctx.rect(x, y, length, width);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

/**
 * Draw a circle on canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Center X coordinate
 * @param {number} y - Center Y coordinate
 * @param {number} radius - Circle radius
 * @param {string} color - Fill color (default: '#FF0000')
 */
function drawCircle(ctx, x, y, radius, color = "#FF0000") {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

/**
 * Draw a triangle on canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x1 - First vertex X coordinate
 * @param {number} y1 - First vertex Y coordinate
 * @param {number} x2 - Second vertex X coordinate
 * @param {number} y2 - Second vertex Y coordinate
 * @param {number} x3 - Third vertex X coordinate
 * @param {number} y3 - Third vertex Y coordinate
 * @param {string} color - Fill color (default: '#FFCC00')
 */
function drawTriangle(ctx, x1, y1, x2, y2, x3, y3, color = "#FFCC00") {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.lineTo(x1, y1);
  ctx.lineWidth = 3;
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

/**
 * Draw a semi-circle (arc) on canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} x - Center X coordinate
 * @param {number} y - Center Y coordinate
 * @param {number} radius - Arc radius
 * @param {string} color - Fill color (default: '#FF0000')
 */
function drawSemiCircle(ctx, x, y, radius, color = "#FF0000") {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, -Math.PI, true);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

/**
 * Draw a polygon on canvas from array of points
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Array} points - Array of [x, y] coordinates
 * @param {string} color - Fill color (default: 'blue')
 */
function drawPolygon(ctx, points, color = "blue") {
  if (points.length < 6) return; // Need at least 3 points (6 values)
  
  ctx.beginPath();
  ctx.moveTo(points[0], points[1]);
  for (let i = 2; i < points.length - 1; i += 2) {
    ctx.lineTo(points[i], points[i + 1]);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}