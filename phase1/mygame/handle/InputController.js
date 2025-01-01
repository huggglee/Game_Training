export class InputController {
    constructor() {
        this.keys = {};
        this.mouse = { x: 0, y: 0 }; 
        this.isMouseClick = false;

        window.addEventListener('keydown', (e) => this.keys[e.key] = true);
        window.addEventListener('keyup', (e) => this.keys[e.key] = false);

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.offsetX; 
            this.mouse.y = e.offsetY; 
        });

        window.addEventListener('click', (e) => this.isMouseClick = true);
    }

    isKeyPressed(key) {
        return this.keys[key] || false;
    }

    getMousePosition() {
        return { x: this.mouse.x, y: this.mouse.y };
    }

    getMouseClick() {
        if (this.isMouseClick) {
            this.isMouseClick = false; 
            return true; 
        }
        return false; 
    }
}
