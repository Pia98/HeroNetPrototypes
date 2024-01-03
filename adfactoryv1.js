const DEBUG = true;

//DO NOT TOUCH -- just needed for computation bc we want to take all the space we have
const vH = window.innerHeight;
const vW = window.innerWidth;

//CONFIG
let defaultTime = 5400;
let TIMER;
var fakeViewers;
var botAmount = 1000;
var botStickers = [];
var stickerScale = 0.1;

var wallFull = false;

var percentageUntilDone = 0;
var oldStickerCount = 0;
var whitePxs = 1000;

var step = 0; //change this for debug default should be 1 for testing

//interaction step 6
var lockedToMouse = false;
var finalPos = false;
var newX = vW/2;
var newY = 180;

let formSlider;
let formRadiusSlider;
let starCheckbox;
let formRotationSlider;
let colorSlider;
let strokeWidthSlider;
let strokeColorSlider;

let textColorSlider;
let textSizeSlider;
let textStrokeSlider;
let textStrokeColorSlider;

var shape = "star";

var customSticker;

var colorPalette = ["#F2328B", "#DA3FF3", "#9747FF", "#211885", "#030363", "#0065DC", "#01B7DF", "#80F2F2", "#3AF1BA"];
var textPalette= ["NOPE!", "YEAH!", "NO SIGNAL", "LOL", "CLICK ME", "I WAS HERE"];

var endTransform = - (Math.floor(vH /2) + 21);

// ----------- HELPERS --------------
function preload() {
  mapImg = loadImage('assets/img/karte.png');
  gunImg = loadImage('assets/img/shooter.png');
  laserImg = loadImage('assets/img/beam.png');
}

// ----------- SETUP --------------
function setup() {

  button = createButton('TEILNEHMEN');
  button.position(vW/2 - 60, vH /2 + 100);

  // Change the button's value when the mouse
  // is pressed.
  button.mousePressed(() => {
    step = 1;
    button.style('display', 'none');
  });

  //console.log("setup");
  //first define our playground area -> took the whole space which is available
  setAttributes('antialias', true);
  setAttributes('willReadFrequently', true);
  createCanvas(vW, vH);
  frameRate(60);
  TIMER = 0;

  formSlider = createSlider(2, 30, 2, 1);
  formSlider.position(20, Math.floor(vH /2) + 120);
  formSlider.style('width', vW - 40 +'px');
  formSlider.style('display', 'none');
  starCheckbox = createCheckbox(' STERN', false);
  starCheckbox.position(20, Math.floor(vH /2) + 220); 
  starCheckbox.style('display', 'none');
  formRotationSlider = createSlider(0, 90, 0, 0.5);
  formRotationSlider.position(20, Math.floor(vH /2) + 180);
  formRotationSlider.style('width', vW - 40 +'px');
  formRotationSlider.style('display', 'none');
  formRadiusSlider = createSlider(20, 130, 0, 10);
  formRadiusSlider.position(20, Math.floor(vH /2) + 250);
  formRadiusSlider.style('width', vW - 40 +'px');
  formRadiusSlider.style('display', 'none');

  colorSlider = createSlider(1, 9, 1, 1);
  strokeWidthSlider = createSlider(0, 30, 1, 0);
  strokeColorSlider = createSlider(1, 9, 1, 1);
  colorSlider.position(20, Math.floor(vH /2) + 110);
  colorSlider.style('width', vW - 40 +'px');
  strokeWidthSlider.position(20, Math.floor(vH /2) + 180);
  strokeWidthSlider.style('width', vW - 40 +'px');
  strokeColorSlider.position(20, Math.floor(vH /2) + 250);
  strokeColorSlider.style('width', vW - 40 +'px');
  colorSlider.style('display', 'none');
  strokeWidthSlider.style('display', 'none');
  strokeColorSlider.style('display', 'none');

  textColorSlider = createSlider(1, 9, 1, 1);
  textSizeSlider = createSlider(20, 200, 1, 1);
  textStrokeSlider = createSlider(0, 50, 1, 0);
  textColorSlider.position(20, Math.floor(vH /2) + 110);
  textColorSlider.style('width', vW - 40 +'px');
  textSizeSlider.position(20, Math.floor(vH /2) + 180);
  textSizeSlider.style('width', vW - 40 +'px');
  textStrokeSlider.position(20, Math.floor(vH /2) + 180);
  textStrokeSlider.style('width', vW - 40 +'px');
  textColorSlider.style('display', 'none');
  textSizeSlider.style('display', 'none');
  textStrokeSlider.style('display', 'none');

  textStrokeColorSlider = createSlider(1, 9, 1, 1);
  textStrokeColorSlider.position(20, Math.floor(vH /2) + 110);
  textStrokeColorSlider.style('width', vW - 40 +'px');
  textStrokeColorSlider.style('display', 'none');


  fakeViewers = new AdBots(botAmount);

  whitePxs = (vW - 60) * (vH/2 - 40);
}

