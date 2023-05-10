import Player from "./player.js";
import InputHandler from "./input_handler.js";
import Background from "./background.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemies.js";
import { UI } from "./UI.js"

export default class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.groundMargin = 80;
        this.speed = 0;
        this.maxSpeed = 3;
        this.background = new Background(this);
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.UI = new UI(this);
        this.enemies = [];
        this.particles = [];
        this.collisions = [];
        this.floatingMessages = [];
        this.maxParticles = 50;
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
        this.score = 0;
        this.winningScore = 30;
        this.fontColor = "black";
        this.time = 0;
        this.maxTime = 30000;
        this.debug = false;
        this.lives = 3;
        this.player.currentState = this.player.states[0];
        this.player.currentState.enter();
        this.gameOver = false;
    }
    update = (deltaTime) => {
        this.time += deltaTime;
        if (this.time > this.maxTime) {this.gameOver = true;}
        this.background.update();
        this.player.update(deltaTime, this.input);
        // Handle Enemies
        if (this.enemyTimer > this.enemyInterval){
            this.addEnemy();
            this.enemyTimer = 0;
        }
        else {
            this.enemyTimer += deltaTime;
        }
        this.enemies.forEach(enemy => {
           enemy.update(deltaTime);
        });
        // Handle Messages
        this.floatingMessages.forEach(message => {
           message.update();
        });
        // Handle Particles
        this.particles.forEach((particle) => {
           particle.update();
        });
        if (this.particles.length > this.maxParticles){
            this.particles.length = this.maxParticles;
        }
        // Handle Collision Sprites
        this.collisions.forEach((collision) => {
            collision.update(deltaTime );
        });
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
        this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
        this.particles = this.particles.filter(particle => !particle.markedForDeletion);
        this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);

    }
    draw = (ctx) => {
        this.background.draw(ctx);
        this.player.draw(ctx);
        this.enemies.forEach(enemy => {
           enemy.draw(ctx);
        });
        this.floatingMessages.forEach(message => {
            message.draw(ctx);
        });
        this.particles.forEach(particle => {
            particle.draw(ctx);
        });
        this.collisions.forEach(collision => {
            collision.draw(ctx);
        });
        this.UI.draw(ctx);
    }
    addEnemy = () => {
        if (this.speed > 0 && Math.random() < .5){
            this.enemies.push(new GroundEnemy(this));
        }
        else if (this.speed > 0) {
            this.enemies.push(new ClimbingEnemy(this));
        }
        this.enemies.push(new FlyingEnemy(this));
    }
}