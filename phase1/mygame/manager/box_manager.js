import { Box } from "../object/Box.js";
import { Bullet } from "../object/Bullet.js";
import { CollisionManager } from "./collision_manager.js";

export class BoxManager {
  static instance = null;
  constructor() {
    this.background = new Image();
    this.boxs = [];
    // this.bullets = [];
    this.background.src = "../asset/img/background/background.png";
    BoxManager.instance = this;
  }

  initMap(boxes) {
    this.clear();
    boxes.forEach((box) => {
      this.addBox(box.x, box.y);
    });
  }

  addBox(x, y) {
    let box = new Box(x, y);
    this.boxs.push(box);
  }

  clear() {
    this.boxs.forEach(box => {
      CollisionManager.instance.removeCollider(box.collider);
    });
    this.boxs = [];
  }
  draw(context) {
    context.drawImage(this.background, 0, 0);
    this.boxs.forEach((box) => box.draw(context));

    // this.bullets.forEach((bullet) => {
    //   bullet.draw(context);
    //   bullet.update();
    // });
  }

  update() {
    this.boxs.forEach((box) => {
      box.update();
    });
  }
  // shoot(x, y) {
  //   for (let i = 0; i < 10; i++) {
  //     this.bullets.push(new Bullet(x, y, (i * Math.PI) / 5));
  //   }
  // }
}
