class Beam {

    constructor(img, posX) {
        this.defaultY = window.innerHeight - 70;
        this.pos = createVector(posX + 30, this.defaultY);
        this.speed = 10;
        this.w = 40;
        this.h = 200;
        this.r = 3;
        this.image = img

    }

    render() {
        push();
        image(this.image, this.pos.x, this.pos.y, this.w, this.h);

        pop();
    }

    update() {
        this.pos.y -= this.speed;
    }

    reset() {
        this.pos.y = this.defaultY;
    }

    colliding(ad) {
        if (this.pos.x + this.r < ad.pos.x - ad.width / 2) {
            return false;
        } else if (this.pos.x - this.r > ad.pos.x + ad.width / 2) {
            return false;
        } else if (this.pos.y + this.r < ad.pos.y - ad.height / 2) {
            return false;
        } else if (this.pos.y - this.r > ad.pos.y + ad.height / 2) {
            return false;
        } else {
            return true;
        }
    }
}