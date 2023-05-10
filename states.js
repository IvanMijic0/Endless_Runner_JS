import { Dust } from "./particles.js";

export const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVING: 5,
    HIT: 6
}

class States {
    constructor(state, game) {
        this.state = state;
        this.game = game;
    }
}

export class Sitting extends States {
    constructor(game) {
        super("SITTING", game);
    }
    enter = () => {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 4;
        this.game.player.frameY = 5;
    }
    handleInput = input => {
        if (
            input.lastKey === "PRESS left" || input.lastKey === "PRESS right"
        ) {
            this.game.player.setState(states.RUNNING, 1);
        }
        else if (input.keys.includes("Enter")){
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}
export class Running extends States {
    constructor(game) {
        super("RUNNING", game);
    }
    enter = () => {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 8;
        this.game.player.frameY = 3;
    }
    handleInput = input => {
        this.game.particles.push(new Dust(this.game, this.game.player.x, this.game.player.y));
        if (
            input.lastKey === "PRESS down"
        ){
            this.game.player.setState(states.SITTING, 0);
        }
        else if (
            input.keys.includes("ArrowUp") ||
            input.keys.includes("w")
        ) {
            this.game.player.setState(states.JUMPING, 1);
        }
        else if (input.keys.includes("Enter")){
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}
export class Jumping extends States {
    constructor(game) {
        super("JUMPING", game);
    }
    enter = () => {
        if (this.game.player.onGround()) {this.game.player.vy -= 20;}
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 1;
    }
    handleInput = input => {
        if (this.game.player.vy > this.game.player.weight) {
            this.game.player.setState(states.FALLING, 1);
        }
        else if (input.keys.includes("Enter")){
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}
export class Falling extends States {
    constructor(game) {
        super("FALLING", game);
    }
    enter = () => {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 2;
    }
    handleInput = input => {
        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
        }
    }
}
export class Rolling extends States {
    constructor(game) {
        super("ROLLING", game);
    }
    enter = () => {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;
    }
    handleInput = input => {
        if (!input.keys.includes("Enter") && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
        } else if (!input.keys.includes("Enter") && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 1);
        } else if (
            input.keys.includes("Enter") &&
            (
                input.keys.includes("ArrowUp") ||
                input.keys.includes("w")
            ) && this.game.player.onGround()
        ) {
            this.game.player.vy -= 20;
        }
    }
}
