import {
    Sitting, Running, Jumping, Falling, states
} from "./state.js";

export default class Player {
    constructor(game) {
        this.game = game;
        this.states = [
            new Sitting(this),
            new Running(this),
            new Jumping(this),
            new Falling(this),
        ];
        this.currentState = this.states[0];
        this.currentState.enter();
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 0;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
        this.speed = 0;
        this.maxSpeed = 5;
        this.vy = 0;
        this.weight = .5;
        this.image = document.getElementById("player");
    }
    update = (deltaTime, input) => {
        this.currentState.handleInput(input);
        // Horizontal Movement
        this.x += this.speed;
        if (
            (
                input.keys.includes("ArrowRight") ||
                input.keys.includes("d")
            ) && this.currentState !== this.states[states.SITTING]
        ) {this.speed = this.maxSpeed;}
        else if (
            (
                input.keys.includes("ArrowLeft") ||
                input.keys.includes("a")
            ) && this.currentState !== this.states[states.SITTING]
        ) {this.speed = -this.maxSpeed;}
        else {
            this.speed = 0;
        }

        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        // Vertical Movement
        this.y += this.vy;
        if (!this.onGround()) {this.vy += this.weight;}
        else {this.vy = 0;}
        // Sprite Animation
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) {this.frameX++;}
            else {this.frameX = 0;}
        } else {
            this.frameTimer += deltaTime;
        }
    }
    draw = (ctx) => {
        ctx.drawImage(
            this.image,
            this.frameX * this.width,
            this.frameY * this.height,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height,
        );
    }
    setState = (state, speed) => {
        this.currentState = this.states[state];
        this.game.speed = speed * this.game.maxSpeed;
        this.currentState.enter();
    }

    onGround = () => {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
}