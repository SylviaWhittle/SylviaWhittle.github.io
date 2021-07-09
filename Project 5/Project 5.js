function RandomRange(min, max) {
    return (Math.random() * (max - min) ) + min;
  }

// Start of JS file ===================================================================================== //
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;
ctx.font = "26px Courier New";
ctx.textAlign = "left";
let fontHeight = 30;

let backgroundColor = 'rgba(213, 170, 6, 0.2)';

document.body.style.backgroundColor = backgroundColor;
ctx.lineWidth = 2;

window.addEventListener("resize", resize);

function resize() {
    //ctx.canvas.width = window.innerWidth;
    //ctx.canvas.height = window.innerHeight;
    location.reload();
  }

let pointRadius = 3;

// Point 1
let p1x = RandomRange(0, width);
let p1y = RandomRange(0, height);

ctx.beginPath();
ctx.arc(p1x, p1y, pointRadius, 0, 2*Math.PI);
ctx.stroke();

// Point 2
let p2x = RandomRange(0, width);
let p2y = RandomRange(0, height);

ctx.beginPath();
ctx.arc(p2x, p2y, pointRadius, 0, 2*Math.PI);
ctx.stroke();

// Point 3
let p3x = RandomRange(0, width);
let p3y = RandomRange(0, height);

ctx.beginPath();
ctx.arc(p3x, p3y, pointRadius, 0, 2*Math.PI);
ctx.stroke();

// Line between
function LineBetween(p1x, p1y, p2x, p2y) {
    lgrad = (p1y - p2y)/(p1x - p2x);
    lconst = p1y - lgrad * p1x;

    ctx.beginPath();
    ctx.moveTo(p1x,p1y);
    ctx.lineTo(p1x + (p2x - p1x), lgrad * (p1x + p2x - p1x) + lconst);
    ctx.stroke();

    // Centerpoint
    centerpointx = (p1x + p2x)/2;
    centerpointy = (p1y + p2y)/2;

    // Bisector line
    bisectgrad = -1/lgrad;
    bisectintercept = centerpointy - bisectgrad * centerpointx;

    bisectionLength = 50;

    modifiedBisectionLength = Math.cos(Math.atan(bisectgrad)) * bisectionLength;

    // Draw bisector
    ctx.beginPath();
    ctx.moveTo(centerpointx - modifiedBisectionLength, centerpointy - modifiedBisectionLength * bisectgrad);
    ctx.lineTo(centerpointx + modifiedBisectionLength, centerpointy + modifiedBisectionLength * bisectgrad);
    ctx.stroke();

    bisector = {grad : bisectgrad, intercept : bisectintercept};

    return bisector;
}

var bisect1 = LineBetween(p1x, p1y, p2x, p2y);
var bisect2 = LineBetween(p1x, p1y, p3x, p3y);
var bisect3 = LineBetween(p2x, p2y, p3x, p3y);

// Find intersection point between bisectors 1 and 2
intersectx = (bisect2.intercept - bisect1.intercept)/(bisect1.grad - bisect2.grad);
intersecty = bisect1.grad * intersectx + bisect1.intercept;


// Draw the intersection point (center of the circle)
ctx.beginPath();
ctx.arc(intersectx, intersecty, pointRadius, 0, 2 * Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.arc(intersectx, intersecty, pointRadius + 4, 0, 2*Math.PI);
ctx.stroke();

// Find radius of the circle
radius = Math.sqrt((intersectx - p1x)**2 + (intersecty - p1y)**2);

// Draw circle
ctx.beginPath();
ctx.arc(intersectx, intersecty, radius, 0, 2*Math.PI);
ctx.stroke();



