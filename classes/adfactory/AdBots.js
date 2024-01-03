class AdBots {

    constructor(amount) {
        this.amount = amount;
        this.bots = [];

        for(var i = 0; i <= amount; i++) {
            let b = new AdBot(Math.floor(Math.random() * defaultTime));
            this.bots.push(b);
        }
    }
  
    update() {
        this.bots.forEach(b => {
            b.update();

            if(b.creationTime <= 0 && !(b.madeSticker) && !wallFull) {
                //console.log("bot created sticker");
                var botAd = new Sticker(Math.floor(Math.random() * 28 + 2), Math.floor(Math.random() * (vW - 60) + 30), Math.floor(Math.random() * (vH/2 - 40) + 30), Math.random() < 0.5);
                botAd.scale = stickerScale;
                botAd.color = colorPalette[Math.floor(Math.random() * 9)];
                botAd.strokeColor = colorPalette[Math.floor(Math.random() * 9)];
                botAd.textColor = colorPalette[Math.floor(Math.random() * 9)];
                botAd.textStrokeColor = colorPalette[Math.floor(Math.random() * 9)];
                botAd.text = textPalette[Math.floor(Math.random() * 6)];
                botAd.strokeWidth = Math.floor(Math.random() * 30);
                botAd.textStroke = Math.floor(Math.random() * 30);
                botAd.textSize = Math.floor(Math.random() * 180 + 20);

                botStickers.push(botAd);
                b.madeSticker = true;
            }
        });
    }
}