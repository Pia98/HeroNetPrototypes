//DO NOT TOUCH -- just needed for computation bc we want to take all the space we have
const vH = window.innerHeight;
const vW = window.innerWidth;

//GAMEMANGER STUFF
let shot = false;

//GUN STUFF
let shooter;
const sH = 80;
const sW = 100;
let pX = vW/2 - sW/2;
const gunSpeed = 5;

//ENEMIEES
const amount = 10;
let allAds = [];

//LASER
let laser;
let pos;

var oldMousePosX;

// ----------- HELPERS --------------
function preload() {
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
  ad2 = new PopupAd(ad2Img, vW/2 + 50, 30, 100, 50, false, 3, 1, 10);
  allAds.push(ad2);
  ad3 = new PopupAd(ad3Img, vW/2 - 100, 100, 100, 50, false, 3, 1, 13);
  allAds.push(ad3);
  ad4 = new PopupAd(ad4Img, vW/2, 130, 100, 125, false, 3, 1, 12);
  allAds.push(ad4);
  ad6 = new PopupAd(ad5Img, vW/2 - 150, 150, 100, 125, false, 3, 1, 12);
  allAds.push(ad6);
  ad7 = new PopupAd(ad6Img, vW/2 + 100, 130, 100, 30, false, 3, 1, 12);
  allAds.push(ad7);
  ad8 = new PopupAd(ad4Img, vW/2 - 200, 50, 80, 100, false, 3, 1, 12);
  allAds.push(ad8);
  ad9 = new PopupAd(ad8Img, vW - 50, 75, 50, 50, true, 3, 0, 12);
  allAds.push(ad9);
  ad = new PopupAd(ad1Img, vW/2 - 75, 0, 75, 192, true, 3, 1, 5);
  allAds.push(ad);
  ad5 = new PopupAd(ad1Img, vW/2 - 75, 50, 52, 134, true, 1, 3, 5);
  allAds.push(ad5);

  oldMousePosX = mouseX;
}

// ----------- DRAW called every ms? --------------
function draw() {

  clear();

  //laserbeam
  if(shot) {
    laser.update();
    laser.render();
    allAds.forEach((a, index) => {
      collided = laser.colliding(a);
      if(collided) {
        laser.reset();
        shot = false;
        a.hit();
        if(a.dead) {
          delete allAds[index];
        }
      }
    })

    if(laser.pos.y < -200) {
      laser.reset();
      shot = false;
    }
  }


  //move the gun
  if (keyIsDown(LEFT_ARROW) && pX > 0) {
    pX -= gunSpeed;
  } else if (keyIsDown(RIGHT_ARROW) && pX < (vW - sW)) {
    pX += gunSpeed;
  }
  image(gunImg, pX, (vH - sH + 3), sW, sH);
  allAds.forEach((a) => {
  if(a != null) {
    a.render();
  }})
}

// ----------- Move the Laser Controls --------------
function mousePressed() {
  //press inside Laser:
    if(mouseX <= (pX + sW/2 + 10) && mouseX >= (pX - sW/2 - 10) && mouseY <= vH && mouseY >= (vH - sH - 10) ) {
      if (!shot) {
        laser = new Beam(laserImg,pX);
        shot = true;
      }
    }
}

function mouseDragged() {
  //press inside Laser:
  if(mouseY <= vH && mouseY >= (vH - sH - 15) ) {
    if(oldMousePosX < mouseX && pX < (vW - sW)) {
      //console.log("dragright: " + oldMousePosX + " " + mouseX);
      pX += gunSpeed;
    } else if(oldMousePosX > mouseX && pX > 0) {
      //console.log("dragright: " + oldMousePosX + " " + mouseX);
      pX -= gunSpeed;
    }
    oldMousePosX = mouseX
  }
}