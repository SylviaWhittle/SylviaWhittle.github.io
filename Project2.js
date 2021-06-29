
 function RandomRange(min, max) {
  return (Math.random() * (max - min) ) + min;
}

function random_rgba() {
  return 'rgba(' + RandomRange(0,255) + ',' + RandomRange(0,255) + ',' + RandomRange(0,255) + ',' + 0.3 + ')';
}

 class ball {
  constructor() {
   this.x = RandomRange(0,canvas.width);
   this.y = RandomRange(0,canvas.height);
   this.r = 12 + RandomRange(0,1) * 20;
   this.speed = RandomRange(0, 1);
   this.direction = RandomRange(-1,1) * 2 * Math.PI;
   this.colour = random_rgba();
  }

   update(){

    // Draw circle
     ctx.fillStyle = this.colour;
     ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
     ctx.fill();

     // Update position
     this.x = this.x + this.speed * Math.cos(this.direction);
     this.y = this.y + this.speed * Math.sin(this.direction);
   }

}

const canvas = document.querySelector("#canvas2");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

let balls = [];
let numberOfBalls = 20;

for(let i = 0; i < numberOfBalls; i++)
{
  balls[i] = new ball();
}

let xx = canvas.width/2;
let yy = canvas.height/2;
//let myball = new ball();

ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';

main();

// Main Loop
function main() {
  
  
  
  
  setTimeout(function onTick()
  {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    //ctx.fillText("test", xx, yy);
    //myball.update();
    for(i = 0; i < balls.length; i++)
    {
      balls[i].update();
    }
    main();
  },1)
}





