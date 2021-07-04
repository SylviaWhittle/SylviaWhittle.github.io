// Functions 
 function RandomRange(min, max) {
  return (Math.random() * (max - min) ) + min;
}

function Chance(percentage) {
  var rand = RandomRange(0,1);
  if(rand < percentage){
    return true;
  }
  else{
    return false;
  }
}

function Clamp(number, min, max) {
  if(number <= min){
    return min;
  }
  else if(number >= max){
    return max;
  }
  else{
    return number;
  }
}

function random_rgba() {
  return 'rgba(' + RandomRange(0,255) + ',' + RandomRange(0,255) + ',' + RandomRange(0,255) + ',' + 0.3 + ')';
}

function ColourShift() {
  if(Chance(0.2)){
    // Change red
    if(Chance(0.5)){
      colour_r += 1;
    }
    else{
      colour_r -= 1;
    }
  }

  if(Chance(0.2)){
    // Change green
    if(Chance(0.5)){
      colour_g += 1;
    }
    else{
      colour_g -= 1;
    }
  }

  if(Chance(0.2)){
    // Change blue
    if(Chance(0.5)){
      colour_b += 1;
    }
    else{
      colour_b -= 1;
    }
  }

  colour_r = Clamp(colour_r, 0, 255);
  colour_g = Clamp(colour_g, 0, 255);
  colour_b = Clamp(colour_b, 0, 255);

  colour = 'rgba(' + String(colour_r) + ',' + String(colour_g) + ',' + String(colour_b) + ',' + String(colour_alpha) + ')';

  document.body.style.backgroundColor = colour;

  ctx.fillText('R: ' + String(colour_r), 50, 50);
  ctx.fillText('G: ' + String(colour_g), 50, 60)
  ctx.fillText('B: ' + String(colour_b), 50, 70)
  ctx.fillText('A: ' + String(colour_alpha), 50, 80)
}

function UpdateCircle() {
  cx = RandomRange(0, 255);
  cy = RandomRange(0, 255);

  ctx.beginPath();
  ctx.arc(cx, cy, 5, 0, 2 * Math.PI);
  ctx.fill();
}


// Start of JS file ===================================================================================== //
const canvas = document.querySelector("#canvas3");
const ctx = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

// Background colour shift
let colour_r = RandomRange(0, 255);
let colour_g = RandomRange(0, 255);
let colour_b = RandomRange(0, 255);
let colour_alpha = 1;
let colour = 'rgba(' + String(colour_r) + ',' + String(colour_g) + ',' + String(colour_b) + ',' + String(colour_alpha) + ')';

document.body.style.backgroundColor = colour;

// Moving circle
let cx = RandomRange(0, canvas.width);
let cy = RandomRange(0, canvas.height);


main();

// Main Loop
function main() {
  
  setTimeout(function onTick()
  {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ColourShift();
    UpdateCircle();
    main();
  },1)
}





