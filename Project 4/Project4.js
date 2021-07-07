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

// Maths
let estimate = 0;
let numberOfPoints = 0;

// Background colour shift

let backgroundColor = 'rgba(213, 170, 6, 0.2)';

document.body.style.backgroundColor = backgroundColor;

let textOffset = 10;

let simulationBorder_width = width/2;
let simulationBorder_height = width/3.5;

let simulationBorder_centerx = width/2;
let simulationBorder_centery = height/2;

let simulationBorder_left = simulationBorder_centerx - simulationBorder_width/2;
let simulationBorder_right = simulationBorder_centerx + simulationBorder_width/2;
let simulationBorder_top = simulationBorder_centery - simulationBorder_height/2;
let simulationBorder_bottom = simulationBorder_centery + simulationBorder_height/2;

let simulationBorder_colour = 'rgba(159, 100, 0, 1)';

let simulationBorder_lineWidth = 5;

// Datapoint parameters
let defaultPointColour = 'rgba(160, 128, 0, 1)';
let circlePointColour = 'rgba(128, 160, 200, 1)';
let boxPointColour = 'rgba(11, 200, 150, 1)';
let pointRadius = 5;
let pointLineWidth = 2;

let countBox = 0;
let countCircle = 0;
let containerBox_width = simulationBorder_width/4;
let containerBox_posx = simulationBorder_centerx - simulationBorder_width/4;
let containerBox_posy = simulationBorder_centery;
let containerBox_left = containerBox_posx - containerBox_width/2;
let containerBox_top = containerBox_posy - containerBox_width/2;
let containerBox_right = containerBox_posx + containerBox_width/2;
let containerBox_bottom = containerBox_posy + containerBox_width/2;

let containerCircle_radius = containerBox_width;
let containerCircle_posx = simulationBorder_centerx + simulationBorder_width/4;
let containerCircle_posy = simulationBorder_centery;

ctx.beginPath();
ctx.strokeStyle = simulationBorder_colour;
ctx.lineWidth = simulationBorder_lineWidth;
ctx.rect(simulationBorder_left, simulationBorder_top, simulationBorder_width, simulationBorder_height);
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle = 'rgba(222, 111, 75, 0.5)';
ctx.rect(containerBox_posx - containerBox_width/2, containerBox_posy - containerBox_width/2, containerBox_width, containerBox_width);
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle = 'rgba(222, 111, 75, 0.5)';
ctx.arc(containerCircle_posx, containerCircle_posy, containerCircle_radius, 0, 2 * Math.PI);
ctx.stroke();

document.addEventListener("click", click);
//document.addEventListener("mouseup", stopMouseDownLoop);
window.addEventListener("resize", resize);



// Input
looping = false;

function click(event) {

    if(looping == false) {
        looping = true;
        console.log("starting loop")
        mouseDownLoop();
    } 
    else {
        looping = false;
        console.log("stopping loop")
    }
}

function resize() {
    //ctx.canvas.width = window.innerWidth;
    //ctx.canvas.height = window.innerHeight;
    location.reload();
  }

  function stopMouseDownLoop() {
    looping = false;
    
  }

  // Main Loop
  function mouseDownLoop() {
    
    setTimeout(function onTick()
    {
        
        addPoint();

        if(looping) {
            mouseDownLoop();
        }
      
    },0)
  }

function addPoint() {

    var posx = RandomRange(simulationBorder_left, simulationBorder_left + simulationBorder_width);
    var posy = RandomRange(simulationBorder_top, simulationBorder_top + simulationBorder_height);

    if(posx < containerBox_right && posx > containerBox_left && posy < containerBox_bottom && posy > containerBox_top) {
        ctx.strokeStyle = boxPointColour;
        countBox += 1;

        //console.log("box")
    } else if( ( ((posx - containerCircle_posx)**2) + ((posy - containerCircle_posy)**2) ) < containerCircle_radius**2){
        ctx.strokeStyle = circlePointColour;
        countCircle += 1;
        //console.log("circle")
    } else {
        ctx.strokeStyle = defaultPointColour;
        //console.log("default")
    }

    ctx.beginPath();
    
    ctx.lineWidth = pointLineWidth;
    ctx.arc(posx, posy, pointRadius, 0, 2 * Math.PI,);
    ctx.stroke();

    numberOfPoints += 1;

    // Update estimate

    
    ctx.clearRect(simulationBorder_left, simulationBorder_top - fontHeight * 3 - textOffset, simulationBorder_width, fontHeight*3 - 5);
    if(countCircle != 0 && countBox !=0) {
        estimate = countCircle/countBox;   
    }
    ctx.fillText('Samples : ' + numberOfPoints, simulationBorder_left, simulationBorder_centery - simulationBorder_height/2 - textOffset - fontHeight);
    ctx.fillText('Estimate of pi: ' + estimate, simulationBorder_left, simulationBorder_centery - simulationBorder_height/2 - textOffset - fontHeight*2);
}