// ----------- DRAW called every ms? --------------
function draw() {
  clear();

  //console.log("clear");

  push();
  //3min
  TIMER++;

  fakeViewers.update();

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
  translate(0, Math.floor(vH /2) + 21);
  if(step != 0) {
    rect(0, 0, vW, Math.floor(vH /2) - 20);
  }
  
  
  loadSelectionScreen();

 if(TIMER % 15 == 0) {
    //checkIfFinished();
  }
  oldStickerCount = botStickers.length;

  pop();
  translate(30, Math.floor(vH /2) + 21);
  renderProgressBar();

  if(wallFull) {
    stopGame();
  }
}



function loadSelectionScreen() {
  
  var translateX = 0;
  var translateY = Math.floor(vH /2) + 21;
  strokeWeight(0);
  textFont('Helvetica');
  textSize(25);
  textAlign(LEFT);
  fill("#80F2F2");

  if(wallFull) {
    endTransform = endTransform - 20;
    translate(- translateX, endTransform);
  } else {
    translate(- translateX, -(translateY));
  }
  fill("white");
  rect(30, 30, vW - 60, vH/2 - 40);
  //console.log("bots made stickers: " + botStickers.length);
  botStickers.forEach(s => {
    s.render();
  });
  if(step != 6 && !wallFull && step != 0) {
    const colorRect = color(0, 0, 0);
    colorRect.setAlpha(150);
    fill(colorRect);
    rect(30, 30, vW - 60, vH/2 - 40);  
  }

  if(wallFull) {
    translate(translateX, - endTransform);
  } else {
    translate(translateX, (translateY));
  }

  fill("#80F2F2");
  textAlign(RIGHT, CENTER);
  if(step == 1) {
    //show shapes
    text("Wähle eine Form", vW - 20, 30);

    textSize(18);
    text("ECKEN", vW - 20, 130);
    text("ROTIEREN", vW - 20, 195);
    if(customSticker == null) {
      customSticker = new Sticker(0, vW/2, -200, starCheckbox.checked());
    }

    if(starCheckbox.checked()) {
      formRadiusSlider.style('display', 'block');
      text("AUSPRÄGUNG", vW - 20, 265);
    }

    if(formSlider.value() == 2 && !starCheckbox.checked()) {
      customSticker.shape = 0;
      customSticker.isStar = starCheckbox.checked();
    } else {
      customSticker.shape = formSlider.value();
      customSticker.isStar = starCheckbox.checked();
    }

    customSticker.rotation = formRotationSlider.value();
    customSticker.innerRadius = formRadiusSlider.value();
  }
  if(step == 2) {
    //show shapes
    text("Wähle eine Farbe", vW - 20, 30);

    textSize(18);
    text("FARBE", vW - 20, 125);
    text("RANDDICKE", vW - 20, 195);
    text("RANDFARBE", vW - 20, 265);

    customSticker.color = colorPalette[colorSlider.value() - 1];
    customSticker.strokeWidth = strokeWidthSlider.value() - 1;
    customSticker.strokeColor = colorPalette[strokeColorSlider.value() - 1];
  }

  if(step == 3) {
    text("Wähle einen Schriftzug", vW - 20, 30);
    //show shapes
    textSize(40);
    textAlign(LEFT, BOTTOM);
    textFont('dimensions');
    text("NOPE!", 25, 100);
    text("YEAH!", 25, 170);
    text("NO SIGNAL", 25, 240);
    text("LOL", 225, 100);
    text("CLICK ME", 225, 170);
    text("I WAS HERE", 225, 240);
    textAlign(CENTER, CENTER);
  }

  if(step == 4) {
    text("Wähle eine Schriftfarbe", vW - 20, 30);

    textSize(18);
    text("FARBE", vW - 20, 125);
    text("GRÖSSE", vW - 20, 195);

    customSticker.textColor = colorPalette[textColorSlider.value() - 1];
    customSticker.textSize = textSizeSlider.value() - 1;
  }

  if(step == 5) {
    text("Wähle einen Rand", vW - 20, 30);

    textSize(18);
    text("FARBE", vW - 20, 125);
    text("RANDDICKE", vW - 20, 195);
    customSticker.textStrokeColor = colorPalette[textStrokeColorSlider.value() - 1];
    customSticker.textStroke = textStrokeSlider.value();
  }

  var translateX = 30;
  var translateY = Math.floor(vH /2) + 21;
  if(step == 6) {
    if(!finalPos) { 
      text("Platziere deinen Sticker", vW - 20, 30);
    }
    //translate(- translateX, -(translateY));
    customSticker.x = newX;
    if(wallFull && finalPos) {
      newY = newY - 20;
    }
    customSticker.y = newY;
    if(finalPos) {
      customSticker.scale = stickerScale;
      textAlign(CENTER, CENTER);
      textSize(70);
      textFont('dimensions');
      text("Congrats!", vW/2, vH/4 - 30);
      text("U did it", vW/2, vH/4 + 30);
      textFont('Helvetica');
      textSize(25);
      textAlign(LEFT);
    } else customSticker.scale = 0.5;
  } else if(step == 0) {

  }else {
    customSticker.y = - vH/4;
    customSticker.x = vW/2;
    customSticker.scale = 1;
  }

  if(step != 0) {
    if(!wallFull || finalPos) {
      customSticker.render();
    }
  
    //translate(30, Math.floor(vH /2) + 21);
    textAlign(LEFT);
    textFont('Helvetica');
    fill("#80F2F2");
    polygon(vW - 40, vH/2 - 60, 20, 3);
    textSize(18);
    //text("WEITER", vW - 150, vH/2 - 53);
    text(step + "/6", vW/2 - 20, vH/2 - 53);

    translate(50, vH/2 - 60);
    //text("ZURÜCK", 20, 7);
    rotate(66);
    polygon(0, 0, 20, 3);
  }
} 

