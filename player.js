import {
    StandingLeft, StandingRight, SittingLeft, SittingRight,
    RunningLeft, RunningRight, JumpingLeft, JumpingRight,
    FallingLeft, FallingRight, states,
} from "./state.js";

export default class Player {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
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
        this.height = 181.83;
        this.width = 200;
        this.x = this.gameWidth * .5 - this.width * .5;
        this.y = this.gameHeight - this.height;
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
        this.image = document.getElementById("dogImage");
    }
    update = (deltaTime, input) => {

        if (
            this.currentState === this.states[states.SITTING_LEFT] ||
            this.currentState === this.states[states.SITTING_RIGHT]
        ){
            this.maxFrame = 4;
        } else if (
            this.currentState === this.states[states.RUNNING_LEFT] ||
            this.currentState === this.states[states.RUNNING_RIGHT]
        ) {
            this.maxFrame = 8;
        }
        else {
            this.maxFrame = 6;
        }

        this.currentState.handleInput(input);

        // Sprite Animation
        if (this.frameTimer > this.frameInterval){
            if (this.frameX >= this.maxFrame) {this.frameX = 0;}
            else this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }

        // Horizontal Movement
        this.x += this.speed;

        // Boundaries
        if (this.x <= 0) {this.x = 0;}
        else if (this.x >= this.gameWidth - this.width) {
            this.x = this.gameWidth - this.width;
        }

        // Vertical Movement
        this.y += this.vy;
        if (!this.onGround()) {
            this.vy += this.weight;
        } else {
            this.vy = 0;
        }
        // Check if player falls through floor
        // Just in case
        if (this.y > this.gameHeight - this.height) {
            this.y = this.gameHeight - this.height;
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
    setState = (state) => {
        this.currentState = this.states[state];
        this.currentState.enter();
    }

    onGround = () => {
        return this.y >= this.gameHeight - this.height;
    }
}