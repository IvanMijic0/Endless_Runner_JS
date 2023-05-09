export default class InputHandler {
    constructor() {
        this.lastKey = " ";
        window.addEventListener("keydown", e => {
            switch (e.key){
                case "ArrowLeft":
                    this.lastKey = "PRESS left";
                    break
                case "a":
                    this.lastKey = "PRESS left";
                    break
                case "ArrowRight":
                    this.lastKey = "PRESS right";
                    break
                case "d":
                    this.lastKey = "PRESS right";
                    break
                case "ArrowDown":
                    this.lastKey = "PRESS down";
                    break
                case "s":
                    this.lastKey = "PRESS down";
                    break
                case "ArrowUp":
                    this.lastKey = "PRESS up";
                    break
                case "w":
                    this.lastKey = "PRESS up";
                    break
            }
        });

        window.addEventListener("keyup", e => {
            switch (e.key){
                case "ArrowLeft":
                    this.lastKey = "RELEASE left";
                    break
                case "a":
                    this.lastKey = "RELEASE left";
                    break
                case "ArrowRight":
                    this.lastKey = "RELEASE right";
                    break
                case "d":
                    this.lastKey = "RELEASE right";
                    break
                case "ArrowDown":
                    this.lastKey = "RELEASE down";
                    break
                case "s":
                    this.lastKey = "RELEASE down";
                    break
                case "ArrowUp":
                    this.lastKey = "RELEASE up";
                    break
                case "w":
                    this.lastKey = "RELEASE up";
                    break
            }
        });
    }
}