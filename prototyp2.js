const DEBUG = true;

//DO NOT TOUCH -- just needed for computation bc we want to take all the space we have
const vH = window.innerHeight;
const vW = window.innerWidth;

//CONFIG
let defaultTime = 7200;
let TIMER;
var fakeViewers;

var step = 1;

let formSlider;
let starCheckbox;
let colorSlider;
let strokeWidthSlider;
let strokeColorSlider;

var shape = "star";

var customSticker;

var colorPalette = ["#F2328B", "#DA3FF3", "#9747FF", "#211885", "#030363", "#0065DC", "#01B7DF", "#80F2F2", "#3AF1BA"];


// ----------- HELPERS --------------
function preload() {
  mapImg = loadImage('assets/img/karte.png');
  gunImg = loadImage('assets/img/shooter.png');
  laserImg = loadImage('assets/img/beam.png');
}

// ----------- SETUP --------------
function setup() {
  console.log("setup");
  //first define our playground area -> took the whole space which is available
  createCanvas(vW, vH);
  frameRate(60);
  TIMER = defaultTime;

  formSlider = createSlider(2, 9, 2, 1);
  formSlider.position(50, Math.floor(vH /2) + 120);
  formSlider.style('width', vW/1.2 +'px');
  starCheckbox = createCheckbox(' STERN', false);
  starCheckbox.position(50, Math.floor(vH /2) + 180); 


  colorSlider = createSlider(1, 9, 2, 1);
  strokeWidthSlider = createSlider(1, 30, 2, 1);
  strokeColorSlider = createSlider(1, 9, 2, 1);
  colorSlider.position(50, Math.floor(vH /2) + 110);
  colorSlider.style('width', vW/1.2 +'px');
  strokeWidthSlider.position(50, Math.floor(vH /2) + 180);
  strokeWidthSlider.style('width', vW/1.2 +'px');
  strokeColorSlider.position(50, Math.floor(vH /2) + 250);
  strokeColorSlider.style('width', vW/1.2 +'px');
  colorSlider.style('display', 'none');
  strokeWidthSlider.style('display', 'none');
  strokeColorSlider.style('display', 'none');

}

// ----------- DRAW called every ms? --------------
function draw() {
  clear();

  //console.log("clear");

  //3min
  TIMER--;

  if(TIMER <= 0) {
    noLoop();
    stopGame();
  }

  if(DEBUG) {
    fill('white');
    textSize(10);
    textFont('Helvetica');
    // text(mouseY, 10,window.innerHeight - 60);

    // text(Math.floor(vH /2), 10,window.innerHeight - 80);
  }

  // Auswahlbox
  fill("#01011E");
  stroke("#80F2F2");
  strokeWeight(2);
  translate(30, Math.floor(vH /2) + 21);
  rect(0, 0, vW - 20, Math.floor(vH /2) - 20);

  
  loadSelectionScreen();
  
  
}



function loadSelectionScreen() {
  strokeWeight(0);
  fill("white");
  textFont('Helvetica');
  textSize(25);

  if(step == 1) {
    //show shapes
    text("Wähle eine Form", 180, 30);

    textSize(18);
    text("ECKEN", 310, 135);

    if(formSlider.value() == 2 && !starCheckbox.checked()) {
      customSticker = new Sticker(0, vW/2 - 30, -200, starCheckbox.checked());
    } else {
      customSticker = new Sticker(formSlider.value(), vW/2 - 30, -200, starCheckbox.checked());
    }
  }
  if(step == 2) {
    //show shapes
    text("Wähle eine Farbe", 180, 30);

    textSize(18);
    text("FARBE", 315, 125);
    text("RANDDICKE", 270, 195);
    text("RANDFARBE", 265, 265);

    customSticker.color = colorPalette[colorSlider.value() - 1];
    customSticker.strokeWidth = strokeWidthSlider.value() - 1;
    customSticker.strokeColor = colorPalette[strokeColorSlider.value() - 1];
  }

  if(step == 3) {
    text("Wähle einen Schriftzug", 110, 30);
    //show shapes
    textSize(40);
    textFont('dimensions');
    text("NOPE!", 25, 100);
    text("YEAH!", 25, 170);
    text("NO SIGNAL", 25, 240);
    text("LOL", 225, 100);
    text("CLICK ME", 225, 170);
    text("I WAS HERE", 225, 240);
  }

  customSticker.render();

  textFont('dimensions');
  fill("#80F2F2");
  polygon(vW - 70, vH/2 - 60, 20, 3);
  textSize(18);
  //text("WEITER", vW - 150, vH/2 - 53);
  text(step + "/4", vW/2 - 20, vH/2 - 53);

  translate(50, vH/2 - 60);
  //text("ZURÜCK", 20, 7);
  rotate(66);
  polygon(0, 0, 20, 3);

} 

// ----------- Move Controls --------------
function mousePressed() {
  
}

function mouseDragged() {

}

function mouseClicked() {
  var d = dist(mouseX, mouseY, vW - 45, vH );
  if (d < 45) {
    step++;
    if(step > 4) {
      step = 4;
    }
    console.log("STEP:" + step);

  }

  var d = dist(mouseX, mouseY, 80, vH );
  if (d < 45) {
    step--;
    if(step < 1 ) {
      step = 1;
    }
    console.log("STEP:" + step);
  }


if(step == 3) {
  /**
   *  text("NOPE!", 25, 100);
    text("YEAH!", 25, 170);
    text("NO SIGNAL", 25, 240);
    text("LOL", 225, 100);
    text("CLICK ME", 225, 170);
    text("I WAS HERE", 225, 240);
   */

   if(mouseX >= 55 && mouseX <= 230) {
     //column 1
     if(mouseY >= Math.floor(vH /2) + 50 && mouseY <= Math.floor(vH /2) + 120) {
      //row = 1;
      customSticker.text = "NOPE!";
    }
    if(mouseY >= Math.floor(vH /2) + 120 && mouseY <= Math.floor(vH /2) + 190) {
      //row = 2;
      customSticker.text = "YEAH!";
    }
    if(mouseY >= Math.floor(vH /2) + 190 && mouseY <= Math.floor(vH /2) + 260) {
      //row = 3;
      customSticker.text = "NO SIGNAL";
    }
   }
   if(mouseX >= 255 && mouseX <= 430) {
    //column 2
    if(mouseY >= Math.floor(vH /2) + 50 && mouseY <= Math.floor(vH /2) + 120) {
      //row = 1;
      customSticker.text = "LOL";
    }
    if(mouseY >= Math.floor(vH /2) + 120 && mouseY <= Math.floor(vH /2) + 190) {
      //row = 2;
      customSticker.text = "CLICK ME";
    }
    if(mouseY >= Math.floor(vH /2) + 190 && mouseY <= Math.floor(vH /2) + 260) {
      //row = 3;
      customSticker.text = "I WAS HERE";
    }
   }
 

}

  if(step == 1) {
    formSlider.style('display', 'block');
    starCheckbox.style('display', 'block');
  } else {
    formSlider.style('display', 'none');
    starCheckbox.style('display', 'none');
  }
  if(step == 2) {
    colorSlider.style('display', 'block');
    strokeWidthSlider.style('display', 'block');
    strokeColorSlider.style('display', 'block');
  } else {
    colorSlider.style('display', 'none');
    strokeWidthSlider.style('display', 'none');
    strokeColorSlider.style('display', 'none');
  }
}

function stopGame() {
  console.log("Time is up!");
}