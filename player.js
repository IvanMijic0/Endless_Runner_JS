import {
    Sitting, Running, Jumping, Falling, Rolling, states
} from "./state.js";

export default class Player {
    constructor(game) {
        this.game = game;
        this.states = [
            new Sitting(this.game),
            new Running(this.game),
            new Jumping(this.game),
            new Falling(this.game),
            new Rolling(this.game),
        ];
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
        this.checkCollisions();
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
        if (this.game.debug) {
            ctx.strokeRect(
                this.x,
                this.y,
                this.width,
                this.height
            );
        }
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
    checkCollisions = () => {
        this.game.enemies.forEach(enemy => {
           if (
               enemy.x < this.x + this.width &&
               enemy.x + enemy.width > this.x &&
               enemy.y < this.y + this.height &&
               enemy.y + enemy.height > this.y
           ) {
               // Collision Detected
               enemy.markedForDeletion = true;
               this.game.score++;
           }
            else {
                // No Collision
           }
        });
}
}