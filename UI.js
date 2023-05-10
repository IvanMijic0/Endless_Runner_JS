export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = "Helvetica";
        this.livesImage = document.getElementById("lives");
    }
    draw = (ctx) => {
        ctx.save();
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = "grey";
        ctx.shadowBlur = 1;
        ctx.font = this.fontSize.toString().concat("px ").concat(this.fontFamily);
        ctx.textAlign = "left";
        ctx.fillStyle = this.game.fontColor;
        // Score
        ctx.fillText(
          "Score: ".concat(this.game.score),
          20,
          50
        );
        // Timer
        ctx.font = (this.fontSize * .8).toString().concat("px ").concat(this.fontFamily);
        ctx.fillText(
            "Time: ".concat((this.game.time * .001).toFixed(1).toString()),
            20,
            80
        );
        // Lives
        for (let i = 0; i < this.game.lives; i++) {
            ctx.drawImage(
                this.livesImage,
                25 * i + 20,
                95,
                25,
                25
            );
        }
        // Game Over
        if (this.game.gameOver) {
            ctx.textAlign = "center";
            ctx.font = (this.fontSize * 2).toString().concat("px ").concat(this.fontFamily);
            if (this.game.score >= this.game.winningScore) {
                ctx.fillText(
                    "Pff",
                    this.game.width * .5,
                    this.game.height * .5 - 20
                );
                ctx.font = (this.fontSize * .7).toString().concat("px ").concat(this.fontFamily);
                ctx.fillText(
                    "Your presence is tolerable...",
                    this.game.width * .5,
                    this.game.height * .5 + 20
                );
            } else {
                ctx.fillText(
                    "Disappoint",
                    this.game.width * .5,
                    this.game.height * .5 - 20
                );
                ctx.font = (this.fontSize * .7).toString().concat("px ").concat(this.fontFamily);
                ctx.fillText(
                    "Reflect and try again...",
                    this.game.width * .5,
                    this.game.height * .5 + 20
                );
            }

        }
        ctx.restore();
    }
}