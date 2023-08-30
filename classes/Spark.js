class Spark {
    constructor(img, posX, dirVec, r) {
        this.pos = posX;
        this.sizeVec = r;
        this.image = img;
        this.dV = dirVec;
    }

    render() {
        push();
        console.log('RENDER: ' + this.pos.x + ' ' + this.dV.x);
        image(this.image, this.pos.x, this.pos.y, this.sizeVec.x, this.sizeVec.y);
        pop();
    }

    update() {
        console.log('UPDATE: ' + this.pos.x + ' ' + this.dV.x);
       this.pos.x =  this.pos.x + this.dV.x;
       this.pos.y += this.dV.y;
    }
}