import {
    Sitting, Running, Jumping, Falling,
    Rolling, Diving, Hit, states
} from "./states.js";
import { CollisionAnimation } from "./collisionAnimation.js";
import {FloatingMessages} from "./floatingMessages.js";

export default class Player {
    constructor(game) {
        this.game = game;
        this.states = [
            new Sitting(this.game),
            new Running(this.game),
            new Jumping(this.game),
            new Falling(this.game),
            new Rolling(this.game),
            new Diving(this.game),
            new Hit(this.game),
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
        this.currentState = null;
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
            )
            &&
            (
                this.currentState !== this.states[states.SITTING] &&
                this.currentState !== this.states[6]
            )
        ) {this.speed = this.maxSpeed;}
        else if (
            (
                input.keys.includes("ArrowLeft") ||
                input.keys.includes("a")
            )
            &&
            (
                this.currentState !== this.states[states.SITTING] &&
                this.currentState !== this.states[6]
            )
        ) {this.speed = -this.maxSpeed;}
        else {
            this.speed = 0;
        }
        // Horizontal Boundary Check
        if (this.x < 0) {this.x = 0;}
        if (this.x > this.game.width - this.width) {this.x = this.game.width - this.width;}
        // Vertical Movement
        this.y += this.vy;
        if (!this.onGround()) {this.vy += this.weight;}
        else {this.vy = 0;}
        // Vertical Boundary Check
        if (this.y > this.game.height - this.height - this.game.groundMargin){
            this.y = this.game.height - this.height - this.game.groundMargin;
        }
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
            ctx.strokeStyle = "green";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(
                this.x + this.width * .5,
                this.y + this.height * .5 + 20,
                this.width * .33,
                0,
                Math.PI * 2
            );
            ctx.stroke();
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
            const dx = (enemy.x + enemy.width * .5 - 20) - (this.x + this.width * .5);
            const dy = (enemy.y + enemy.height * .5) - (this.y + this.height * .5 + 20);
            const distance = Math.sqrt(dx * dx + dy * dy);
           if (distance < enemy.width * .33 + this.width * .33) {
               // Collision Detected
               enemy.markedForDeletion = true;
               this.game.collisions.push(new CollisionAnimation(
                   this.game,
                   enemy.x + enemy.width * .5,
                   enemy.y + enemy.height * .5
               ));
               if (
                   this.currentState === this.states[4] ||
                   this.currentState === this.states[5]
               ) {
                   this.game.score++;
                   this.game.floatingMessages.push(new FloatingMessages(
                       "+1",
                       enemy.x,
                       enemy.y,
                       140,
                       50
                   ));
               }
               else {
                    this.setState(6, 0);
                    this.game.score -= 3;
                    this.game.lives--;
                    if (this.game.lives <= 0) {this.game.gameOver = true;}
               }
           }
           //  else {
           //      // No Collision
           // }
        });
}
}