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
let pointRadius = 2;
let lineWidth = 5;

// Draw boid
function drawBoid(x, y, dir) {
    // ctx.beginPath();
    // ctx.arc(x, y, 2, 0, Math.PI*2);
    // ctx.fill();
    // ctx.closePath();
    
    let r1 = 15;
    let r2 = 5;
    let r3 = 7;
    ctx.moveTo(x - r2 * Math.cos(dir) + r3 * Math.cos(dir + 90), y + r2 * Math.sin(dir) + r3 * Math.sin(dir + 90));
    ctx.lineTo(x - r2 * Math.cos(dir) + r3 * Math.cos(dir - 90), y + r2 * Math.sin(dir) + r3 * Math.sin(dir - 90));

    ctx.lineTo(x + r1 * Math.cos(dir), y + r1 * Math.sin(dir));
    ctx.lineTo(x - r2 * Math.cos(dir) + r3* Math.cos(dir + 90), y + r2 * Math.sin(dir) + r3 * Math.sin(dir + 90));
    ctx.fill();

}

function updateBoid(boid) {


    boid.dx = speed * Math.sin(time);
    boid.dy = speed * Math.cos(time);

}


drawBoid(100, 100, 0);





