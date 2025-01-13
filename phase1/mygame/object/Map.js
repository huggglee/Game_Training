import { Box } from "./Box.js";
import { Bullet } from "./Bullet.js";
import { CollisionManager } from "../handle/CollisionManager.js";

export class Map {
  constructor() {
    this.background = new Image();
    this.boxs = [];
    this.bullets = [];
    this.background.src = "../asset/img/background/background.png";
    // console.log(this.background.width);
    // console.log(this.background.height);
  }

  addBox(x, y) {
    let box = new Box(x, y);
    this.boxs.push(box);
  }
  draw(context) {
    context.drawImage(this.background, 0, 0);
    this.boxs.forEach((box) => box.draw(context));

    this.bullets.forEach((bullet) => {
      bullet.draw(context);
      bullet.update();
    });
  }

  initMap(boxes) {
    this.boxs = []; 
    boxes.forEach((box) => {
      this.addBox(box.x, box.y); 
    });
  }
  shoot(x, y) {
    for (let i = 0; i < 10; i++) {
      this.bullets.push(new Bullet(x, y, (i * Math.PI) / 5));
    }
  }
}
