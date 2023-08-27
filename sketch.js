//DO NOT TOUCH -- just needed for computation bc we want to take all the space we have
const vH = window.innerHeight;
const vW = window.innerWidth;

//GAMEMANGER STUFF
let shot = false;
let plantSparks = false;

//GUN STUFF
let shooter;
const sH = 80;
const sW = 100;
let pX = vW/2 - sW/2;
const gunSpeed = 2;

//ENEMIEES
const amount = 10;
let ads;

//LASER
let laser;
let pos;

let sparks = [];

// ----------- HELPERS --------------
function preload() {
  gunImg = loadImage('assets/img/shooter.png');
  laserImg = loadImage('assets/img/beam.png');
  sparkImg = loadImage('assets/img/spark.png');
  ad1Img = loadImage('assets/img/ad1.png');
  ad2Img = loadImage('assets/img/ad2.png');
}

// ----------- SETUP --------------
function setup() {
  //first define our playground area -> took the whole space which is available
  createCanvas(vW, vH);

  //Draw those enemies
  //ads = new PopupAd(ad1Img, vW/2 - 75, 0, 150, 348);
}

// ----------- DRAW called every ms? --------------
function draw() {

  clear();

  //laserbeam
  if(shot) {
    laser.update();
    laser.render();
    //collided = laser.colliding(ads);
 /*   if(collided) {
      laser.reset();
      shot = false;
      ads.dead = true;
    }*/

    if(laser.pos.y < -200) {
      laser.reset();
      shot = false;
    }
  }

  if(plantSparks) {
    shot = false;
    sparks.forEach(o => {
      o.update();
      o.render();
    });
  }


  //move the gun
  if (keyIsDown(LEFT_ARROW) && pX > 0) {
    pX -= gunSpeed;
  } else if (keyIsDown(RIGHT_ARROW) && pX < (vW - sW)) {
    pX += gunSpeed;
  }
  image(gunImg, pX, (vH - sH + 3), sW, sH);

 /* if(ads != null) {
    ads.render();
  }*/
}

function keyPressed() {
  if (key === ' ' && !shot) {
    laser = new Beam(laserImg,pX);
    shot = true;
  }
  if (key === 'f') {
    plantSparks = true;
    var i = 1;
    var vecs = [
      createVector(1,1),
      createVector(-1,1),
      createVector(1,-1),
      createVector(-1,-1),
      createVector(1,0),
      createVector(0,1),
      createVector(0,-1),
      createVector(-1,0),
    ]
    while(i <= 8) {
      var veloVec = vecs[i-1];
      console.log(veloVec);
      var sizeVec = createVector(10, 10);
      var someVec = laser.pos;
      var spark = new Spark(sparkImg, someVec, veloVec, sizeVec);
      sparks.push(spark);
      i++;
    }
  }
}