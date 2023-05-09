import Player from "./player.js";
import InputHandler from "./input_handler.js";
import {drawStatusText} from "./utils.js";

window.addEventListener("load", () => {
    const loading = document.getElementById("loading");
    loading.style.display = "none";
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    const CANVAS_WIDTH = canvas.width = window.innerWidth;
    const CANVAS_HEIGHT = canvas.height = window.innerHeight;
    const  player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT);
    const input = new InputHandler();

    let lastTime = 0;

    const animate = (timestamp) => {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        drawStatusText(ctx, input, player);
        player.update(deltaTime, input.lastKey)
        player.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});

