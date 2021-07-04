
function RandomNormalizedVector() {
    let theta = Math.random() * 2 * Math.PI;
    return {
        x : Math.cos(theta),
        y : Math.sin(theta)
    }
}

function DotProductGrid(xx, yy, xfloor, yfloor) {
    // Calculate dot product between displacement vector of the point and the random vector stored in the array.
    let distance_vect = {x: xx - xfloor, y: yy - yfloor};
    let gradient_vect = grid[xfloor][yfloor];
    return distance_vect.x * gradient_vect.x + distance_vect.y * gradient_vect.y;
}

function interpolation(x, a, b) {
    return a + smoothstep(x) * (b - a);
}

function smoothstep(x) {
    return 6*x**5 - 15*x**4 + 10*x**3;
}

function Render() {
    for (xx = 0; xx < gridSize; xx += gridSize/resolution) {
        for(yy = 0; yy < gridSize; yy += gridSize/resolution) {
            
            // Do stuff
            let xfloor = Math.floor(xx);
            let yfloor = Math.floor(yy);

            // Interpolate
            let topleft = DotProductGrid(xx, yy, xfloor, yfloor);
            let topright = DotProductGrid(xx, yy, xfloor + 1, yfloor);
            let bottomleft = DotProductGrid(xx, yy, xfloor, yfloor + 1);
            let bottomright = DotProductGrid(xx, yy, xfloor + 1, yfloor + 1);

            let xtop = interpolation(xx - xfloor, topleft, topright);
            let xbottom = interpolation(xx - xfloor, bottomleft, bottomright);
            let intensity = interpolation(yy - yfloor, xtop, xbottom);
            intensity = intensity/2 + 0.5;
            intensity = intensity * 255;
            intensity = parseInt(intensity);

            ctx.fillStyle = 'rgb(' + intensity + ',' + intensity + ',' + intensity + ')';
            ctx.fillRect(xx * (plotWidth / gridSize), yy * (plotWidth / gridSize), pixelSize, pixelSize);

        }
    }
}

const canvas = document.querySelector("#perlinCanvas");
const ctx = canvas.getContext("2d");
let width = 512;
let height = 512;
canvas.width = width;
canvas.height = height;

ctx.fillText("Test", 50, 50);

// Perlin noise

// Create grid
let grid = [];
let gridSize = 10;

let plotWidth = width;
// What does resolution do??
let resolution = 64;
let pixelSize = plotWidth / resolution;


// Add random vectors for the grid corners
for (let i = 0; i <= gridSize; i++)
{
    let row = [];
    for (let j = 0; j <= gridSize; j++)
    {
        row.push(RandomNormalizedVector());
    }
    grid.push(row);
}

Render();


const canvas2 = document.querySelector("#perlinCanvas2");
const ctx2 = canvas2.getContext("2d");
let width2 = 512;
let height2 = 512;
canvas2.width = width2;
canvas2.height = height2;

// Draw normal noise
for (let i = 0; i < gridSize; i += gridSize/resolution) {
    for (let j = 0; j < gridSize; j += gridSize/resolution) {
        var randomIntensity = Math.random() * 255;
        ctx2.fillStyle = 'rgb(' + randomIntensity + ',' + randomIntensity + ',' + randomIntensity + ')';
        ctx2.fillRect(i * (plotWidth / gridSize), j * (plotWidth / gridSize), pixelSize, pixelSize);
    }
}


