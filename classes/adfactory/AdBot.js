class AdBot {

    constructor(creationTime) {
      this.creationTime = creationTime;
      this.madeSticker = false;
    }
  
    update() {
        this.creationTime --;
    }


}