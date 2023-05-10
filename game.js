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
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
        this.score = 0;
        this.fontColor = "black";
        this.debug = false;
        this.player.currentState = this.player.states[0];
        this.player.currentState.enter();
    }
    update = (deltaTime) => {
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
           if (enemy.markedForDeletion) {
               this.enemies.splice(this.enemies.indexOf(enemy), 1);
           }
        });
        // TODO HANDLE PARTICLES
    }
    draw = (ctx) => {
        this.background.draw(ctx);
        this.player.draw(ctx);
        this.enemies.forEach(enemy => {
           enemy.draw(ctx);
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