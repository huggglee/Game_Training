import { GameObject } from "./GameObject.js";

export class Rectangle extends GameObject {
  constructor(context, x, y, vx, vy, mass, restitution,width,height) {
    super(context, x, y, vx, vy);

    // Set default width and height
    this.mass = mass;
    this.restitution = restitution;
    this.width = width||70;
    this.height = height||50;
  }

  draw() {
    // Draw a simple square
    this.context.fillStyle = this.isColliding ? "#ff8080" : "#0099b0";
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

  update(secondsPassed) {
    // Move with set velocity
    this.x += this.vx * secondsPassed;
    this.y += this.vy * secondsPassed;

    this.checkBounce();
  }

  updateV(secondsPassed){
    this.x += this.vx * secondsPassed;
    this.y += this.vy * secondsPassed;
  }

  highlight(context, cellSize) {
    const startCol = Math.floor(this.x / cellSize);
    const endCol = Math.floor((this.x + this.width) / cellSize);
    const startRow = Math.floor(this.y / cellSize);
    const endRow = Math.floor((this.y + this.height) / cellSize);

    context.fillStyle = "rgba(255, 0, 0, 0.3)"; // Màu đỏ nhạt

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const x = col * cellSize;
        const y = row * cellSize;
        context.fillRect(x, y, cellSize, cellSize); // Highlight ô
      }
    }
  }
  checkBounce() {
    if (this.x < 0) {
      this.vx = Math.abs(this.vx) * this.restitution;
      this.x = 0;
    } else if (this.x + this.width > canvas.width) {
      this.vx = -Math.abs(this.vx) * this.restitution;
      this.x = canvas.width - this.width;
    }

    if (this.y < 0) {
      this.vy = Math.abs(this.vy) * this.restitution;
      this.y = 0;
    } else if (this.y + this.height > canvas.height) {
      this.vy = -Math.abs(this.vy) * this.restitution;
      this.y = canvas.height - this.height;
    }
  }
}
