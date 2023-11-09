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

  //Draw those enemies
  //always push the moving ads last
  ad2 = new PopupAd(ad2Img, vW/2 + 50, 30, 100, 50, 0.2, 0, 10);
  allAds.push(ad2);
  ad3 = new PopupAd(ad3Img, vW/2 - 100, 100, 100, 50,  0.5, 0, 13);
  allAds.push(ad3);
  ad4 = new PopupAd(ad4Img, vW/2, 130, 75, 93, 0.2, 0, 12);
  allAds.push(ad4);
  ad6 = new PopupAd(ad5Img, vW/2 - 150, 170, 75, 93, 0.4, 0, 12);
  allAds.push(ad6);
  ad7 = new PopupAd(ad6Img, vW/2 + 50, 130, 75, 23, 0, 0.6, 12);
  allAds.push(ad7);
  ad8 = new PopupAd(ad4Img, vW/2 - 200, 50, 60, 75, 2, 1, 12);
  allAds.push(ad8);
  ad9 = new PopupAd(ad8Img, vW - 50, 75, 37, 37, 3, 0, 12);
  allAds.push(ad9);
  ad = new PopupAd(ad1Img, vW/2 - 75, 0, 56, 144, 3, 1, 5);
  allAds.push(ad);
  ad5 = new PopupAd(ad1Img, vW/2 - 75, 50, 39, 100, 1, 3, 5);
  allAds.push(ad5);

  oldMousePosX = mouseX;

  shooter = new Gun(gunImg, laserImg, vW/2 - 50);
}

// ----------- DRAW called every ms? --------------
function draw() {

  clear();

  //karte
  mapImg.resize(vW + 240, 0);
  image(mapImg, 0 - 120, 20);
  
  allAds.forEach((a) => {
    if(a != null) {
      a.render();
  }})

  shooter.render();
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