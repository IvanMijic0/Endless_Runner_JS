export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = "30";
        this.fontFamily = "Helvetica";
    }
    draw = (ctx) => {
        ctx.font = this.fontSize.concat("px ").concat(this.fontFamily);
        ctx.textAlign = "left";
        ctx.fillStyle = this.game.fontColor;
        // Score
        ctx.fillText(
          "Score: ".concat(this.game.score),
          20,
          50
        );
    }
}