class PopupAd {
  constructor(img, x, y, w, h) {
    this.image = img;
    this.pos = createVector(x, y);
    this.width = w;
    this.height = h;
    this.dead = false;
  }

  render() {
    push();
    if(!this.dead) {
      image(this.image, this.pos.x, this.pos.y, this.width, this.height);
    }
    pop();
  }
}