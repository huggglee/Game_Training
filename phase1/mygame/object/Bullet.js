import { CollisionManager } from "../handle/CollisionManager.js";
import { RectCollider } from "../handle/RectCollider.js";
import { Rotate } from "../handle/Rotate.js";
import { Boss } from "./Boss.js";
import { Box } from "./Box.js";
import { Enemy } from "./Enemy.js";
import { Player } from "./Player.js";

export class Bullet {
  constructor(x, y, angle, owner) {
    this.x = x;
    this.y = y;
    this.speed = 400;
    // this.context = null;
    this.img = new Image();
    this.damage = 10;
    this.angle = angle;
    this.width = 0;
    this.height = 0;
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
    this.loadImage();
    this.rotate = new Rotate();
  }

  loadImage() {
    if(this.owner instanceof Player){
      this.img.src = "../asset/img/bullet/bullet_1.png";
    } else if (this.owner instanceof Boss){
      this.img.src = "../asset/img/bullet/bullet_2.png";
    }
    this.img.onload = () => {
      this.width = this.img.width / 6;
      this.height = this.img.height / 6;
    };
    

  }
  update() {
    this.x += this.speed * Math.cos(this.angle) * window.dt / 1000;
    this.y += this.speed * Math.sin(this.angle) * window.dt / 1000;
    this.collider.updatePosition(this.x, this.y);
  
    // Kiểm tra xem viên đạn có rời khỏi màn hình không
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.isColliding = true;
      CollisionManager.instance.removeCollider(this.collider);
    }
  }
  

  draw(context) {
    context.save();
    this.rotate.setRotation(
      this.angle,
      this.x ,
      this.y
    );
    this.rotate.applyRotation(context);
    context.drawImage(
      this.img,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    // context.beginPath();
    // context.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    // context.strokeStyle = "red";
    // context.stroke();
    // context.closePath();

    this.rotate.resetRotation(context);
  }

  onCollision(otherCollider) {
    // console.log(otherCollider.owner.type);
    // console.log(this.owner);
    if (otherCollider.owner instanceof Enemy && this.owner instanceof Player) {
      this.isColliding = true;
      CollisionManager.instance.removeCollider(this.collider);
      // console.log("enemy bị bắn");
    } else if (otherCollider.owner instanceof Box){
      this.isColliding = true;
      CollisionManager.instance.removeCollider(this.collider);
    } else if (otherCollider.owner instanceof Player && this.owner instanceof Boss){
      this.isColliding = true;
      CollisionManager.instance.removeCollider(this.collider);
    }
  }
}
