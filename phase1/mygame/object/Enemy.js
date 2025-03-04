import { CollisionManager } from "../manager/collision_manager.js";
import { RectCollider } from "../handle/RectCollider.js";
import { Rotate } from "../handle/Rotate.js";
import { Box } from "./Box.js";
import { Bullet } from "./Bullet.js";
import { Player } from "./Player.js";
import { AudioManager } from "../manager/audio_manager.js";
import { GameManager } from "../manager/game_manager.js";
export class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.targetX = x;
    this.targetY = y;
    this.speed = 150;
    this.angle = 0;
    this.health = 50;
    this.damage = 10;
    this.range = 500;
    this.type = "enemy";
    this.isAlive = true;
    this.img = new Image();
    this.imgIndex = 1;
    this.loadImage();
    setInterval(() => {
      let temp = (this.imgIndex % 6) + 1;
      this.changeIndex(temp);
    }, 200);

    this.isColliding = false;
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

  loadImage() {
    this.img.onload = () => {
      this.width = this.img.width * 3;
      this.height = this.img.height * 3;
      this.collider.width = this.width;
      this.collider.height = this.height;
    };
    this.img.src = `../asset/img/enemy/slime_${this.imgIndex}.png`;
  }

  changeIndex(index) {
    this.imgIndex = index;
    this.loadImage();
  }

  update() {
    if (GameManager.instance.state !== "playing") return;
    if (this.health <= 0 && this.isAlive) {
      AudioManager.instance.playSound("slime_death");
      this.isAlive = false;
      CollisionManager.instance.removeCollider(this.collider);
    }
    if (this.isAlive) {
      if (this.x < 20) {
        this.x = 20;
      } else if (this.x + this.width > canvas.width - 20) {
        this.x = canvas.width - this.width - 20;
      }

      if (this.y < 50) {
        this.y = 50;
      } else if (this.y + this.height > canvas.height - 50) {
        this.y = canvas.height - this.height - 50;
      }
      let distance = Math.sqrt(
        (this.x - this.targetX) * (this.x - this.targetX) +
          (this.y - this.targetY) * (this.y - this.targetY)
      );
      if (distance < this.range) {
        this.angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
        this.x += (this.speed * Math.cos(this.angle) * window.dt) / 1000;
        this.y += (this.speed * Math.sin(this.angle) * window.dt) / 1000;
        this.collider.updatePosition(this.x, this.y);
      }
    }
  }

  draw(context) {
    if (this.isAlive) {
      context.drawImage(this.img, this.x, this.y, this.width, this.height);
      this.drawHUD(context);
    }
  }
  drawHUD(context) {
    context.fillStyle = "red";
    context.fillRect(this.x, this.y, this.health, 5);
  }
  changeTarget(targetX, targetY) {
    this.targetX = targetX;
    this.targetY = targetY;
  }

  onCollision(otherCollider) {
    if (
      otherCollider.owner instanceof Bullet &&
      otherCollider.owner.owner instanceof Player
    ) {
      this.health -= otherCollider.owner.damage;
    } else if (otherCollider.owner instanceof Player) {
      this.isAlive = false;
      CollisionManager.instance.removeCollider(this.collider);
    } else if (otherCollider.owner instanceof Box) {
      const dx =
        this.x +
        this.width / 2 -
        (otherCollider.owner.x + otherCollider.owner.width / 2);
      const dy =
        this.y +
        this.height / 2 -
        (otherCollider.owner.y + otherCollider.owner.height / 2);
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
    } else if (otherCollider.owner instanceof Enemy) {
      const dx =
        this.x +
        this.width / 2 -
        (otherCollider.owner.x + otherCollider.owner.width / 2);
      const dy =
        this.y +
        this.height / 2 -
        (otherCollider.owner.y + otherCollider.owner.height / 2);
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
