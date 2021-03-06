//let flock;


let maxSpeedInitial = 2;
let boidMaxSpeed = 2;
let boidSeparationDist = 25.0;
let boidAlignmentDist = 60;
let boidCohesionDist = 50;
let separationForce = 1.8;
let alignmentForce = 1;
let cohesionForce = 1;

let boidMaxForce = 0.05;

let obstacleSize = 100;
let avoidanceForce = 0.5;
let obstacleMaxForce = 0.05;
let boidObstacleDetectionDist = 200;


//gui = new dat.GUI();
//gui.add(window, "maxSpeedInitial", 0, 50).step(1);
// gui.add(window, "boidMaxSpeed", 0, 100).step(1);
// gui.add(window, "boidSeparationDist", 0, 100).step(1);



// Setup is called once the program starts
function setup() {

    let SimulationWidth = windowWidth * 4/5;
    let SimulationHeight = windowHeight * 4/5;    

    // Create canvas
    createCanvas(SimulationWidth, SimulationHeight);
  
        // Create flock object
    flock = new Flockmanager();
  
    // Create boids
    for (let i = 0; i < 100; i++) {
        let b = new Boid(width / 2,height / 2);
        flock.createBoid(b);
    }

    // //Create obstacles
    // for (let i = 0; i < 10; i++) {
    //     let obstacle = new Obstacle( 50 + 40 * i, 50, obstacleSize);
    //     flock.createObstacle(obstacle);
    // }

    // for (let i = 0; i < 10; i++) {
    //     let obstacle = new Obstacle(50 + 40 * i, 300, obstacleSize);
    //     flock.createObstacle(obstacle);
    // }
    //let obstacle = new Obstacle(100, 100, obstacleSize);
    //flock.createObstacle(obstacle);
}

// The main draw function - acts as the main script
function draw() {
    clear();
    let backgroundBoxBorderColour = 100;
    let backgroundBoxColour = 10;
    fill(backgroundBoxColour, backgroundBoxColour, backgroundBoxColour, 40);
    stroke(backgroundBoxBorderColour, backgroundBoxBorderColour, backgroundBoxBorderColour, 40);
    push();

    let boxRounded = 10;
    rect(0, 0, width, height, boxRounded, boxRounded, boxRounded, boxRounded);
    //background(51, 51, 51, 40);
    pop();

    flock.run();
}

// Mouse makes new boid on click
function mouseClicked() {
    flock.createBoid(new Boid(mouseX, mouseY));
}

function Flockmanager() {
    this.boids = [];
    this.obstacles = [];
}

// Main flock update script called by draw
Flockmanager.prototype.run = function() {
        for (let i = 0; i < this.boids.length; i++) {
        // Tell each boid to update, according to the list of all boids that the manager has
        this.boids[i].run(this.boids, this.obstacles);  
  }

  for (let i = 0; i < this.obstacles.length; i++) {
        this.obstacles[i].draw();
    }
}

// Add new boid to the simulation
Flockmanager.prototype.createBoid = function(b) {
    this.boids.push(b);
}

// Add new obstacle to the simulation
Flockmanager.prototype.createObstacle = function(obstacle) {
    this.obstacles.push(obstacle);
}

// Obstacle function
function Obstacle(x, y, size) {
    this.position = createVector(x, y);
    this.size = size;
}

Obstacle.prototype.draw = function() {
    // Draw style settings for boid
    fill(50, 50, 50, 50);
    stroke(10, 10, 10, 40);
    push();
  
    //translate(this.position.x, this.position.y);
    beginShape();
    circle(this.position.x, this.position.y, this.size/2);
    endShape(CLOSE);

    // Reset draw settings
    pop();
}

// Boid function
function Boid(x, y) {
    //// Navigation stats
    // Maximum force for turning
    this.maxforce = boidMaxForce; 
    this.obstacleMaxForce = obstacleMaxForce;
    // Boid maximum speed
    this.maxspeed = boidMaxSpeed;

    this.size = 4.0;

    // Kinematics
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-maxSpeedInitial, maxSpeedInitial), random(-maxSpeedInitial, maxSpeedInitial));
  
}

// Boid main script
Boid.prototype.run = function(boids, obstacles) {
    // Update acceleration
    this.update(boids, obstacles);
    this.drawBoid();
}

// Update the acceleration based on the flocking rules
Boid.prototype.update = function(boids, obstacles) {
    // Separation
    let separation = this.separate(boids);   
    // Alignment
    let alignment = this.align(boids);      
    // Cohesion
    let cohesion = this.cohere(boids);   

    // Avoidance of obstacles
    let avoidance = this.avoid(obstacles);
  
    // Scale the values to make them play nicely
    separation.mult(separationForce);
    alignment.mult(alignmentForce);
    cohesion.mult(cohesionForce);
    avoidance.mult(avoidanceForce);
    // Add the force vectors to acceleration
    this.acceleration.add(separation);
    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(avoidance);

    // Perhaps add mass? could make size propto mass? Acceleration = Force / Mass

    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);


    // Wrap boid position if goes out of bounds
    if (this.position.x > width + this.size) this.position.x = -this.size;
    if (this.position.x < -this.size)  this.position.x = width + this.size;

    if (this.position.y > height + this.size) this.position.y = -this.size;
    if (this.position.y < -this.size)  this.position.y = height + this.size;

}

