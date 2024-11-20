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

    // this.context.beginPath();
    // this.context.moveTo(this.x, this.y);
    // this.context.lineTo(this.x + this.vx, this.y + this.vy);
    // this.context.stroke();
  }

  update(secondsPassed) {
    let g = 9.8;
    // Move with set velocity
    this.vy += g * secondsPassed;

    this.x += this.vx * secondsPassed;
    this.y += this.vy * secondsPassed;

    // Calculate the angle (vy before vx)
    let radians = Math.atan2(this.vy, this.vx);

    // Convert to degrees
    let degrees = (180 * radians) / Math.PI;

    // console.log(degrees);
  }
}
