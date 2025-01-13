export class Collider {
  constructor(x, y, onCollide) {
    this.x = x;
    this.y = y;
    this.isColliding = false;
    this.onCollide = onCollide;
  }

  checkCollision(otherCollider) {
    throw new Error("checkCollision() must be implemented in a subclass");
  }

  onCollision(otherCollider) {
    this.isColliding = true;
    this.onCollide?.(otherCollider);
  }
}