// Drawboid
Boid.prototype.drawBoid = function() {
    // Draw style settings for boid
    //fill(50, 50, 50, 50);
    //stroke(10, 10, 10, 40);
    boidFill = 200;
    boidFillOpacity = 50;
    boidStroke = 250;
    boidStrokeOpacity = `00`;
    fill(boidFill, boidFill, boidFill, boidFillOpacity);
    stroke(boidStroke, boidStroke, boidStroke, boidStrokeOpacity);
    
    push();

    // Get angle pi/2 rad from current heading - for drawing triangle
    let angle = this.velocity.heading() + radians(90);
  
    translate(this.position.x, this.position.y);
    rotate(angle);
    beginShape();
    vertex(0, -this.size * 2);
    vertex(-this.size, this.size * 2);
    vertex(this.size, this.size * 2);
    endShape(CLOSE);

    // Reset draw settings
    pop();
}

// Separation
Boid.prototype.separate = function(boids) {

    // Turning vector
    let turnTo = createVector(0, 0);
    let turnForce = createVector(0, 0);
    // Closeby boid counter for averaging
    let count = 0;

    // Find boids that are too close
    for (let i = 0; i < boids.length; i++) {
        let distance = p5.Vector.dist(this.position,boids[i].position);
        // If the boid is closeby and not yourself (0 is returned if the boid is checking itself)
        if ((distance > 0) && (distance < boidSeparationDist)) {
        let displacement = p5.Vector.sub(this.position, boids[i].position);
        displacement.normalize();
        // Reduce for the distance
        displacement.div(distance); 
        // Set the vector to turn to
        turnTo.add(displacement);
        count++;            
        }
    }
    // Take an average of the turn strength based on how many boids there are closeby
    if (count > 0) {
        turnTo.div(count);
    }

    if (turnTo.mag() > 0) {
        // Turning force = desired vector - velocity
        turnTo.normalize();
        turnTo.mult(this.maxspeed);
        turnForce = turnTo.sub(this.velocity);
        turnForce.limit(this.maxforce);
    }
    return turnTo;
}

// Avoid objects 
Boid.prototype.avoid = function(obstacles) {

    // Turning vector
    let turnTo = createVector(0, 0);
    let turnForce = createVector(0, 0);
    // Closeby boid counter for averaging
    let count = 0;

    let closestDistance = 100000000;

    // Find boids that are too close
    for (let i = 0; i < obstacles.length; i++) {
        // Get distance to edge of the obstacle center
        let distance = p5.Vector.dist(this.position,obstacles[i].position);
        // Subtract the radius to get the distance to the edge
        //distance = distance - obstacles[i].size;
        // If the boid is closeby and not yourself (0 is returned if the boid is checking itself)
        if ((distance > 0) && (distance < boidObstacleDetectionDist)) {
            // Get displacement to the center
            let displacement = p5.Vector.sub(this.position, obstacles[i].position);
            // Subtract the vector from the center to the edge of the circle from the displacement to get the
            // distance to the edge of the circle.
            //displacement.sub(displacement.normalize().mult(obstacles[i].size));
            displacement.normalize();
            // Reduce for the distance
            displacement.div(distance); 
            // Set the vector to turn to
            turnTo.add(displacement);
            count++;            

            // Keep track of closest distance to obstacle (for increasing the force later on)
            if(distance < closestDistance) {
                closestDistance = distance;
            }
        }
    }
    // Take an average of the turn strength based on how many boids there are closeby
    if (count > 0) {
        turnTo.div(count);
    }

    if (turnTo.mag() > 0) {
        // Turning force = desired vector - velocity
        turnTo.normalize();
        turnTo.mult(this.maxspeed);
        turnForce = turnTo.sub(this.velocity);
        // Limit the force propto the distance away from closest obstacle
        turnForce.limit(this.obstacleMaxForce);
    }
    return turnTo;
}

// Alignment
Boid.prototype.align = function(boids) {
    // Calculate average velocity for nearby boids

    // Sum for overall neighbour velocity
    let sum = createVector(0,0);

    // Closeby boid counter
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
        let displacement = p5.Vector.dist(this.position,boids[i].position);
        if ((displacement > 0) && (displacement < boidAlignmentDist)) {
        sum.add(boids[i].velocity);
        count++;
        }
    }

    // If not yourself
    if (count > 0) {
        // Divide by the number of boids
        sum.div(count);
        sum.normalize();
        sum.mult(this.maxspeed);
        // Turning force = average velocity - boid velocity
        let turnForce = p5.Vector.sub(sum, this.velocity);
        turnForce.limit(this.maxforce);
        return turnForce;
    } else {
        return createVector(0, 0);
    }
}

// Cohesion
Boid.prototype.cohere = function(boids) {

    // Sum for all locations (to find average)
    let sum = createVector(0, 0);   

    // Nearby boid counter
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
        let d = p5.Vector.dist(this.position,boids[i].position);
        if ((d > 0) && (d < boidCohesionDist)) {
        sum.add(boids[i].position);
        count++;
        }
    }
    if (count > 0) {
        // Average position of all local boids
        target = sum.div(count);
        // Turn towards the center

        // Get direction towards target position
        let targetVector = p5.Vector.sub(target, this.position);  
        // Normalize the vector
        targetVector.normalize();
        // Apply movement speed
        targetVector.mult(this.maxspeed);
        // Turn force (targetVector - velocity)
        let turnForce = p5.Vector.sub(targetVector, this.velocity);
        turnForce.limit(this.maxforce);  // Limit to maximum steering force
        return turnForce;
    } else {
        return createVector(0, 0);
    }
}


