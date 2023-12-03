const DEBUG = true;

//DO NOT TOUCH -- just needed for computation bc we want to take all the space we have
const vH = window.innerHeight;
const vW = window.innerWidth;

//CONFIG
let defaultTime = 7200;
let TIMER;
var fakeViewers;
var botAmount = 10000;
var botStickers = [];

var step = 1; //change this for debug default should be 1 for testing

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


// ----------- HELPERS --------------
function preload() {
  mapImg = loadImage('assets/img/karte.png');
  gunImg = loadImage('assets/img/shooter.png');
  laserImg = loadImage('assets/img/beam.png');
}

// ----------- SETUP --------------
function setup() {
  //console.log("setup");
  //first define our playground area -> took the whole space which is available
  createCanvas(vW, vH);
  frameRate(60);
  TIMER = defaultTime;

  formSlider = createSlider(2, 30, 2, 1);
  formSlider.position(50, Math.floor(vH /2) + 120);
  formSlider.style('width', vW/1.2 +'px');
  starCheckbox = createCheckbox(' STERN', false);
  starCheckbox.position(50, Math.floor(vH /2) + 220); 
  formRotationSlider = createSlider(0, 90, 0, 0.5);
  formRotationSlider.position(50, Math.floor(vH /2) + 180);
  formRotationSlider.style('width', vW/1.2 +'px');
  formRadiusSlider = createSlider(20, 130, 0, 10);
  formRadiusSlider.position(50, Math.floor(vH /2) + 250);
  formRadiusSlider.style('width', vW/1.2 +'px');
  formRadiusSlider.style('display', 'none');

  colorSlider = createSlider(1, 9, 1, 1);
  strokeWidthSlider = createSlider(0, 30, 1, 0);
  strokeColorSlider = createSlider(1, 9, 1, 1);
  colorSlider.position(50, Math.floor(vH /2) + 110);
  colorSlider.style('width', vW/1.2 +'px');
  strokeWidthSlider.position(50, Math.floor(vH /2) + 180);
  strokeWidthSlider.style('width', vW/1.2 +'px');
  strokeColorSlider.position(50, Math.floor(vH /2) + 250);
  strokeColorSlider.style('width', vW/1.2 +'px');
  colorSlider.style('display', 'none');
  strokeWidthSlider.style('display', 'none');
  strokeColorSlider.style('display', 'none');

  textColorSlider = createSlider(1, 9, 1, 1);
  textSizeSlider = createSlider(20, 200, 1, 1);
  textStrokeSlider = createSlider(0, 50, 1, 0);
  textColorSlider.position(50, Math.floor(vH /2) + 110);
  textColorSlider.style('width', vW/1.2 +'px');
  textSizeSlider.position(50, Math.floor(vH /2) + 180);
  textSizeSlider.style('width', vW/1.2 +'px');
  textStrokeSlider.position(50, Math.floor(vH /2) + 180);
  textStrokeSlider.style('width', vW/1.2 +'px');
  textColorSlider.style('display', 'none');
  textSizeSlider.style('display', 'none');
  textStrokeSlider.style('display', 'none');

  textStrokeColorSlider = createSlider(1, 9, 1, 1);
  textStrokeColorSlider.position(50, Math.floor(vH /2) + 110);
  textStrokeColorSlider.style('width', vW/1.2 +'px');
  textStrokeColorSlider.style('display', 'none');


  fakeViewers = new AdBots(botAmount);
}

// ----------- DRAW called every ms? --------------
function draw() {
  clear();

  //console.log("clear");

  //3min
  TIMER++;

  if(TIMER <= 0) {
    noLoop();
    stopGame();
  }

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
  translate(30, Math.floor(vH /2) + 21);
  rect(0, 0, vW - 20, Math.floor(vH /2) - 20);

  
  loadSelectionScreen();
  
  if(TIMER % 60 == 0) {
    checkIfFinished();
  }
}



function loadSelectionScreen() {
  strokeWeight(0);
  textFont('Helvetica');
  textSize(25);
  textAlign(LEFT);
  fill("#80F2F2");

  if(step == 1) {
    //show shapes
    text("Wähle eine Form", 180, 30);

    textSize(18);
    text("ECKEN", 310, 130);
    text("ROTIEREN", 280, 195);
    if(customSticker == null) {
      customSticker = new Sticker(0, vW/2 - 30, -200, starCheckbox.checked());
    }

    if(starCheckbox.checked()) {
      formRadiusSlider.style('display', 'block');
      text("AUSPRÄGUNG", 235, 265);
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

  if(step == 4) {
    text("Wähle eine Schriftfarbe", 100, 30);

    textSize(18);
    text("FARBE", 315, 125);
    text("GRÖSSE", 300, 195);

    customSticker.textColor = colorPalette[textColorSlider.value() - 1];
    customSticker.textSize = textSizeSlider.value() - 1;
  }

  if(step == 5) {
    text("Wähle einen Rand", 100, 30);

    textSize(18);
    text("FARBE", 315, 125);
    text("RANDDICKE", 270, 195);
    customSticker.textStrokeColor = colorPalette[textStrokeColorSlider.value() - 1];
    customSticker.textStroke = textStrokeSlider.value();
  }

  if(step == 6) {
    text("Platziere deinen Sticker", 100, 30);
    customSticker.y = newY;
    customSticker.x = newX;
    if(finalPos) {
      customSticker.scale = 0.1;
    } else customSticker.scale = 0.5;
    translate(- 30, -(Math.floor(vH /2) + 21));
    fill("white");
    rect(30, 30, vW - 60, vH/2 - 40);
    //console.log("bots made stickers: " + botStickers.length);
    botStickers.forEach(s => {
      s.render();
    });
    translate(30, (Math.floor(vH /2) + 21));
  } else {
    customSticker.y = -200;
    customSticker.x = vW/2 - 30;
    customSticker.scale = 1;
  }

  customSticker.render();
  //translate(30, Math.floor(vH /2) + 21);
  textAlign(LEFT);
  textFont('Helvetica');
  fill("#80F2F2");
  polygon(vW - 70, vH/2 - 60, 20, 3);
  textSize(18);
  //text("WEITER", vW - 150, vH/2 - 53);
  text(step + "/6", vW/2 - 20, vH/2 - 53);

  translate(50, vH/2 - 60);
  //text("ZURÜCK", 20, 7);
  rotate(66);
  polygon(0, 0, 20, 3);

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
}

function checkIfFinished() {
  var pixels = get(30, 30, vW - 60, vH/2 - 40);
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
  
  console.log("MANy px are white" + count);

  if(count <= 200) {
    console.log("wall nearly full");
  }
}