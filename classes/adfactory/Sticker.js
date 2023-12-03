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


class Sticker {

    constructor(shape, x, y, isStar) {
       this.shape = shape;
       this.x = x;
       this.y = y;
       this.color = "white";
       this.strokeWidth = 0;
       this.strokeColor = "white";
       this.rotation = 0;
       this.w = 280;
       this.h = this.w;
       this.isStar = isStar
       this.text = "";
       this.textColor = "black";
       this.textStyle = "normal";
       this.textSize = 40;
       this.textStroke = 0;
       this.textStrokeColor = "white";
       this.innerRadius = 50;
       this.scale = 1;
    }

    render() {
        push();
        translate(this.x, this.y);
        fill(this.color);
        strokeWeight(this.strokeWidth);
        stroke(this.strokeColor);
        angleMode(DEGREES);
        rotate(this.rotation);
        angleMode(RADIANS);
        scale(this.scale);
        switch(this.shape) {
            case 0: {
                circle(0, 0, this.w);
                break;
            }
            default: {
                if(this.isStar) {
                    star(0, 0, this.w/2, this.w/2 - this.innerRadius, this.shape);
                } else {
                    polygon(0, 0, this.w/2, this.shape);
                }
                break;
            }
        }

        rotate(-this.rotation);
        pop();
        push();
        translate(this.x, this.y);
        textAlign(CENTER, CENTER);
        fill( this.textColor);
        textSize(this.textSize);
        textStyle(this.textStyle);
        stroke(this.textStrokeColor);
        strokeWeight(this.textStroke);
        scale(this.scale);
        textFont('dimensions');
        text(this.text, 0, 0);

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
