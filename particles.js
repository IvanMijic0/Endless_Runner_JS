class Particle {
    constructor(game) {
        this.game = game;
        this.markedForDeletion = false;
    }
    update() {
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        this.size *= .5;
        if (this.size < .5) {this.markedForDeletion = true;}
    }
}

export class Dust extends Particle {
    constructor(game, x, y) {
        super(game);
        this.size = Math.random() * 10 + 10;
        this.x = x;
        this.y = y;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.color = "black";
    }
    draw = (ctx) => {
        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2,
        );
    }
}

export class Splash extends Particle {
    constructor() {
        super();
    }
}

export class Fire extends Particle {
    constructor() {
        super();
    }
}