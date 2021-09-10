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


function Vec2(x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.count = 0;
    return this;
  }
  
  Vec2.prototype.add = function(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  };
  
  Vec2.prototype.subtract = function(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  };
  
  Vec2.prototype.scale = function(s) {
    this.x = this.x * s;
    this.y = this.y * s;
    return this;
  };
  
  Vec2.prototype.scaleTo = function(s) {
    var length = this.length();
    this.x = this.x * s / length;
    this.y = this.y * s / length;
    return this;
  };
  
  Vec2.prototype.normalize = function() {
    var length = this.length();
    this.x = this.x / length;
    this.y = this.y / length;
    return this;
  };
  
  Vec2.prototype.length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };
  
  Vec2.prototype.truncate = function(max) {
    var length = this.length();
    if (length > max) {
      this.x = this.x * max / length;
      this.y = this.y * max / length;
    }
    return this;
  };
  
  Vec2.prototype.dot = function(v) {
    return this.x * v.x + this.y * v.y;
  };
  
  Vec2.prototype.clone = function() {
    return new Vec2(this.x, this.y);
  };

// Parameters
const separationDistance = 30;
const flockingRadius = 60;
const maxVelocity = 2;
const numberOfBoids = 20;
const cohesionForce = 0.03;
const alignmentForce = 0.03;
const separationForce = 0.03;

let lineColour = 'rgba(50, 50, 50, 0.6)';
let backgroundColor = 'rgba(213, 170, 6, 0.2)';
let pointRadius = 2;
let lineWidth = 5;

// Draw boid
function drawBoid(boid) {

    //ctx.fillStyle = 'rgba(50, 50, 50, 0.8)'
    ctx.fillstyle = d3.interpolateWarm(d3.mean(boid.last));

    x = boid.position.x;
    y = boid.position.y;
    dir = Math.atan(boid.velocity.y, boid.velocity.y);

    // ctx.beginPath();
    // ctx.arc(x, y, 2, 0, Math.PI*2);
    // ctx.fill();
    // ctx.closePath();
    
    let r1 = 30;
    let r2 = 5;
    let r3 = 7;

    ctx.beginPath();
    ctx.moveTo(x - r2 * Math.cos(dir) + r3 * Math.cos(dir + Math.PI/2), y + r2 * Math.sin(dir) + r3 * Math.sin(dir + Math.PI/2));
    ctx.lineTo(x - r2 * Math.cos(dir) + r3 * Math.cos(dir - Math.PI/2), y + r2 * Math.sin(dir) + r3 * Math.sin(dir - Math.PI/2));

    ctx.lineTo(x + r1 * Math.cos(dir), y + r1 * Math.sin(dir));
    ctx.lineTo(x - r2 * Math.cos(dir) + r3* Math.cos(dir + Math.PI/2), y + r2 * Math.sin(dir) + r3 * Math.sin(dir + Math.PI/2));
    ctx.fill();
    ctx.closePath();

}

function updateBoidForces(boid) {

    var forces = {
        alignment : new Vec2(),
        cohesion : new Vec2(),
        separation : new Vec2()
    }

    boid.acceleration = new Vec2();

    for (var i = 0; i < boids.length; i++) {
        var otherBoid = boids[i];
        if(otherBoid === boid) return;

        var displacement = new Vec2(otherBoid.x - boid.x, otherBoid.y - boid.y);
        var distance = displacement.length();

        if(distance < separationDistance) {
            //var scaledDistance = distance.scaleTo(-1/distance);
            //forces.separation.add(scaledDistance);
            //forces.separation.active = True;
            forces.separation.add(displacement.clone().scaleTo(-1/distance)).active = true;
        }

        if(distance < flockingRadius) {
            forces.cohesion.add(displacement).active = true;
            forces.alignment.add(otherBoid.velocity);
            forces.alignment.active = true;
        }
        
    }

    for(var force in forces) {
        if(forces[force].active) {
            forces[force].scaleTo(maxVelocity);
            forces[force].subtract(boid.velocity);
            forces[force].truncate(window[force + "Force "]);
            boid.acceleration.add(forces[force]);
        }
    }

    boid.last.push(boid.acceleration.length() / (alignmentForce + cohesionForce + separationForce));
    if(boid.last.length > 20) {
        boid.last.shift();
    }

}

function updateBoidKinematics(boid) {

    boid.position.add(boid.velocity.add(boid.acceleration).truncate(maxVelocity));

    // boid.dx = speed * Math.cos(dir);
    // boid.dy = speed * Math.sin(dir);
    //boid.dir = Math.atan2(boid.dx/boid.dy);

    // boid.x += boid.dx;
    // boid.y += boid.dy;

    // Wrap position
    if(boid.position.x < 0) {boid.position.x += width;}
    if(boid.position.y < 0) {boid.position.y += height;}
    if(boid.position.x > width) {boid.position.x -= width;}
    if(boid.position.y > height) {boid.position.y -=  height;}

}

function frame() {

    ctx.clearRect(0,0,width,height);

    for(var i=0; i < boids.length; i++) {
        updateBoidForces(boids[i]);
    }
    for(var i=0; i < boids.length; i++) {
        updateBoidKinematics(boids[i]);
        drawBoid(boids[i]);
    }

    requestAnimationFrame(frame);
}



// Main script =========================================================

boids = [];


// Create the boids
for (var i = 0; i < numberOfBoids; i++) {
    boids.push({
        position : new Vec2(Math.random() * width, Math.random() * height),
        velocity : new Vec2(Math.random() * 3, Math.random() * 3),
        acceleration : new Vec2(0, 0),
        last : [],
        //colour : d3.interpolateRainbow( i / numberOfBoids)
    })
}

requestAnimationFrame(frame);




