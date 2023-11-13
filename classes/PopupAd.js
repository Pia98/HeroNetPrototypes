class PopupAd {

  constructor(img, x, y, w, h, speedX, speedY, moving, health, activationTime) {
    this.image = img;
    this.pos = createVector(x, y);
    this.width = w*1.3;
    this.height = h*1.3;
    this.dead = false;
    this.moveRight = false;
    this.moveUp = false;

    if(speedX >= 5) {
      this.speedX = speedX/10;
    } else {
      this.speedX = 0;
      this.isGrowing = true;
    }

    if(speedY >= 5) {
      this.speedY = speedY/10;
    } else {
      this.speedY = 0;
      this.isGrowing = true;
    }

    this.activationTime = activationTime;
    this.moving = moving;
    
    if(this.isGrowing) {
      this.width = w;
      this.height = h;
    }
    
    
    this.initialHealth = health;
    this.health = health;
    this.hbWidthInner = this.width *0.9 -2;
    this.hbText = 100 + '%';

    this.hitAnimation = false;
    this.animTimer = 50;
    this.jitter = 0;
    this.jitterLeft = false;

    this.botHitAnim = false;
    this.animBotTimer = 24;
    this.imgResize = w + 1;

  }

  render() {
    push();
    if(!this.dead) {
      if(this.moving) this.renderMovement()
      

      translate(this.pos.x, this.pos.y);
      if(this.hitAnimation) {
        this.renderHitAnim();
        
      } else if(this.botHitAnim){
        this.renderBotHit();
      } else{
        if(this.isGrowing && this.height < 450) {
          this.width *= 1.00075;
          this.height *= 1.00075;
        }
         image(this.image, 0, 0, this.width, this.height);
      }

      this.renderHealthBar()
    }
    pop();
  }

  hit() {
    this.health--;
    
    this.hbText = Math.round(this.health/this.initialHealth * 100) + '%';
    
    this.hitAnimation = true;

    if(this.health <= 0) {
      this.dead = true;
    }
  }

  botHit() {
    this.health--;
    this.hbText = Math.round(this.health/this.initialHealth * 100) + '%';
    
    //this.botHitAnim = true;

    if(this.health <= 0) {
      this.dead = true;
    }
  }

  renderHealthBar() {
    //health bar
    noStroke();
    fill('#606063');
    rect(0, 0 + this.height/1.5, this.width* 0.9, 7);
    fill('#3dfcb3');
    rect(0 + 1, 0 + this.height/1.5 + 1, (this.width*0.9 - 2) * (this.health/this.initialHealth), 5);
    textSize(10);
    text(this.hbText, 0 + this.width* 0.9 + 5, 0 + this.height/1.5 + 6);
  }

  renderMovement() {
    if(this.moveRight) {
      this.pos.x = this.pos.x + this.speedX;
    } else {
      this.pos.x = this.pos.x - this.speedX;
    }

    if(this.moveUp) {
      this.pos.y = this.pos.y - this.speedY;
    } else {
      this.pos.y = this.pos.y + this.speedY;
    }

    if(this.pos.x >= window.innerWidth - this.width) {
      this.moveRight = false;
    }
    if ( this.pos.x <= 0) {
      this.moveRight = true;
    }
    if(this.pos.y >= 300) {
      this.moveUp = true;
    }
    if (this.pos.y <= -5) {
      this.moveUp = false;
    }
  }

  renderHitAnim(){
    this.moving = false;
        if (this.animTimer > 0 ) {
          
          if(this.jitterLeft) {
            this.jitter -= 1.5;
          } else this.jitter += 1.5;

          if(this.jitter < -4) {
            this.jitterLeft = false;
          }
          if(this.jitter > 4) {
            this.jitterLeft = true;
          }

          this.width *= 0.997;
          this.height *= 0.997;
          image(this.image, 0 + this.jitter, 0, this.width, this.height);
          this.animTimer --;
        } else {
          
          this.hitAnimation = false;
          this.animTimer = 50;
          this.moving = true;
        }
  }

  renderBotHit(){
    this.moving = false;
        if (this.animBotTimer > 0 ) {
          
          if(this.animBotTimer >= 12) {
            this.width *= 1.01;
            this.height *= 1.01;
          } else {
            this.width *= 0.9885;
            this.height *= 0.9885;
          }

          console.log(this.imgResize);
          // this.image.resize(this.w + 20, this.h + 20);
           image(this.image, 0, 0, this.width, this.height);
          this.animBotTimer--;
        } else {
          this.botHitAnim = false;
          this.animBotTimer = 24;
          this.moving = true;
        }
  }

}