// ----------- Move Controls --------------
function mousePressed() {
  //translate(30, Math.floor(vH /2) + 21);
  tmpX = newX + 30;
  tmpY = newY + Math.floor(vH /2) + 21;
  if (mouseX > tmpX - 280 &&
    mouseX < tmpX + 280 &&
    mouseY > tmpY - 280 &&
    mouseY < tmpY + 280) {
      //console.log("mousePressed on sticker");
    lockedToMouse = true;
  } else {
    lockedToMouse = false;
  }
  xOffset = mouseX - newX;
  yOffset = mouseY - newY;
}

function mouseDragged() {
  //console.log(step == 6 && lockedToMouse );
  if (step == 6 && lockedToMouse && !finalPos) {
    newX = mouseX - xOffset;
    newY = mouseY - yOffset;
  }
}

function mouseReleased() {
  lockedToMouse = false;
  //check if sticker is in rect

  if(step == 6) {
    if(newX > 0 &&
      newX < vW - 60 &&
      newY > (-(Math.floor(vH /2) + 21) + 30) &&
      newY < -30 ) {
        finalPos = true;
    }
  }
}

function mouseClicked() {
  var d = dist(mouseX, mouseY, vW - 45, vH );
  if (d < 45) {
    step++;
    if(step >6) {
      step = 6;
    }
    console.log("STEP:" + step);

  }

  var d = dist(mouseX, mouseY, 50, vH);
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

   if(mouseX >= 25 && mouseX <= 215) {
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
   if(mouseX >= 225 && mouseX <= vW) {
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
    formRotationSlider.style('display', 'block');
    if(starCheckbox.checked()) {
      formRadiusSlider.style('display', 'block'); 
    } else formRadiusSlider.style('display', 'none'); 
  } else {
    formSlider.style('display', 'none');
    starCheckbox.style('display', 'none');
    formRotationSlider.style('display', 'none');
    formRadiusSlider.style('display', 'none');
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
  if(step == 4) {
    textColorSlider.style('display', 'block');
    textSizeSlider.style('display', 'block');
  } else {
    textColorSlider.style('display', 'none');
    textSizeSlider.style('display', 'none');
  }
  if(step == 5) {
    textStrokeColorSlider.style('display', 'block');
    textStrokeSlider.style('display', 'block');
  } else {
    textStrokeColorSlider.style('display', 'none');
    textStrokeSlider.style('display', 'none');
  }
}

function stopGame() {
  console.log("Time is up!");
  textAlign(CENTER, CENTER);
  textSize(70);
  textFont('dimensions');
  fill("#80F2F2");
  text("Wand voll", vW/2 - 30, -200);
  text("Wird gelaunched", vW/2 - 30, -150);
  textFont('Helvetica');
  textSize(25);
  textAlign(LEFT);
}

function checkIfFinished() {

    var x = 30;
    var y = 30;
    var pixels = get(x, y, vW - 60, vH/2 - 40);
    
    var count = 0;
  
    for (let i = 0; i < pixels.width; i++) {
      for (let j = 0; j < pixels.height; j++) {
        // Get the color of the pixel.
        let c = pixels.get(i, j);
        if (hue(c) == 0) {
          count++;
        }
      }
    }
    
    if(count/146784 * 100 <= 10) {
      console.log("wall nearly full");
    }
    percentageUntilDone = count/146784; 
  
}

function renderProgressBar(){

  fill("#01011E");
  stroke("#80F2F2");
  strokeWeight(2);
  rect(-30, - vH/2 - 21, Math.floor(vW), 20);
  fill("#80F2F2");

  // if(step == 8) {
  //   rect(-25, 0, 20, (Math.floor(vH /2) - 20) - (Math.floor(vH /2) - 20) * percentageUntilDone);
  //   strokeWeight(0);
  //   text(Math.floor(100 - percentageUntilDone * 100) + "%", -25, -15);
  // } else {
    var ugfShapePx = Math.PI *35*35 * stickerScale/2;
    var pxsPerBot = Math.floor(whitePxs / (botAmount + 1));
    rect(-30, - vH/2 - 21, (Math.floor(vW)) * ((ugfShapePx * botStickers.length) / whitePxs), 20);
    strokeWeight(0);
    textSize(18);
    if(Math.floor((ugfShapePx * botStickers.length) / whitePxs * 100 >= 85)) {
      fill("#01011E");
    }
    text(Math.floor((ugfShapePx * botStickers.length) / whitePxs * 100) + "%", vW - 80, - vH/2 - 6);
    if((ugfShapePx * botStickers.length) / whitePxs * 100 >= 100) {
      wallFull = true;
    }
  //}
}

function joinTheFactory() {
  step = 1;
  document.getElementById("join_btn").style.display = "none";
}