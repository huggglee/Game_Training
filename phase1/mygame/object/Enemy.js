import { CollisionManager } from "../handle/CollisionManager.js";
import { RectCollider } from "../handle/RectCollider.js";
import { Rotate } from "../handle/Rotate.js";
import { Box } from "./Box.js";
import { Bullet } from "./Bullet.js";
import { Player } from "./Player.js";

export class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.targetX = x;
    this.targetY = y;
    this.speed = 3;
    this.angle = 0;
    this.health = 100;
    this.damage = 10;
    this.isAlive = true;
    this.img = new Image();
    this.imgIndex = 1;
    this.img.src = `../asset/img/enemy/slime_${this.imgIndex}.png`;
    this.width = this.img.width * 3;
    this.height = this.img.height * 3;
    // this.loadImage();
    setInterval(() => {
      let temp = (this.imgIndex % 6) + 1;
      this.changeIndex(temp);
    }, 200);

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

    // this.bullets = [];
  }

  draw(context) {
    if (this.isAlive) {
      context.drawImage(this.img, this.x, this.y, this.width, this.height);
      context.beginPath();
      context.rect(this.x, this.y, this.width, this.height);
      context.stroke();
      context.closePath();
    }

    // this.bullets.forEach((bullet) => {
    //   bullet.draw(context);
    // });
  }

  // shoot() {
  //   for (let i = 0; i < 10; i++) {
  //     this.bullets.push(new Bullet(this.x, this.y, (i * Math.PI) / 5));
  //   }
  //   // console.log(this.bullets);
  // }

  loadImage() {
    // this.img.onload = () => {
    //   this.width = this.img.width * 3;
    //   this.height = this.img.height * 3;
    // };
    this.img.src = `../asset/img/enemy/slime_${this.imgIndex}.png`;
  }

  changeIndex(index) {
    this.imgIndex = index;
    this.loadImage();
  }

  update() {
    this.angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
    // console.log(this.width);
    // console.log(this.height);
    if (this.isAlive) {
      this.x += this.speed * Math.cos(this.angle);
      this.y += this.speed * Math.sin(this.angle);
    }
    this.collider.updatePosition(this.x, this.y);

    // this.bullets.forEach((bullet) => bullet.update());
  }

  changeTarget(targetX, targetY) {
    this.targetX = targetX;
    this.targetY = targetY;
  }

  onCollision(otherCollider) {
    // console.log(otherCollider.owner.type );
    // console.log("123",this.collisionManager);
    if (otherCollider.owner instanceof Bullet) {
      this.health -= otherCollider.owner.damage;
      console.log("enemy bi bắn");
    } else if (otherCollider.owner instanceof Player) {
      // otherCollider.owner.health -= 10;
      this.isAlive = false;
      CollisionManager.instance.removeCollider(this.collider);
    } else if (otherCollider.owner instanceof Box) {
      const dx = this.x + this.width / 2 - (otherCollider.owner.x + otherCollider.owner.width / 2);
      const dy = this.y + this.height / 2 - (otherCollider.owner.y + otherCollider.owner.height / 2);
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (absDx > absDy) {
        // Va chạm theo trục x
        if (dx > 0) {
          this.x = otherCollider.owner.x + otherCollider.owner.width;
        } else {
          this.x = otherCollider.owner.x - this.width;
        }
      } else {
        // Va chạm theo trục y
        if (dy > 0) {
          this.y = otherCollider.owner.y + otherCollider.owner.height;
        } else {
          this.y = otherCollider.owner.y - this.height;
        }
      }
    }
  }
}
