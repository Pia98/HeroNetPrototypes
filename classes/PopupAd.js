class PopupAd {
  constructor(img, x, y, w, h, moving, speedX, speedY) {
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
        image(this.image, this.pos.x, this.pos.y, this.width, this.height);

        if(this.pos.x >= window.innerWidth - 75) {
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
      } else image(this.image, this.pos.x, this.pos.y, this.width, this.height);
    }
    pop();
  }
}