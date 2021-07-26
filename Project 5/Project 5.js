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

// Manual continue button
//document.getElementById('button').onclick = function() {
//    console.log("button was clicked");
//    proceed = true;
//}​
//proceed = false;

let backgroundColor = 'rgba(213, 170, 6, 0.2)';

document.body.style.backgroundColor = backgroundColor;
ctx.lineWidth = 2;

window.addEventListener("resize", resize);

// Wait function
function Wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

// Resize function
function resize() {
    //ctx.canvas.width = window.innerWidth;
    //ctx.canvas.height = window.innerHeight;
    location.reload();
  }

let pointRadius = 3;

// Find the perpendicular bisector between two points in implicit form
function Bisector(p1, p2) {
    // Implicit form:
    // ax + by = c
    var line = {dx : p1.y - p2.y, dy : -(p1.x - p2.x), c : -(p1.x - p2.x) * p1.y + (p1.y - p2.y) * p1.x}

    // Centerpoint
    var centerPoint = {x : (p1.x + p2.x)/2, y : (p1.y + p2.y)/2};

    // Bisector line
    var bisector = {dx : line.dy, dy : -line.dx, c :  ((line.dy * centerPoint.x) + (-line.dx * centerPoint.y))};

    // Calculate length of drawn bisector (aesthetics)
    var bisectionLength = 0.2;
    var modifiedBisectionLength = {x : bisector.dx * bisectionLength, y : bisector.dy * bisectionLength};

    // Draw centerpoint of the line
    DrawPoint(centerPoint);

    // Draw the bisector
    var b1 = {x : centerPoint.x + modifiedBisectionLength.y, y : centerPoint.y - modifiedBisectionLength.x};
    var b2 = {x : centerPoint.x - modifiedBisectionLength.y, y : centerPoint.y + modifiedBisectionLength.x};
    //DrawLine(b1,b2);

    return bisector;
}

