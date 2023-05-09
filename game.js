import Player from "./player.js";
import InputHandler from "./input_handler.js";

export default class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.input = new InputHandler();
    }
    update = (deltaTime) => {
        this.player.update(deltaTime, this.input.keys);
    }
    draw = (ctx) => {
        this.player.draw(ctx);
    }
}