const DEBUG = false;
var step = 0;
//DO NOT TOUCH -- just needed for computation bc we want to take all the space we have
const vH = window.innerHeight;
const vW = window.innerWidth;

const isIsolated = false;
//GAMEMANGER STUFF
let shot = false;

//GUN STUFF
let shooter;


//ENEMIEES
const amount = 10;
let allAds = [];
let userAds = [];

//LASER
let pos;

var oldMousePosX;

//CONFIG
let defaultTime = 3600;
let TIMER;
var fakeViewers;
var botAmount = 99;
var cooldownTimeBots = 30;
var maxHealth = 500;
var amountAds = 50;

// ----------- HELPERS --------------
function preload() {
  mapImg = loadImage('assets/img/karte.png');
  gunImg = loadImage('assets/img/shooter.png');
  laserImg = loadImage('assets/img/beam.png');
  ad1Img = loadImage('assets/img/ad1.png');
  ad2Img = loadImage('assets/img/ad2.png');
  ad3Img = loadImage('assets/img/ad3.png');
  ad4Img = loadImage('assets/img/ad4.png');
  ad5Img = loadImage('assets/img/ad5.png');
  ad6Img = loadImage('assets/img/ad6.png');
  ad7Img = loadImage('assets/img/ad7.png');
  ad8Img = loadImage('assets/img/ad8.png');
}

// ----------- SETUP --------------
function setup() {
  setAttributes('antialias', true);
  setAttributes('willReadFrequently', true);
  //first define our playground area -> took the whole space which is available
  createCanvas(vW, vH);
  frameRate(30);
  TIMER = defaultTime;

  //+1 bc of user
   maxHealth = Math.floor((((defaultTime - 100) / cooldownTimeBots) * (botAmount/2)) / (amountAds));
   console.log(maxHealth);


  if(botAmount == 0) {
    maxHealth = 10;
  }
  //Draw those enemies
  //always push the moving ads last

  var adImgs = [];
  adImgs.push(ad1Img);
  adImgs.push(ad2Img);
  adImgs.push(ad3Img);
  adImgs.push(ad4Img);
  adImgs.push(ad5Img);
  adImgs.push(ad6Img);
  adImgs.push(ad7Img);
  adImgs.push(ad8Img);

  for(var i = 0; i < amountAds; i++) {
    var index = Math.floor(Math.random() * (adImgs.length -1));
    
    var tmpImg = adImgs[index];

    var launch = Math.floor(Math.random() * (defaultTime - 2000) + 2000);
    if(i < 11 ) {
      launch = defaultTime;
    }
    var ad = new PopupAd(tmpImg,
      vW/2 + ((Math.random() * 190) - (Math.random() * 190)),
      (Math.random() * 200) + 50,
      tmpImg.width / 6,
      tmpImg.height / 6,
      Math.floor(Math.random() * (maxHealth)) + 1,
      launch);
    allAds.push(ad);
    //console.log(ad.activationTime + " " +  ad.moving);
  }

  console.log(allAds.length);

  oldMousePosX = mouseX;

  shooter = new Gun(gunImg, laserImg, vW/2 - 50);

  fakeViewers = new Bots(botAmount, cooldownTimeBots);

  joinBtn = createButton('TEILNEHMEN');
  joinBtn.position(vW/2 - 60, vH /2 + 100);

  // Change the button's value when the mouse
  // is pressed.
  joinBtn.mousePressed(() => {
    step = 1;
    joinBtn.style('display', 'none');
  });

  joinBtnAgain = createButton('NOCHMAL TEILNEHMEN');
  joinBtnAgain.position(vW/2 - 95, vH /2 + 100);
  joinBtnAgain.style('display', 'none');

  // Change the button's value when the mouse
  // is pressed.
  joinBtnAgain.mousePressed(() => {
    step = 1;
    joinBtnAgain.style('display', 'none');
    
  });
}

// ----------- DRAW called every ms? --------------
function draw() {
  clear();
  textFont('Helvetica');
  //3min
  TIMER--;

  if(TIMER <= 0) {
    noLoop();
    stopGame();
    
  }


  //karte
  mapImg.resize(vW + 240, 0);
  image(mapImg, 0 - 120, 20);
  

  var deadAds = 0;

  allAds.forEach((a) => {
    if(a != null && a.activationTime >= TIMER) {
      a.render();
    }
    if(a.dead) deadAds++;
  });

  if(step == 1) {
    shooter.render();
  }
  fakeViewers.update();

  if(step == 0 && deadAds != amountAds) {
    textFont('Helvetica');
    textSize(10);
    textAlign(CENTER, BOTTOM);
    text("Mit dir bekämpfen " + botAmount + " Zuschauer die " + amountAds + " Ads!", vW/2, vH /2 + 70);
    text("Mache jetzt mit!", vW/2, vH /2 + 80);
  }

  fill('#80F2F2');
  textSize(30);
  textAlign(LEFT, BOTTOM);
  //textFont('dimensions');
  text((Math.round(TIMER / 30)).toString() + "s", 10, this.innerHeight - 5);
  textAlign(RIGHT, BOTTOM);
  //textFont('dimensions');
  text(deadAds + "/" + amountAds, this.innerWidth - 10, this.innerHeight - 5);

  if(DEBUG) {
    textFont('Helvetica');
    fill('white');
    textSize(10);
    text("BOT AMOUNT: " + (botAmount).toString(), 10, this.innerHeight - 50);
    text("BOT cooldown: " + (cooldownTimeBots).toString(), 10, this.innerHeight - 40);
    text("AD amount: " + (amountAds).toString(), 10, this.innerHeight - 30);
    text("max. AD health: " + (maxHealth).toString(), 10, this.innerHeight - 20);
  }
  

  if(deadAds == amountAds) {
     
    //console.log("Time is up!");
    textAlign(CENTER, CENTER);
    textSize(60);
    textFont('dimensions');
    fill("#80F2F2");
    text("Yay!", vW/2, vH/2);
    text("Ihr habt es geschafft", vW/2, vH/2 + 70);
    joinBtnAgain.style('display', 'none');
    joinBtn.style('display', 'none');
    //noLoop();
  }
}

// ----------- Move the Laser Controls --------------
function mousePressed() {
  //press inside Laser:
   shooter.shootGun();
}

function mouseDragged() {

  //press inside Laser:
  if(mouseY <= vH && mouseY >= (vH - shooter.h - 15) ) {
    shooter.moveGun(oldMousePosX);
    oldMousePosX = mouseX;
  }
}

function stopGame() {
  
  //console.log("Time is up!");
  textAlign(CENTER, CENTER);
  textSize(60);
  textFont('dimensions');
  fill("#80F2F2");
  text("Zeit abgelaufen", vW/2, vH/2 + 140);
}