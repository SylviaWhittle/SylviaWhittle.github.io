// Draw rounded rectangle function for backgrounds
function roundedRect(x1, y1, x2, y2, cornerSize, colour)
{
  ctx.fillStyle = colour;
  ctx.strokeStyle = colour;
  ctx.beginPath();
  ctx.moveTo(x1 + cornerSize, y1);
  ctx.lineTo(x2 - cornerSize, y1);
  ctx.quadraticCurveTo(x2, y1, x2, y1 + cornerSize);
  ctx.lineTo(x2, y2 - cornerSize);
  ctx.quadraticCurveTo(x2, y2, x2 - cornerSize, y2);
  ctx.lineTo(x1 + cornerSize, y2);
  ctx.quadraticCurveTo(x1, y2, x1, y2 - cornerSize);
  ctx.lineTo(x1, y1 + cornerSize);
  ctx.quadraticCurveTo(x1, y1, x1 + cornerSize, y1);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

// Start of JS file
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;
ctx.font = "26px Courier New";
ctx.textAlign = "left";
let fontHeight = 30;

let lineColour = 'rgba(50, 50, 50, 0.6)';
let backgroundColor = 'rgba(213, 170, 6, 0.2)';
let pointRadius = 5;
let lineWidth = 5;

let axesHeight = height/1.5;
let axesWidth = width/1.1;

let axesPosx = width/2 - axesWidth/2;
let axesPosy = height/2 - axesHeight/2;

let axesStartx = axesPosx;
let axesStarty = axesPosy + axesHeight;
let axesEndx = axesPosx + axesWidth;
let axesEndy = axesPosy;

// Draw axes
ctx.strokeStyle = lineColour;
ctx.lineWidth = lineWidth;
ctx.beginPath();
ctx.moveTo(axesStartx, axesStarty);
ctx.lineTo(axesEndx, axesStarty);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(axesStartx, axesStarty);
ctx.lineTo(axesStartx, axesEndy);
ctx.stroke();

//roundedRect(0, 0, width, height, 20, backgroundColor);

function drawPoint(point) {
    ctx.fillStyle = lineColour;
    ctx.beginPath();
    ctx.arc(point.x, point.y, pointRadius, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
}


points = [];

xStart = 0;
xEnd = 2*Math.PI;
xRange = xEnd - xStart;

for(var i = xStart; i<xEnd ; i+=0.1) {
    points.push({x : axesStartx + i/xRange * axesWidth, y : axesStarty + Math.sin(i)*axesHeight/2 - axesHeight/2})
}

// Plot points
for (var i = 0; i<points.length; i++) {
    drawPoint(points[i]);
}




