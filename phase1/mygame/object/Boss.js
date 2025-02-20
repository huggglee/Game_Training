import { CollisionManager } from "../handle/CollisionManager.js";
import { RectCollider } from "../handle/RectCollider.js";
import { Bullet } from "./Bullet.js";
import { Enemy } from "./Enemy.js";
import { Player } from "./Player.js";

export class Boss extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.health = 200;
    this.isAlive = true;
    this.isColliding = false;
    this.img = new Image();
    this.collider = new RectCollider(
      x,
      y,
      1,
      1,
      this.onCollision.bind(this),
      this
    );
    CollisionManager.instance.addCollider(this.collider);
    this.loadImage();
    this.shootInterval = setInterval(() => {
      if (this.isAlive) {
        this.shoot();
      }
    }, 2000);
    this.bullets = [];
  }

  loadImage() {
    this.img.onload = () => {
      this.width = this.img.width / 10;
      this.height = this.img.height / 10;
      this.collider.width = this.width;
      this.collider.height = this.height;
      // console.log(this.width)
    };
    this.img.src = `../asset/img/boss/boss.png`;
  }

  draw(context) {
    if (this.isAlive) {
      context.drawImage(this.img, this.x, this.y, this.width, this.height);
      context.beginPath();
      context.rect(this.x, this.y, this.width, this.height);
      context.stroke();
      context.closePath();
      this.drawHUD(context);
      this.bullets.forEach((bullet) => {
        bullet.draw(context);
      });
    }
  }
  drawHUD(context) {
    context.fillStyle = "red";
    context.fillRect(this.x, this.y - 10, (this.health / 200) * 160, 5);
  }

  update() {
    this.bullets.forEach((bullet) => {
      bullet.update();
    });
  }
  //skill
  shoot() {
    for (let i = 0; i < 10; i++) {
      this.bullets.push(
        new Bullet(
          this.x + this.width / 2,
          this.y + this.height / 2,
          (i * Math.PI) / 5,
          this
        )
      );
    }
  }

  spawnEnemy() {}

  onCollision(otherCollider) {
    if (
      otherCollider.owner instanceof Bullet &&
      otherCollider.owner.owner instanceof Player
    ) {
      this.health -= otherCollider.owner.damage;
    }
  }
}
