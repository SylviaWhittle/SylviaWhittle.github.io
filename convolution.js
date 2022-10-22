// let theta;

let width = 10
let height = 10
let size = 30
let spacing = 0
let timer = 0
let image = []
let result = []

let result_x = width * size + 300
let result_y = 0

let kernel_peek_x = 400
let kernel_peek_y = 125

let ki = 1
let kj = 1
let kernel = [[-1, 2, -1], [-1, 2, -1], [-1, 2, -1]]

function setup() {
    createCanvas(width * (size + spacing) * 3, height * (size + spacing));

    // Create 2d image
    for (let x = 0; x < width; x++) {
        image[x] = []
        result[x] = []
        for (let y = 0; y < height; y++) {
            image[x][y] = 0
            result[x][y] = 0
        }
    }

    for (let i = 2; i < 6; i++) {
        image[4][i] = 100
    }

    for (let i = 2; i < 6; i++) {
        image[i][2] = 100
    }



}

function draw() {


    if (kj < height - 1) {
        if (millis() >= 400 + timer) {
            background(30)
            stroke(20)
            fill(255)
            textSize(14)
            draw_image(image, 0, 0)
            draw_image(result, result_x, result_y)
            convolve(ki, kj)
            ki += 1
            if (ki >= width - 1) {
                ki = 1
                kj += 1
            }
            timer = millis();
        }
    }

}

function convolve(ki, kj) {
    // convolve


    let total = 0
    for (let ci = 0; ci < 3; ci++) {
        for (let cj = 0; cj < 3; cj++) {
            noFill()
            stroke(80)
            rect((ki + ci - 1) * (size + spacing), (kj + cj - 1) * (size + spacing), size, size)

            rect((ki + ci - 1) * (size + spacing) + result_x, (kj + cj - 1) * (size + spacing), size, size)
            stroke(200)
            text(String(kernel[ci][cj]), (ki + ci - 1) * (size + spacing) + 10, (kj + cj - 1) * (size + spacing) + 20)

            image_value = image[ki + ci - 1][kj + cj - 1]
            total = total + image_value * kernel[ci][cj]

            rect((ci - 1) * (size + spacing) + kernel_peek_x, (cj - 1) * (size + spacing) + kernel_peek_y, size, size)
            text(String(image_value * kernel[ci][cj]), (ci - 1) * (size + spacing) + 10 + kernel_peek_x, (cj - 1) * (size + spacing) + 20 + kernel_peek_y)
        }
    }
    textSize(20)
    text('total = ' + String(total), kernel_peek_x + 80, kernel_peek_y + 20)
    result[ki][kj] = total
    console.log('total: ' + String(total))
}

function draw_image(array, px, py) {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let value = array[x][y]

            fill(value)
            rect(x * (size) + px, y * (size) + py, size, size)
        }
    }
}