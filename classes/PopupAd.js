class PopupAd {

  constructor(img, x, y, w, h, health, activationTime) {
    this.image = img;
    this.pos = createVector(x, y);
    this.width = w*1.3;
    this.height = h*1.3;
    this.dead = false;
    this.moveRight = false;
    this.moveUp = false;

    this.speedX = Math.random();
    this.speedY = Math.random();

    this.activationTime = activationTime;
    this.movingDefault = Math.floor((Math.random() * 10)) <= 5;
    this.moving = this.movingDefault;

    this.isGrowing = false;
    //if(!this.moving) this.isGrowing = Math.floor((Math.random() * 10)) <= 3;
    
    if(this.isGrowing) {
      this.width = w *0.75;
      this.height = h*0.75;
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


    this.explCirclerad = 0;

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
        if(this.isGrowing && this.width < vW) {
          this.width *= 1.00075;
          this.height *= 1.00075;
        }
         image(this.image, 0, 0, this.width, this.height);
      }

      this.renderHealthBar()
    } else this.renderDeathAnimation();
    pop();
  }

  hit() {
    this.health--;
    
    this.hbText = Math.round(this.health);
    
    this.hitAnimation = true;

    if(this.health <= 0) {
      this.dead = true;
    }
  }

  botHit() {
    this.health--;
    this.hbText = Math.round(this.health);
    
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

          if(this.width >= 20) {
            this.width *= 0.997;
            this.height *= 0.997;
          }
          image(this.image, 0 + this.jitter, 0, this.width, this.height);
          this.animTimer --;
        } else {
          
          this.hitAnimation = false;
          this.animTimer = 50;
          this.moving = this.movingDefault;
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
          this.moving = this.movingDefault;
        }
  }

  renderDeathAnimation() {
    
    this.explCirclerad += 6;

    const c = color("#F2328B");
    c.setAlpha(50);
    fill(c);
    stroke("#F2328B");
    strokeWeight(2);
    if(this.explCirclerad <= 200) {
      this.width *= 0.75;
      this.height *= 0.75;
      image(this.image, this.pos.x, this.pos.y, this.width, this.height);
      circle(this.pos.x, this.pos.y, this.explCirclerad);
    }
  }

}