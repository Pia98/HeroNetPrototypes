class Bot {

    constructor(cooldownTime, hitFreq, startTime) {
      this.cooldownTime = cooldownTime;
      this.cdTimer = startTime;
      this.hitFreq = hitFreq;
    }
  
    update() {
        this.cdTimer--;
        if(this.cdTimer <= 0) {
            this.cdTimer = this.cooldownTime;
            
            var freq = Math.random() * 10;
            if(freq <= this.hitFreq) {

                if(isIsolated) {
                    for(var i = 0; i< allAds.length; i++) {
                        if(!allAds[i].dead) {
                            allAds[i].botHit();
                            break;
                        }
                    }
                } else {
                    var index = Math.floor(Math.random() * allAds.length);
                
                
                    if(!allAds[index].dead && allAds[index].activationTime >= TIMER) {
                        allAds[index].botHit();
                        
                    } else {
                        for(var i = 0; i< allAds.length; i++) {
                            if(!allAds[i].dead && allAds[i].activationTime >= TIMER) {
                                allAds[i].botHit();
                                break;
                            }
                        }
                    }
                }
                
            }
        }
    }


}