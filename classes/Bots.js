class Bots {

    constructor(amount, cd) {
        this.amount = amount;
        this.bots = [];

        for(var i = 0; i <= amount; i++) {
            let b = new Bot(cd, 7, Math.floor(Math.random() * cd));
            this.bots.push(b);
        }
    }
  
    update() {
        this.bots.forEach(b => {
            b.update();
        });
    }
}