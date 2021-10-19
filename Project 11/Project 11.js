function setup() {
  createCanvas(windowWidth/1.5, windowHeight/1.5);
  frameRate(60);

  objectList = [];

  // Constants
  g = 1;
  softening = 1;
}

// Maths functions
function pointDirection(x1, y1, x2, y2) {
  return atan2(y2 - y1, x2 - x1);
}


function draw() {
  // Background
  clear();
  push();
  col_bkg = color(100, 100, 100);
  col_bkg.setAlpha(50);
  fill(col_bkg);
  col_border = color(0, 0, 0);
  col_border.setAlpha(50);
  strokeWeight(5)
  stroke(col_border);
  rect(0, 0, width, height)
  pop();

  // Physics
  updatePhysics();

  // Draw
  for(var i=0; i<objectList.length; i++) {
    object = objectList[i];
    object.drawObject();
  }
}

class Planet {

  constructor(x, y, mass = random(5, 20)) {
    this.mass = mass;
    this.size = this.mass * 0.8;
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1,1), random(-1,1));
    this.acc = createVector(0, 0);
    this.col = color(255 - random(100), 255 - random(100), 255 - random(100));
    this.col.setAlpha(50);
    this.col_line = this.col;
    this.col_line.setAlpha(150);
    this.trailLength = 100;
    this.trail = [];
    this.trailCounter = 0;

    objectList.push(this);
  }

  drawObject() {
    let trailScale;
    let trailOpacity

    // Iterate over the array of stored positions
    if(this.trail.length > 2) {
      for(var i=0; i<this.trail.length; i++){
        trailScale = i / this.trail.length;
        trailOpacity = i / this.trail.length * 255;
        // Draw a circle at the position of the previous point
        push();
        this.col.setAlpha(trailOpacity);
        fill(this.col);
        stroke(this.col);
        strokeWeight(2);
        circle(this.trail[i].x, this.trail[i].y, this.size * 2 * trailScale);
        pop();
      }
    }

    // Update trail 
    if(this.trail.length > this.trailLength) {
      this.trail.shift();
    }
    // For some reason, this does not work with vectors!
    this.trail.push({x: this.pos.x, y: this.pos.y});

    // Draw object
    push();
    fill(0, 0, 0, 0);
    stroke(this.col);
    strokeWeight(2);
    circle(this.pos.x, this.pos.y, this.size * 2);
    pop();
  }
}

function mouseClicked() {
  _planet = new Planet(mouseX, mouseY);
}


function updatePhysics() {

  crashList = [];

  // Update acceleration
  for(var i = 0; i < objectList.length; i++) {
    object = objectList[i];
    object.acc.set(0, 0);

    for(var j = 0; j < objectList.length; j++) {
      if(i != j) {
        otherObject = objectList[j];
        displacement = createVector(otherObject.x - object.x, otherObject.y - object.y);
        distanceToObject = object.pos.dist(otherObject.pos);
        directionToObject = pointDirection(object.pos.x, object.pos.y, otherObject.pos.x, otherObject.pos.y);

        // Calculate gravitational force
        force = g * otherObject.mass / (distanceToObject * sqrt(distanceToObject + softening));

        // Calculate components of the force
        if(distanceToObject > object.size + otherObject.size) {
          // Add force
          object.acc.add(force * cos(directionToObject), force * sin(directionToObject));
        }
        else {
          // Crash
          // If sizes are within some % of each other, crash both
          if(max(object.size, otherObject.size) < 1.25 * min(object.size, otherObject.size)) {
            if(!crashList.includes(i)){
              crashList.push(i);
            }
            if(!crashList.includes(j)){
              crashList.push(j);
            }
          }
          else {
            // If sizes are not within some % of each other, crash the smaller one
            if(object.size > otherObject.size) {
              if(!crashList.includes(j)){
                crashList.push(j);
              }
              object.vel.mult(0.8);
            }
            else {
              if(!crashList.includes(i)){
                crashList.push(i);
              }
              otherObject.vel.mult(0.8);
            }
            
          }
        }

      }
    }
  }


// Crash

// Define custom sorting funciton to be able to sort numbers
 crashList.sort(function(a,b) {
   return a - b;
 });

 for(var c=crashList.length-1; c>=0;c--) {
  // Delete items from objectList backwards
  index = crashList[c];
  object = objectList[index];

  // If size is large enough, create smaller objects
  if(object.size > 3) {
    for(var d=0; d<3; d++) {
      spawnrange = object.size;
      spawnspeed = 2;
      _planet = new Planet(object.pos.x + random(-spawnrange, spawnrange), object.pos.y + random(-spawnrange, spawnrange), object.size/2);
      _planet.vel.set(random(-spawnspeed, spawnspeed), random(-spawnspeed, spawnspeed));
    }
  }

  objectList.splice(index,1);
}

  // Update velocities
  for(var i = 0; i < objectList.length; i++) {
    object = objectList[i];
    object.vel.add(object.acc);

  }

  // Update positions
  for(var i=0;i<objectList.length;i++) {
    object = objectList[i];
    object.pos.add(object.vel);

  }

}


