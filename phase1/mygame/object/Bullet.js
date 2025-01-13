import { CollisionManager } from "../handle/CollisionManager.js";
import { RectCollider } from "../handle/RectCollider.js";
import { Rotate } from "../handle/Rotate.js";
import { Box } from "./Box.js";
import { Enemy } from "./Enemy.js";

export class Bullet {
  constructor(x, y, angle, owner) {
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.context = null;
    this.img = new Image();
    this.damage = 10;
    this.img.src = "../asset/img/bullet/bullet_1.png";
    this.angle = angle;
    this.width = 0;
    this.height = 0;
    this.loadImage();
    this.owner = owner;

    this.isColliding = false;
    this.collider = new RectCollider(
      x,
      y,
      this.width,
      this.height,
      this.onCollision.bind(this),
      this
    );
    CollisionManager.instance.addCollider(this.collider);
    this.rotate = new Rotate();
  }

  loadImage() {
    this.img.onload = () => {
      this.width = this.img.width / 6;
      this.height = this.img.height / 6;
    };
  }
  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
    this.collider.updatePosition(this.x, this.y);
    // console.log(this.x);
  }

  draw(context) {
    this.context = context;
    this.rotate.setRotation(
      this.angle,
      this.x + this.width / 2,
      this.y + this.height / 2
    );
    this.rotate.applyRotation(context);
    context.drawImage(
      this.img,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    context.beginPath();
    context.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    context.strokeStyle = "red";
    context.stroke();
    context.closePath();

    this.rotate.resetRotation(context);
  }

  onCollision(otherCollider) {
    console.log(otherCollider.owner.type);
    // console.log(this.owner);
    if (otherCollider.owner instanceof Enemy) {
      this.isColliding = true;
      CollisionManager.instance.removeCollider(this.collider);
      console.log("enemy bị bắn");
    } else if (otherCollider.owner instanceof Box){
      this.isColliding = true;
      CollisionManager.instance.removeCollider(this.collider);
    }
  }
}
