import { GameObject } from "./GameObject.js";

export class Circle extends GameObject {
  constructor(context, x, y, vx, vy, radius, mass, restitution) {
    super(context, x, y, vx, vy);

    // Set default radius
    this.radius = radius || 25;
    this.mass = mass;
    this.restitution = restitution || 0.9;
  }

  draw() {
    // Draw a simple circle
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.context.fillStyle = this.isColliding ? "#ff8080" : "#0099b0";
    this.context.fill();
  }

  update(secondsPassed) {
    // let g = 9.8;
    // // Move with set velocity
    // this.vy += g * secondsPassed;

    this.x += this.vx * secondsPassed;
    this.y += this.vy * secondsPassed;

    this.checkBounce();
  }

  updateV(secondsPassed){
    this.x += this.vx * secondsPassed;
    this.y += this.vy * secondsPassed;
  }

  highlight(context, cellSize) {
    const startCol = Math.floor((this.x - this.radius) / cellSize);
    const endCol = Math.floor((this.x + this.radius) / cellSize);
    const startRow = Math.floor((this.y - this.radius) / cellSize);
    const endRow = Math.floor((this.y + this.radius) / cellSize);

    context.fillStyle = "rgba(255, 0, 0, 0.3)"; // Màu đỏ nhạt

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const x = col * cellSize;
        const y = row * cellSize;

        // Kiểm tra nếu bất kỳ phần nào của hình tròn nằm trong ô
        if (
          this.x + this.radius > x &&
          this.x - this.radius < x + cellSize &&
          this.y + this.radius > y &&
          this.y - this.radius < y + cellSize
        ) {
          context.fillRect(x, y, cellSize, cellSize); // Highlight ô
        }
      }
    }
  }

  checkBounce() {
    // Check for left and right
    if (this.x < this.radius) {
      this.vx = Math.abs(this.vx) * this.restitution;
      this.x = this.radius;
    } else if (this.x > canvas.width - this.radius) {
      this.vx = -Math.abs(this.vx) * this.restitution;
      this.x = canvas.width - this.radius;
    }

    // Check for bottom and top
    if (this.y < this.radius) {
      this.vy = Math.abs(this.vy) * this.restitution;
      this.y = this.radius;
    } else if (this.y > canvas.height - this.radius) {
      this.vy = -Math.abs(this.vy) * this.restitution;
      this.y = canvas.height - this.radius;
    }
  }
}
