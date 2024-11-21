import { GameObject } from "./GameObject.js";

export class Rectangle extends GameObject {
  constructor(context, x, y, vx, vy,mass,restitution) {
    super(context, x, y, vx, vy);

    // Set default width and height
    this.mass = mass;
    this.restitution=restitution;
    this.width = 100;
    this.height = 60;
  }

  draw() {
    // Draw a simple square
    this.context.fillStyle = this.isColliding ? "#ff8080" : "#0099b0";
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

  update(secondsPassed) {
    // Apply acceleration

    // Move with set velocity
    this.x += this.vx * secondsPassed;
    this.y += this.vy * secondsPassed;
  }
}
