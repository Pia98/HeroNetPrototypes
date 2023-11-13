const DEBUG = true;

//DO NOT TOUCH -- just needed for computation bc we want to take all the space we have
const vH = window.innerHeight;
const vW = window.innerWidth;

//GAMEMANGER STUFF
let shot = false;

//GUN STUFF
let shooter;


//ENEMIEES
const amount = 10;
let allAds = [];

//LASER
let pos;

var oldMousePosX;

//CONFIG
let defaultTime = 7200;
let TIMER;
var fakeViewers;
var botAmount = 1;
var cooldownTimeBots = 20;
var adHealth = 20;
var amountAds = 34;

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
  //first define our playground area -> took the whole space which is available
  createCanvas(vW, vH);
  frameRate(60);
  TIMER = defaultTime;

  //+1 bc of user
  adHealth = 100;//Math.floor((((TIMER - 100) / cooldownTimeBots) * (botAmount*2)) / (amountAds*19));

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

  for(var i = 0; i <= amountAds; i++) {
    var index = Math.floor(Math.random() * (adImgs.length -1));
    
    var tmpImg = adImgs[index];
    var ad = new PopupAd(tmpImg,
      vW/2 + ((Math.random() * 190) - (Math.random() * 190)),
      (Math.random() * 200) + 50,
      tmpImg.width / 6,
      tmpImg.height / 6,
      Math.floor((Math.random() * 10)),
      Math.floor((Math.random() * 10)),
      Math.floor((Math.random() * 10)) <= 5,
      adHealth,
      defaultTime - i*200);
    
    console.log(ad.activationTime + " " +  ad.moving);
    allAds.push(ad);
  }


  oldMousePosX = mouseX;

  shooter = new Gun(gunImg, laserImg, vW/2 - 50);

  fakeViewers = new Bots(botAmount, cooldownTimeBots);
}

// ----------- DRAW called every ms? --------------
function draw() {
  clear();

  //3min
  TIMER--;

  if(TIMER <= 0) {
    noLoop();
    stopGame();
    
  }

  if(TIMER == Math.floor(defaultTime*0.7)) {
    ad5 = new PopupAd(ad1Img, vW/2 - 75, 50, 39, 100, 1, 3, adHealth);
    allAds.push(ad5);
  }
  

  //karte
  mapImg.resize(vW + 240, 0);
  image(mapImg, 0 - 120, 20);
  
  allAds.forEach((a) => {
    if(a != null && a.activationTime >= TIMER) {
      a.render();
  }})

  shooter.render();
  fakeViewers.update();

  if(DEBUG) {
    fill('white');
    textSize(10);
    text((Math.round(TIMER)).toString() + "s", 10, this.innerHeight - 60);
    text("BOT AMOUNT: " + (botAmount).toString(), 10, this.innerHeight - 50);
    text("BOT cooldown: " + (cooldownTimeBots).toString(), 10, this.innerHeight - 40);
    text("AD amount: " + (amountAds).toString(), 10, this.innerHeight - 30);
    text("AD health: " + (adHealth).toString(), 10, this.innerHeight - 20);
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
  console.log("Time is up!");
}