export class CollisionManager {
  static instance = null;
  constructor() {
    this.colliders = [];
    CollisionManager.instance = this;
  }

  addCollider(collider) {
    this.colliders.push(collider);
    // console.log(collider.owner);
  }

  removeCollider(collider) {
    const index = this.colliders.indexOf(collider);
    if (index > -1) this.colliders.splice(index, 1);
  }

  checkCollisions() {
    // console.log(this.colliders);
    for (let i = 0; i < this.colliders.length; i++) {
      for (let j = i + 1; j < this.colliders.length; j++) {
        const colliderA = this.colliders[i];
        const colliderB = this.colliders[j];
        // console.log(colliderA.owner);
        // console.log(colliderB.owner);
        if (colliderA.checkCollision(colliderB)) {
          // console.log(colliderA);
          // console.log(colliderB);
          colliderA.onCollision(colliderB);
          colliderB.onCollision(colliderA);
        }
      }
    }
  }
}
