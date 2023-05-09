import {
    StandingLeft, StandingRight, SittingLeft, SittingRight,
    RunningLeft, RunningRight, JumpingLeft, JumpingRight,
    FallingLeft, FallingRight,
} from "./state.js";

export default class Player {
    constructor(game) {
        this.game = game;
        this.states = [
            new StandingLeft(this),
            new StandingRight(this),
            new SittingLeft(this),
            new SittingRight(this),
            new RunningLeft(this),
            new RunningRight(this),
            new JumpingLeft(this),
            new JumpingRight(this),
            new FallingLeft(this),
            new FallingRight(this),
        ];
        this.currentState = this.states[1];
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 6;
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
        if (
            input.includes("ArrowRight") ||
            input.includes("d")
        ) {this.x++;}
        else if (
            input.includes("ArrowLeft") ||
            input.includes("a")
        ) {this.x--;}
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
    setState = (state) => {
        this.currentState = this.states[state];
        this.currentState.enter();
    }

    onGround = () => {
        return this.y >= this.game.height - this.height;
    }
}