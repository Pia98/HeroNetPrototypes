const DEBUG = true;

//DO NOT TOUCH -- just needed for computation bc we want to take all the space we have
const vH = window.innerHeight;
const vW = window.innerWidth;

//CONFIG
let defaultTime = 7200;
let TIMER;
var fakeViewers;

var step = 1;

var shape = "star";

// ----------- HELPERS --------------
function preload() {
  mapImg = loadImage('assets/img/karte.png');
  gunImg = loadImage('assets/img/shooter.png');
  laserImg = loadImage('assets/img/beam.png');
}

// ----------- SETUP --------------
function setup() {
  //first define our playground area -> took the whole space which is available
  createCanvas(vW, vH);
  frameRate(60);
  TIMER = defaultTime;

 
}

// ----------- DRAW called every ms? --------------
function draw() {
  clear();

  console.log("clear");

  //3min
  TIMER--;

  if(TIMER <= 0) {
    noLoop();
    stopGame();
  }

  // Auswahlbox
  fill("#01011E");
  stroke("#80F2F2");
  strokeWeight(2);
  translate(30, vH - Math.floor(vH /2) + 21);
  rect(0, 0, vW - 20, Math.floor(vH /2) - 20);

  
  loadSelectionScreen(step);
  

  if(DEBUG) {
   
  }
  
}



function loadSelectionScreen(s) {
  if(s = 1) {
    //show shapes
    textSize(20);
    strokeWeight(0);
    fill("white");
    text("Wähle eine Form", 220, 30);

    var rectShape = new Shape("rect", 50, 50);
    rectShape.render();

    var starShape = new Shape("star", 100, 100);
    starShape.render();

    var circleShape = new Shape("circle", 350, 150);
    circleShape.render();
  }


} 

// ----------- Move Controls --------------
function mousePressed() {
  
}

function mouseDragged() {

}

function mouseClicked() {

}

function stopGame() {
  console.log("Time is up!");
}