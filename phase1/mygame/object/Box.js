import { CollisionManager } from "../handle/CollisionManager.js";
import { RectCollider } from "../handle/RectCollider.js";
import { Bullet } from "./Bullet.js";
import { Enemy } from "./Enemy.js";
import { Player } from "./Player.js";

export class Box {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // this.type = type;
    this.health = 20;
    this.img = new Image();
    this.img.src = `../asset/img/box/box_2.png`;
    // this.width = this.img.width ;
    // this.height = this.img.height ;
    this.loadImage();
    this.isExist = true;

    this.collider = new RectCollider(
      x,
      y,
      1,
      1,
      this.onCollision.bind(this),
      this
    );
    CollisionManager.instance.addCollider(this.collider);
  }

  draw(context) {
    if (this.isExist) {
      context.drawImage(this.img, this.x, this.y, this.width, this.height);
      // context.beginPath();
      // context.rect(this.x, this.y, this.width, this.height);
      // context.stroke();
      // context.closePath();
    }
  }

  loadImage() {
    this.img.onload = () => {
      this.width = this.img.width;
      this.height = this.img.height;
      this.collider.width = this.width;
      this.collider.height = this.height;
      // console.log(this.width);
      // console.log(this.height);
    };
  }

  update() {
    // console.log(this.health);
    if (this.health < 0) {
      this.isExist = false;
      CollisionManager.instance.removeCollider(this.collider);
    }
  }
  onCollision(otherCollider) {
    if (otherCollider.owner instanceof Bullet) {
      this.health -= otherCollider.owner.damage;
    } else if (otherCollider.owner instanceof Player) {
      return;
    } else if (otherCollider.owner instanceof Enemy) {
      return;
    }
  }
}
