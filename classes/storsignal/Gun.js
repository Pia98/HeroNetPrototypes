class Gun {

    constructor(img,beamImg, posX) {
        this.speed = 8;
        this.w = 100;
        this.h = 80;
        this.image = img;
        this.beamImg = beamImg;

        this.defaultY = vH - this.h -50;
        this.pos = createVector(posX + 30, this.defaultY);

        this.cdTime = 10;
        this.cooldown = 0;
        this.laserBeams = [];
    }

    render() {
        push();
        image(this.image, this.pos.x, this.pos.y, this.w, this.h);

        //laserbeam
        this.laserBeams.forEach((b, ind) => {
           b.update();
           b.render();
           if(isIsolated) {
            userAds.forEach((a, index) => {
                var collided = false;
                if(a.dead) { collided = false;}
                else collided = b.colliding(a);
                if(collided) {
                    delete this.laserBeams[ind];
                    
                    a.hit();
                    if(a.dead) {
                        //delete allAds[index];
                        
                    }
                }
            })
           } else {
            allAds.forEach((a, index) => {
                var collided = false;
                if(a.dead || a.activationTime <= TIMER) { collided = false; }
                else collided = b.colliding(a);
                if(collided) {
                    delete this.laserBeams[ind];
                    
                    a.hit();
                    if(a.dead) {
                        //delete allAds[index];
                        
                    }
                }
            })
           }

            
            if(b.pos.y < -200) {
                delete this.laserBeams[ind];
            }
        })

         //move the gun
         // can be deleted later just for debug purpose

        if(DEBUG) {
            if (keyIsDown(LEFT_ARROW) && this.pos.x > 0) {
                this.pos.x -= this.speed;
            } else if (keyIsDown(RIGHT_ARROW) && this.pos.x < (vW - this.w)) {
                this.pos.x += this.speed;
            }
        }
        
        
        if(this.cooldown > 0) {
            this.cooldown--;
        }

        pop();
    }

    update() {
        this.pos.y -= this.speed;
    }

    reset() {
        this.pos.y = this.defaultY;
    }

    moveGun(oldMousePos) {
        if(this.pos.x < mouseX && this.pos.x < (vW - this.w)) {
            //console.log("dragright: " + oldMousePosX + " " + mouseX);
            if(this.pos.x != mouseX){
                this.pos.x += this.speed;
            }
            
          } else if(this.pos.x > mouseX && this.pos.x > 0) {
            //console.log("dragright: " + oldMousePosX + " " + mouseX);
            if(this.pos.x != mouseX){
                this.pos.x -= this.speed;
            }
            
          }
    }

    shootGun() {
        if(this.cooldown <= 0) {
            if(mouseX <= (this.pos.x + this.w/2 + 10) && mouseX >= (this.pos.x - this.w/2 - 10) && mouseY <= vH && mouseY >= (vH - this.h - 10) ) {
                this.laserBeams.push(new Beam(laserImg, this.pos.x));
                this.cooldown = this.cdTime;
            }
        }
    }

}