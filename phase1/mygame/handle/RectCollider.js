import { Collider } from "./Collider.js";
export class RectCollider extends Collider {
  constructor(x, y, width, height, onCollide, owner) {
    super(x, y, onCollide);
    this.width = width;
    this.height = height;
    this.owner = owner;
  }

  checkCollision(other) {
    // console.log("start");
    // console.log(other.owner);
    
    if (other instanceof RectCollider) {
      return (
        this.x < other.x + other.width &&
        this.x + this.width > other.x &&
        this.y < other.y + other.height &&
        this.y + this.height > other.y
      );
    }
    return false;
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  }
}
