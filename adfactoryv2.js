const DEBUG = true;

//DO NOT TOUCH -- just needed for computation bc we want to take all the space we have
const vH = window.innerHeight;
const vW = window.innerWidth;

//CONFIG
let defaultTime = 5400;
let TIMER;
var fakeViewers;
var botAmount = 2000;
var botStickers = [];
var stickerScale = 0.15;

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
  // mapImg = loadImage('assets/img/karte.png');
  // gunImg = loadImage('assets/img/shooter.png');
  // laserImg = loadImage('assets/img/beam.png');
}

// ----------- SETUP --------------
function setup() {

  joinBtn = createButton('TEILNEHMEN');
  joinBtn.position(vW/2 - 60, vH /2 + 100);

  // Change the button's value when the mouse
  // is pressed.
  joinBtn.mousePressed(() => {
    step = 1;
    joinBtn.style('display', 'none');
  });

  // joinBtnAgain = createButton('NOCHMAL TEILNEHMEN');
  // joinBtnAgain.position(vW/2 - 95, vH /2 + 100);
  // joinBtnAgain.style('display', 'none');

  // // Change the button's value when the mouse
  // // is pressed.
  // joinBtnAgain.mousePressed(() => {
  //   step = 1;
  //   joinBtnAgain.style('display', 'none');

  //   var tmp = customSticker;
  //   tmp.y = tmp.y +  Math.floor(vH /2) + 21;
    
  //   botStickers.push(tmp);
  //   customSticker = null;
  //   finalPos = false;
  //   newX = vW/2;
  //   newY = 180;
  // });

  //console.log("setup");
  //first define our playground area -> took the whole space which is available
  setAttributes('antialias', true);
  setAttributes('willReadFrequently', true);
  createCanvas(vW, vH);
  frameRate(30);
  TIMER = 0;

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

  // if(step == 1 && finalPos && !wallFull){
  //   joinBtnAgain.style('display', 'block');
  // } else {
  //   joinBtnAgain.style('display', 'none');
  // }
  if(wallFull) {
    joinBtn.style('display', 'none');
  }
}



function loadSelectionScreen() {

  if(customSticker == null) {
    customSticker = new Sticker(Math.floor(Math.random() * 28 + 2), Math.floor(Math.random() * (vW - 60) + 30), Math.floor(Math.random() * (vH/2 - 40) + 30), Math.random() < 0.5);
    customSticker.scale = stickerScale;
    customSticker.color = colorPalette[Math.floor(Math.random() * 9)];
    customSticker.strokeColor = colorPalette[Math.floor(Math.random() * 9)];
    customSticker.textColor = colorPalette[Math.floor(Math.random() * 9)];
    customSticker.textStrokeColor = colorPalette[Math.floor(Math.random() * 9)];
    customSticker.text = textPalette[Math.floor(Math.random() * 6)];
    customSticker.strokeWidth = Math.floor(Math.random() * 30);
    customSticker.textStroke = Math.floor(Math.random() * 30);
    customSticker.textSize = Math.floor(Math.random() * 180 + 20);
  }
  
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

  
  botStickers.forEach((s, index) => {
    // console.log("-------------- " + index);
    // console.log("x: " + s.x);
    // console.log("y: " + s.y);
    s.render();
  });
 
  if(wallFull) {
    translate(translateX, - endTransform);
  } else {
    translate(translateX, (translateY));
  }

  fill("#80F2F2");
  textAlign(RIGHT, CENTER);
  

  var translateX = 30;
  var translateY = Math.floor(vH /2) + 21;
  if(step ==1) {
    if(!finalPos) { 
      text("Platziere deinen Sticker", vW - 20, 30);
    }
    //translate(- translateX, -(translateY));
    customSticker.x = newX;
    if(wallFull && finalPos) {
      newY = newY - 20;
    }
    customSticker.y = newY;
    
  }
  if(step != 0) {
    if(!wallFull || finalPos) {
      // console.log("-------------- custom");
      // console.log("x: " + customSticker.x);
      // console.log("y: " + customSticker.y);
      customSticker.render();
    }
  
    //translate(30, Math.floor(vH /2) + 21);
    // textAlign(LEFT);
    // textFont('Helvetica');
    // fill("#80F2F2");
    // polygon(vW - 40, vH/2 - 60, 20, 3);
    // textSize(18);
    // //text("WEITER", vW - 150, vH/2 - 53);
    // text(step + "/6", vW/2 - 20, vH/2 - 53);

    // translate(50, vH/2 - 60);
    // //text("ZURÜCK", 20, 7);
    // rotate(66);
    // polygon(0, 0, 20, 3);
  }

  if(finalPos && step == 1) {
    customSticker.scale = stickerScale;
    
    var tmp = customSticker;
    tmp.y = tmp.y +  Math.floor(vH /2) + 21;
    
    botStickers.push(tmp);
    customSticker = null;
    finalPos = false;
    newX = vW/2;
    newY = 180;
  } else customSticker.scale = 0.5;
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
  if (step == 1 && lockedToMouse && !finalPos) {
    newX = mouseX - xOffset;
    newY = mouseY - yOffset;
  }
}

function mouseReleased() {
  lockedToMouse = false;
  //check if sticker is in rect

  if(step == 1) {
    if(newX > 0 &&
      newX < vW - 60 &&
      newY > (-(Math.floor(vH /2) + 21) + 30) &&
      newY < -30 ) {
        finalPos = true;
    } else {
      newX = vW/2;
      newY = 180;
    }
  }
}

function mouseClicked() {
  



}

function stopGame() {
  //console.log("Time is up!");
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
    var ugfShapePx = Math.PI *35*35 * stickerScale/1.2;
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