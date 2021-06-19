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

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let width = (canvas.width = window.innerWidth/2);
let height = (canvas.height = window.innerHeight/3);

let startTime = 0.0;
let time = startTime;

let plotsCenterY = height/2;
let plotsCenterX = width/2;
let plotSize = width/4;
let plotSeparation = plotSize/4;
let shadowOffset = 5;
let plotBackgroundColour = '#2E2E2E';
let shadowColour = '#202020';

let x1_0 = 0.0;
let x2_0 = 0.0;

let theta = 0.0;
let oldtheta = theta;
//let dtheta = 0.0;
let omega = 1.0;
let oldomega = omega;
//let domega = 0.0;

let drivingFreq = 0.67;
let Q = 2.0;
let A = 1.15;

let length = plotSize/2.2;

let timestep = 0.05;

  // Draw Backgrounds of Phase Portrait and Poincare Section

  // Draw Phase Portrait Background
    // Shadow
  roundedRect(plotsCenterX - plotSize/2 + shadowOffset, plotsCenterY - plotSize/2 + shadowOffset, plotsCenterX + plotSize/2 + shadowOffset, plotsCenterY + plotSize/2 + shadowOffset, 10, shadowColour)
    // Background
  roundedRect(plotsCenterX - plotSize/2, plotsCenterY - plotSize/2, plotsCenterX + plotSize/2, plotsCenterY + plotSize/2, 10, plotBackgroundColour)

  // Draw Poincare Section Background
    // Shadow
  roundedRect(plotsCenterX + plotSize + plotSeparation - plotSize/2 + shadowOffset, plotsCenterY - plotSize/2 + shadowOffset, plotsCenterX + plotSize + plotSeparation + plotSize/2 + shadowOffset, plotsCenterY + plotSize/2 + shadowOffset, 10, shadowColour)
    // Background
  roundedRect(plotsCenterX + plotSize + plotSeparation - plotSize/2, plotsCenterY - plotSize/2, plotsCenterX + plotSize + plotSeparation + plotSize/2, plotsCenterY + plotSize/2, 10, plotBackgroundColour)

main();

// Main Loop
function main() {
  DrawPendulum();
  UpdatePendulum();
  RK4();
  setTimeout(function onTick()
  {
    main();
  },0)
}

// Runge-Kutta 4th order ODE solving scheme
function UpdatePendulum()
{

}

function ODE1(_time, _theta, _omega)
{
  dtheta = omega;

  return dtheta
}

function ODE2(_time, _theta, _omega)
{
  domega = -omega/Q - Math.sin(theta) + A * Math.cos(drivingFreq * time)

  return domega
}


function RK4()
{
  var k11 = timestep * ODE1(time, theta, omega);
  var k12 = timestep * ODE2(time, theta, omega);

  var k21 = timestep * ODE1(time + timestep/2.0, theta + k11/2.0, omega + k12/2.0);
  var k22 = timestep * ODE2(time + timestep/2.0, theta + k11/2.0, omega + k12/2.0);

  var k31 = timestep * ODE1(time + timestep/2.0, theta + k21/2.0, omega + k22/2.0);
  var k32 = timestep * ODE2(time + timestep/2.0, theta + k22/2.0, omega + k22/2.0);

  var k41 = timestep * ODE1(time + timestep, theta + k31, omega + k32);
  var k42 = timestep * ODE2(time + timestep, theta + k31, omega + k32);

  oldtheta = theta;
  theta = theta + 1.0/6.0 * (k11 + 2.0 * k21 + 2.0 * k31 + k41);
  oldomega = omega;
  omega = omega + 1.0/6.0 * (k12 + 2.0 * k22 + 2.0 * k32 + k42);

  // Update time
  time = time + timestep;

}


// Draw the pendulum, phase portrait and Poincare section
function DrawPendulum()
{

  // Clear the pendulum area
  ctx.clearRect(plotsCenterX - plotSize - plotSeparation - plotSize/2, plotsCenterY - plotSize/2, plotSize, plotSize);

  // Draw Pendulum Background
    // Shadow
  roundedRect(plotsCenterX - plotSize - plotSeparation - plotSize/2 + shadowOffset, plotsCenterY - plotSize/2 + shadowOffset, plotsCenterX - plotSize - plotSeparation + plotSize/2 + shadowOffset, plotsCenterY + plotSize/2 + shadowOffset, 10, shadowColour);
    // Background
  roundedRect(plotsCenterX - plotSize - plotSeparation - plotSize/2, plotsCenterY - plotSize/2, plotsCenterX - plotSize - plotSeparation + plotSize/2, plotsCenterY +   plotSize/2, 10, plotBackgroundColour);

  // List Parameters
  ctx.font = "22px sans-serif";
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fillText("Pendulum", plotsCenterX - plotSize - plotSize/2 - plotSeparation, plotsCenterY + plotSize/2 + 30);
  ctx.fillText("Phase Portrait", plotsCenterX - plotSize/2, plotsCenterY + plotSize/2 + 30);
  ctx.fillText("Poincare Section", plotsCenterX + plotSize - plotSize/2 + plotSeparation, plotsCenterY + plotSize/2 + 30);

  var ox = plotsCenterX - plotSize - plotSeparation;
  var oy = plotsCenterY;

  var cx = ox + length * Math.sin(theta);
  var cy = oy + length * Math.cos(theta);


  // Draw line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  ctx.beginPath();
  ctx.moveTo(ox,oy);
  ctx.arc(ox, oy, 2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(ox,oy);
  ctx.lineTo(cx,cy);
  ctx.stroke();

  // Draw Circle
  ctx.beginPath();
  // Draw arc
  ctx.arc(cx, cy, 5, 0, 2 * Math.PI);
  // Colour of circle
  ctx.strokeStyle = "rgba(212, 117, 117, 0.5)";
  ctx.fillStyle = "rgba(212, 117, 117, 0.5)";
  ctx.fill();
  ctx.stroke();

  // Phase Portrait
  ctx.beginPath();
  ctx.moveTo(plotsCenterX+ plotSize/2*Math.sin(oldtheta), plotsCenterY - plotSize/5.5*oldomega);
  ctx.lineTo(plotsCenterX+ plotSize/2*Math.sin(theta), plotsCenterY-plotSize/5.5*omega);
  ctx.strokeStyle = "rgba(212, 117, 117, 0.5)";
  ctx.stroke();
  ctx.closePath();

  // Poincare section
  ctx.fillStyle = "rgba(212, 117, 117, 0.5)";
  if((Math.sin(drivingFreq * time) > 0) & (Math.sin(drivingFreq * (time - timestep)) < 0))
    {
      ctx.fillRect(plotsCenterX + plotSize + plotSeparation + plotSize/2 * Math.sin(theta), plotsCenterY - plotSize/5.5 * omega, 2, 2);
    }

}
