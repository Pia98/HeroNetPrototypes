// ----------- Shape Helpers --------------
function polygon(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius;
        let sy = y + sin(a) * radius;
        vertex(sx, sy);
    }
    endShape(CLOSE);
    }

function star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}


class Shape {

    constructor(shape, x, y) {
       this.shape = shape;
       this.x = x;
       this.y = y;
       this.color = "white";
       this.w = 70;
       this.h = this.w;
    }

    render() {
        console.log("render shape: " +this.shape)
        push();
        fill(this.color);
        switch(this.shape) {
            case "rect": { 
                console.log("switch rect " +this.shape)
                rect(this.x, this.y, this.w, this.h);
                break;
            }
            case "circle": {
                console.log("switch circle " +this.shape)
                circle(this.x, this.y, this.w);
                break;
            }
            case "star": {
                console.log("switch star " +this.shape)
                star(this.x, this.y, this.w/2, this.w/2 - 12, 5);
                break;
            }
            case "poly": {
                polygon(this.x, this.y, this.w/2, 3);
                break;
            }
            default: {
                rect(this.x, this.y, this.w, this.h);
                break;
            }
        }
        pop();
    }

    update() {
       
    }

    reset() {
        
    }

    clicked() {
        var d = dist(mouseX, mouseY, this.x, this.y);
        if (d < this.w/2) {
          return true;
        }
    }
}