function setup() {
  createCanvas(windowWidth/1.2, windowHeight/1.2);
  frameRate(60);
}

function draw() {

  // Background
  clear();
  push();
  col_bkg = color(50);
  col_bkg.setAlpha(100);
  fill(col_bkg);
  col_border = color(0, 0, 0);
  col_border.setAlpha(150);
  strokeWeight(5)
  stroke(col_border);
  rect(0, 0, width, height)
  pop();

}