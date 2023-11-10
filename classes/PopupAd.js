class PopupAd {

  constructor(img, x, y, w, h, speedX, speedY, health) {
    this.image = img;
    this.pos = createVector(x, y);
    this.width = w;
    this.height = h;
    this.moving = true;
    this.dead = false;
    this.moveRight = false;
    this.moveUp = false;
    this.speedX = speedX;
    this.speedY = speedY;
    
    this.initialHealth = health;
    this.health = health;
    this.hbWidth = w - 20;
    this.hbWidthInner = w - 20 -2;
    this.hbText = 100 + '%';

    this.hitAnimation = false;
    this.animTimer = 50;
    this.jitter = 0;
    this.jitterLeft = false;
  }

  render() {
    push();
    if(!this.dead) {
      if(this.moving) {
        this.renderMovement()
      }

      translate(this.pos.x, this.pos.y);
      if(this.hitAnimation) {
        this.renderHitAnim();
        
      } else image(this.image, 0, 0, this.width, this.height);

      this.renderHealthBar()
    }
    pop();
  }

  hit() {
    this.health--;
    this.hbWidthInner = this.hbWidthInner - this.hbWidthInner / this.initialHealth;
    
    this.hbText = Math.round(this.health/this.initialHealth * 100) + '%';
    
    this.hitAnimation = true;

    if(this.health <= 0) {
      this.dead = true;
    }
  }

  botHit() {
    this.health--;
    this.hbWidthInner = this.hbWidthInner - this.hbWidthInner / this.initialHealth;
    
    this.hbText = Math.round(this.health/this.initialHealth * 100) + '%';
    
    //this.hitAnimation = true;

    if(this.health <= 0) {
      this.dead = true;
    }
  }

  renderHealthBar() {
    //health bar
    noStroke();
    fill('#606063');
    rect(0, 0 + this.height/1.5, this.hbWidth, 7);
    fill('#80F2F2');
    rect(0 + 1, 0 + this.height/1.5 + 1, this.hbWidthInner, 5);
    textSize(10);
    text(this.hbText, 0 + this.hbWidth + 5, 0 + this.height/1.5 + 6);
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

          image(this.image, 0 + this.jitter, 0, this.width, this.height);
          this.animTimer --;
        } else {
          this.hitAnimation = false;
          this.animTimer = 50;
          this.moving = true;
        }
  }

}