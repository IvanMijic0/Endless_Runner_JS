const KEYS = {
    ARROW_DOWN: "ArrowDown",
    KEY_DOWN: "s",
    ARROW_UP: "ArrowUp",
    KEY_UP: "w",
    ARROW_LEFT: "ArrowLeft",
    KEY_LEFT: "a",
    ARROW_RIGHT: "ArrowRight",
    KEY_RIGHT: "d",
    SHIFT: "Shift",
    ENTER: "Enter",
};

export default class InputHandler {
    constructor() {
        this.keys = [];

        window.addEventListener("keydown", e => {
            if (
                Object.values(KEYS).includes(e.key) &&
                !this.keys.includes(e.key)
            )
            {
                this.keys.push(e.key);
            }
            console.log(this.keys);
        });

        window.addEventListener("keyup", e => {
            const index = this.keys.indexOf(e.key);
            if (index !== -1) {
                this.keys.splice(index, 1);
            }
            console.log(this.keys);
        });
    }
}