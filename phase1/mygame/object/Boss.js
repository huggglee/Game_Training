import { CollisionManager } from "../handle/CollisionManager.js";
import { RectCollider } from "../handle/RectCollider.js";
import { EnemyManager } from "../manager/enemy_manager.js";
import { Bullet } from "./Bullet.js";
import { Enemy } from "./Enemy.js";
import { Player } from "./Player.js";

export class Boss extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.health = 400;
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
    this.imgIndex = 1;
    this.quantityBullet = 10;
    this.hasSpawnedEnemies = false;
    CollisionManager.instance.addCollider(this.collider);
    this.loadImage();
    this.shootInterval = setInterval(() => {
      if (this.isAlive) {
        this.shoot(this.quantityBullet);
      }
    }, 2500);
    setInterval(() => {
      let temp = (this.imgIndex % 6) + 1;
      this.changeIndex(temp);
    }, 500);
    this.bullets = [];
  }

  loadImage() {
    this.img.onload = () => {
      this.width = this.img.width * 5;
      this.height = this.img.height * 5;
      this.collider.width = this.width;
      this.collider.height = this.height;
      // console.log(this.width)
    };
    this.img.src = `../asset/img/boss/a${this.imgIndex}.png`;
  }
  changeIndex(index) {
    this.imgIndex = index;
    this.loadImage();
  }
  draw(context) {
    if (this.isAlive) {
      context.drawImage(this.img, this.x, this.y, this.width, this.height);
      this.drawHUD(context);
      this.bullets.forEach((bullet) => {
        bullet.draw(context);
      });
    }
  }
  drawHUD(context) {
    context.fillStyle = "red";
    context.fillRect(this.x, this.y - 10, (this.health / 400) * 150, 5);
  }

  update() {
    if (this.health < 250 && this.health >= 150) {
      this.quantityBullet = 15;
    } else if (this.health < 150 && !this.hasSpawnedEnemies) {
      this.quantityBullet = 20;
      this.spawnEnemy(6);
      this.hasSpawnedEnemies = true;
    }

    if (this.health <= 0) {
      this.isAlive = false;
      CollisionManager.instance.removeCollider(this.collider);
    }
    this.bullets.forEach((bullet) => {
      bullet.update();
    });
    this.bullets = this.bullets.filter((bullet) => !bullet.isColliding);
  }
  //skill
  shoot(quantity) {
    for (let i = 0; i < quantity; i++) {
      this.bullets.push(
        new Bullet(
          this.x + this.width / 2,
          this.y + this.height / 2,
          (i * 2 * Math.PI) / quantity,
          this
        )
      );
    }
  }

  spawnEnemy(quantity) {
    for (let i = 0; i < quantity; i++) {
      let offsetX = this.getRandomOffset();
      let offsetY = this.getRandomOffset();
      let enemyData = {
        x: this.x + this.width / 2 + offsetX,
        y: this.y + this.height / 2 + offsetY,
      };
      EnemyManager.instance.spawnEnemy(enemyData);
    }
  }
  getRandomOffset() {
    return Math.random() < 0.5
      ? -150 + Math.random() * 50 // Giá trị từ -150 đến -100 (luôn < -75)
      : 100 + Math.random() * 50; // Giá trị từ 100 đến 150 (luôn > 75)
  }

  onCollision(otherCollider) {
    if (
      otherCollider.owner instanceof Bullet &&
      otherCollider.owner.owner instanceof Player
    ) {
      this.health -= otherCollider.owner.damage;
    }
  }
}
