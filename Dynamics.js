const dcanvas = document.querySelector("#dynamics_canvas");
const dctx = dcanvas.getContext("2d");

let w = 0;
let h = 0;

if (window.innerHeight > window.innerWidth) {
    w = window.innerWidth / 1.5
    h = w
}
else {
    h = window.innerHeight / 1.5
    w = h
}


dcanvas.width = w
dcanvas.height = h

dctx.fillStyle = 'rgba(150, 150, 150, 0.3)';
dctx.font = "20px sans-serif";
// dctx.fillRect(0, 0, 100, 100)

dctx.fillText("Pendulum", 100, 100);


function ode1(x, y, z, b = 0.208186) {
    x_prime = Math.sin(y) - b * x;
    y_prime = Math.sin(z) - b * y;
    z_prime = Math.sin(x) - b * z;
    return [x_prime, y_prime, z_prime];
}

function ode2(x, y, z, alpha = 0.95, beta = 0.7, gamma = 0.65, delta = 3.5, epsilon = 0.25, eta = 0.1) {
    dx = (z - beta) * x - delta * y;
    dy = delta * x - (z - beta) * y;
    dz = gamma + alpha * z - Math.pow(z, 3) / 3 - (Math.pow(x, 2) + Math.pow(y, 2)) * (1 + epsilon * z) + eta * z * Math.pow(x, 3);
    return [dx, dy, dz]
}

const iterations = Math.pow(10, 6);
const num_particles = Math.pow(10, 4);
const dt = 0.1


dctx.fillStyle = "rgba(10, 10, 10, 1)";
dctx.fillRect(0, 0, width, height)

x_min = -6
x_max = 6

y_min = x_min * (height / width);
y_max = x_max * (height / width);

dctx.fillStyle = "rgba(255, 0, 100, 0.1)";

let x_i = 0;
let y_i = 0;
let x_prime, y_prime, z_prime = 0;
let x = 0;
let y = 0;
let z = 0;
let i = 0;
const sens1 = w / 10;
const sens2 = w / 100;

DynamicStep()

function ProcessStep() {


    if (i % num_particles == 0) {
        x = 2 * Math.random() - 1;
        y = 2 * Math.random() - 1;
        z = 2 * Math.random() - 1;
    }

    i += 1;

    return_array = ode1(x, y, z)

    x_prime = return_array[0];
    y_prime = return_array[1];
    z_prime = return_array[2];

    x += x_prime * dt;
    y += y_prime * dt;
    z += z_prime * dt;



    // if (num_particles < 500) {
    //     continue
    // }

    // x_i = Math.round((x - x_min) * w / (x_max - x_min))
    // y_i = Math.round((y - y_max) * h / (y_max - y_min))


    // console.log(x_i, y_i);
    // if (x_i >= 0 && x_i < width && y_i >= 0 && y_i < height) {
    //     dctx.fillRect(w / 2 + x_i * sens, h / 2 + y_i * sens, 10, 10)
    // }

    dctx.fillRect(w / 2 + x * sens1, h / 2 + y * sens1, 1, 1)
    // dctx.fillRect(width / 2 + x_i, height / 2 + y_i, 10, 10)
}

// Main Loop
function DynamicStep() {
    ProcessStep()
    setTimeout(function onTick() {
        DynamicStep();
    }, 0)
}