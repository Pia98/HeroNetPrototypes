class Spark {
    constructor(img, posX, dirVec, r) {
        this.pos = posX;
        this.sizeVec = r;
        this.image = img;
        this.dV = dirVec;
    }

    render() {
        push();
        image(this.image, this.pos.x, this.pos.y, this.sizeVec.x, this.sizeVec.y);
        pop();
    }

    update() {
       this.pos.x -= this.dV.x;
       this.pos.y -= this.dV.y;
       this.sizeVec.x += 2;
       this.sizeVec.y += 2;
    }
}