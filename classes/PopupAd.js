class PopupAd {

  constructor(img, x, y, w, h, moving, speedX, speedY, health) {
    this.image = img;
    this.pos = createVector(x, y);
    this.width = w;
    this.height = h;
    this.moving = moving;
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
  }

  render() {
    push();
    if(!this.dead) {
      if(this.moving) {
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
        if(this.pos.y >= 150) {
          this.moveUp = true;
        }
        if (this.pos.y <= -5) {
          this.moveUp = false;
        }
      }

      image(this.image, this.pos.x, this.pos.y, this.width, this.height);

      //health bar
      noStroke();
      fill('#606063');
      rect(this.pos.x, this.pos.y + this.height/1.5, this.hbWidth, 7);
      fill('#80F2F2');
      rect(this.pos.x + 1, this.pos.y + this.height/1.5 + 1, this.hbWidthInner, 5);
      textSize(10);
      text(this.hbText, this.pos.x + this.hbWidth + 5, this.pos.y + this.height/1.5 + 6);
    }
    pop();
  }

  hit() {
    this.health--;
    this.hbWidthInner = this.hbWidthInner - this.hbWidthInner / this.initialHealth;
    
    this.hbText = Math.round(this.health/this.initialHealth * 100) + '%';
    console.log("new text: " + this.hbText);
    if(this.health <= 0) {
      this.dead = true;
    }
  }
}