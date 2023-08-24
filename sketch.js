const vH = window.innerHeight;
const vW = window.innerWidth;

function setup() {
  console.log("we are loaded!");
  //first define our playground area -> took the whole space which is available
  createCanvas(vW, vH);
}

function draw() {
  if(mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}
