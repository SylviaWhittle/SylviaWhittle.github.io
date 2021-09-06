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

let lineColour = 'rgba(50, 50, 50, 0.8)';
let backgroundColor = 'rgba(213, 170, 6, 0.2)';


//roundedRect(0, 0, width, height, 20, backgroundColor);


const MaximumIterations = 80;
// Create the colour array for the set
//const colours = new Array(16).fill(0).map((_, i) => i === 0 ? '#000' : `#${((1 << 24) * Math.random() | 0).toString(16)}`)
//console.log(colours)
// const colours = ["#000000", "#550000", "#660000", 
//                  "#770000", "#880000", "#990000", 
//                  "#aa0000", "#bb0000", "#cc0000", 
//                  "#dd0000", "#ee0000", "#ff0000", 
//                  "#ff5500", "#ffaa00", "#ffbb00", 
//                  "#ffcc00"]

const colours = ["rgba(1,0,0,1)", "rgba(1,0,0,1)", "rgba(1,0,0,0.02)",
                 "rgba(1,0,0,0.03)", "rgba(1,0,0,0.04)", "rgba(1,0,0,0.05)",
                 "rgba(1,0,0,0.06)"];

function mandelbrot(c) {

    // Construct the initial complex number
    let z = {x : 0, y : 0}, n = 0, p, d;

    do {
        p = {
            // Calcuate the REAL square component
            x : Math.pow(z.x, 2) - Math.pow(z.y, 2),
            // Calculate the IMAGINARY square component
            y : 2 * z.x * z.y
        };
        
        z = {
            // Update Z
            x : p.x + c.x,
            y : p.y + c.y,
        };
    
        // Calculate the modulus of the updated Z for this iteration
        d = Math.sqrt(Math.pow(z.x, 2) + Math.pow(z.y, 2));
        n += 1;
    
    } while (d <= 2 && n < MaximumIterations)
    
    // Return the number of iterations and whether it diverged or not
    return [n, d <=2 ];
}

const realSet = { start : -2, end : 1};
const imaginarySet = { start : -1.5, end : 1.5};

function drawPoints() {
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            currentValue = {
                x : realSet.start + (i/width) * (realSet.end - realSet.start),
                y : imaginarySet.start + (j/height) * (imaginarySet.end - imaginarySet.start)
            };

            // Get the number of iterations for the complex number and whether it is in the set
            const [iterations, isMandlebrotSet] = mandelbrot(currentValue);
            //console.log(isMandlebrotSet)
            
            if(isMandlebrotSet) {
                ctx.fillStyle = "rgba(0,0,0,0.5)" ;
            }
            else 
            { 
                if (iterations == 1 || iterations == 2 || iterations == 3) {
                    ctx.fillStyle = 'rgba(0,0,0,0)';
                }
                else {
                    var opacity = (2.5 * iterations/MaximumIterations).toString();
                    ctx.fillStyle = 'rgba(0,0,0,' + opacity + ')';
                }
            }
            ctx.fillRect(i, j , 1, 1);
        }
    }
}

drawPoints();