function CircumCircle(p1, p2, p3) {

    // Draw points
    ctx.beginPath();
    ctx.arc(p1.x, p1.y, pointRadius, 0, 2*Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(p2.x, p2.y, pointRadius, 0, 2*Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(p3.x, p3.y, pointRadius, 0, 2*Math.PI);
    ctx.stroke();

    // Calculate bisectors
    var bisect1 = Bisector(p1, p2);
    //console.log(bisect1);
    var bisect2 = Bisector(p1, p3);
    //console.log(bisect2);
    var bisect3 = Bisector(p2, p3);
    //console.log(bisect3);

    // Find intersection point between bisectors 1 and 2
    var a1 = bisect3.dx;
    var a2 = bisect2.dx;
    var b1 = bisect3.dy;
    var b2 = bisect2.dy;
    var c1 = bisect3.c;
    var c2 = bisect2.c;

    // Calculate intersection point of the bisectors
    var intersectx = (c1*b2 - c2*b1)/(a1*b2 - a2*b1);
    var intersecty = (c2 - a2 * intersectx)/b2;
    var intersect = {x : intersectx, y : intersecty};

    // Draw the intersection point (center of the circle)
    DrawPoint(intersect);
    DrawPoint(intersect, undefined, 6);

    // Find radius of the circle
    circleradius = Math.sqrt((intersect.x - p1.x)**2 + (intersect.y - p1.y)**2);

    circumCircle = {radius : circleradius, centre : {x : intersect.x, y : intersect.y}};
    DrawCircle(circumCircle);

    return circumCircle;

}

// Draw line function
function DrawLine(p1, p2, colour) {
    if(colour === undefined) colour = 'rgba(0, 0, 0, 0.05)';
    ctx.strokeStyle = colour;
    ctx.beginPath();
    ctx.moveTo(p1.x,p1.y);
    ctx.lineTo(p2.x,p2.y);
    ctx.stroke();
}

// Draw point function
function DrawPoint(p, colour, radius) {
    if(radius === undefined) radius = 2;
    if(colour === undefined) colour = 'rgba(0, 0, 0, 0.1)';
    ctx.strokeStyle = colour;
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, 2*Math.PI);
    ctx.stroke();
    ctx.strokeStyle = "black";
}

// Draw circle function
function DrawCircle(circle, colour) {
    if(colour === undefined) colour = 'rgba(0, 100, 100, 0.1)';
    ctx.strokeStyle = colour;
    ctx.beginPath();
    ctx.arc(circle.centre.x, circle.centre.y, circle.radius, 0, 2*Math.PI);
    ctx.stroke();
}

// Draw triangle function
function DrawTriangle(triangle, colour) {
    if(colour === undefined) colour = 'rgba(0, 0, 0, 0.01)';
    ctx.strokeStyle = colour;
    //console.log(triangle)
    var p1 = triangle.p1;
    var p2 = triangle.p2;
    var p3 = triangle.p3;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
}





// Main Script =========

// Create points
pointsArray = [];
let numberOfPoints = 4;
for (let i=numberOfPoints-1; i>=0; i--) {
    pointsArray[i] = {x : RandomRange(width/3, width*2/3), y : RandomRange(height/3, height*2/3)}
}

// Draw points 
for (let i=1; i<pointsArray.length; i++) {
    DrawPoint(pointsArray[i], "black");
}


// Create triangles array
triangles = [];

// Create super triangle
superTrianglePoint1 = {x : 0, y : height/4};
superTrianglePoint2 = {x : width, y : height/4};
superTrianglePoint3 = {x : width/2, y : height};
superTriangle = {p1 : superTrianglePoint1, p2 : superTrianglePoint2, p3 : superTrianglePoint3};
DrawPoint(superTrianglePoint1);
DrawPoint(superTrianglePoint2);
DrawPoint(superTrianglePoint3);

// Add super triangle to triangle list
triangles.push({p1:superTrianglePoint1, p2:superTrianglePoint2, p3:superTrianglePoint3});

DrawTriangle(superTriangle);

// Select a point
for (var k=0; k<pointsArray.length; k++) {
    point = pointsArray[k];
    console.log("point " + k)

    var newTriangles = [];
    var trianglesToBeDeleted = [];
    var trianglesAfterDeletion = [];

    console.log("# of triangles: " + String(triangles.length))
    
    // Draw triangles DEBUG
    for(var i=0; i<triangles.length; i++) {
        DrawTriangle(triangles[i], "black")
    }

    // Look for circumcircles whose triangle contains the point
    for (var i=0; i<triangles.length; i++) {
        console.log("triangle " + i);
        var triangle = triangles[i];
        //console.log(triangle);

        var circumCircle = CircumCircle(triangle.p1, triangle.p2, triangle.p3);

        // Check if the point is inside the circumcircle of the triangle
        var disp = {x : circumCircle.centre.x - point.x, y : circumCircle.centre.y - point.y};
        if(disp.x**2 + disp.y**2 <= circumCircle.radius**2) {
            DrawPoint(point, "red")
            // Add triangle to delete list and create the new triangles
            trianglesToBeDeleted.push(i);
            var newtriangle1 = {p1 : point, p2 : triangle.p1, p3 : triangle.p2};
            var newtriangle2 = {p1 : point, p2 : triangle.p1, p3 : triangle.p3};
            var newtriangle3 = {p1 : point, p2 : triangle.p2, p3 : triangle.p3};
            newTriangles.push(newtriangle1);
            newTriangles.push(newtriangle2);
            newTriangles.push(newtriangle3);
            DrawTriangle(newtriangle1);
            DrawTriangle(newtriangle2);
            DrawTriangle(newtriangle3);
        }
    }

    // Delete colliding triangles from the list
    //for (var s=0; s<trianglesToBeDeleted.length; s++) {
    //    triangles.splice(trianglesToBeDeleted[s]);BROKENNNNNNNNNN514
    //}

    // Mark triangles for deletion
    for (var i=0; i<trianglesToBeDeleted.length; i++) {
        triangles[trianglesToBeDeleted[i]] = undefined;
    }

    // Move all nonmarked triangles to new list
    for(var i=0; i<triangles; i++) {
        if(triangles[i] != undefined) {
            trianglesAfterDeletion.push(triangles[i]);
        }
    }

    console.log(trianglesAfterDeletion);

    triangles = trianglesAfterDeletion;

    // Add the new triangles to the list
    for (var t=0; t<newTriangles.length; t++) {
        triangles.push(newTriangles[t]);
    }
    
    //while(true) {
    //    if(proceed) {
    //        break;
    //    }
    //}
    //proceed = false;
    
}

console.log("number of triangles after loop: ")
console.log(triangles.length);

// Remove all points and triangles containing points from original supertriangle
var trianglesToBeDeleted = [];
for(var t=0; t<triangles.length; t++) {
    var triangle = triangles[t];
    DrawTriangle(triangle, "black");
    var t1 = triangle.p1;
    var t2 = triangle.p2;
    var t3 = triangle.p3;
    var s1 = superTrianglePoint1;
    var s2 = superTrianglePoint2;
    var s3 = superTrianglePoint3;
    if(t1 == s1 || t1 == s2 || t1 == s3 || t2 == s1 || t2 == s2 || t2 == s3 || t3 == s1 || t3 == s2 || t3 == s3) {
        trianglesToBeDeleted.push(t);
        console.log("delting outer triangle : " + triangle)

        for(j=0; j<trianglesToBeDeleted.length; j++) {
            DrawTriangle(triangles[t], 'rgba(0, 255, 0, 0.2)');
            ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
            ctx.fill();
            ctx.fillStyle = "black";
        }
    }
}

// Delete outer triangles
remainingTriangles = [];

console.log("Triangles: " + triangles.length);
console.log("Triangles to be deleted: " + trianglesToBeDeleted.length);
console.log(trianglesToBeDeleted)
for (var i=0; i<trianglesToBeDeleted.length; i++) {
    triangles[trianglesToBeDeleted[i]] = undefined; 
    console.log("marking for deletion ")
}

//console.log(triangles);
//for (var i=0; i<triangles.length; i++) {
//    if(triangles[i] == undefined) {
//        //triangles.splice(trianglesToBeDeleted[i], 1);
//        remainingTriangles.push(triangles[i]);
//    }
//}


console.log("moving to the remaining list")
for(var i=0; i<triangles.length; i++) {
    if(triangles[i] != undefined) {
        remainingTriangles.push(triangles[i]);
    }
}


console.log("remaining triangles: ")
console.log(remainingTriangles);
console.log("triangles remaining: " + remainingTriangles.length);

for(var t=0; t<remainingTriangles.length; t++) {
    DrawTriangle(remainingTriangles[t], "red");
}



//testarray = [5, 6, 7, 8, 9];
//newtestarray = testarray.splice(3, 2);
//console.log(testarray);
//console.log(newtestarray);


