import { RectCollider } from "../handle/RectCollider.js";
import { Rotate } from "../handle/Rotate.js";
import { Bullet } from "./Bullet.js";
import { CollisionManager } from "../manager/collision_manager.js";
import { Box } from "./Box.js";
import { Enemy } from "./Enemy.js";
import { AudioManager } from "../manager/audio_manager.js";
import { GameManager } from "../manager/game_manager.js";
import { Boss } from "./Boss.js";
export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 200;
    this.angle = 0;
    this.health = 100;
    this.state = "alive";
    this.img = new Image();
    this.rotate = new Rotate();
    this.bullets = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.loadImage();
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

    //di chuột
    window.addEventListener("mousemove", (event) => {
      this.mouseX = event.offsetX;
      this.mouseY = event.offsetY;
    });
  }

  loadImage() {
    this.img.onload = () => {
      this.width = this.img.width / 3;
      this.height = this.img.height / 3;
      this.collider.width = this.width;
      this.collider.height = this.height;
    };
    this.img.src = "../asset/img/player/x1.png";
  }
  removeBullet(bullet) {
    const index = this.bullets.indexOf(bullet);
    this.bullets.splice(index, 1);
  }

  move(inputController) {
    if (inputController.isKeyPressed("a")) {
      this.x -= (this.speed * window.dt) / 1000;
    }
    if (inputController.isKeyPressed("d")) {
      this.x += (this.speed * window.dt) / 1000;
    }
    if (inputController.isKeyPressed("w")) {
      this.y -= (this.speed * window.dt) / 1000;
    }
    if (inputController.isKeyPressed("s")) {
      this.y += (this.speed * window.dt) / 1000;
    }
    this.collider.updatePosition(this.x, this.y);

    this.angle = Math.atan2(
      this.mouseY - (this.y + this.height / 2),
      this.mouseX - (this.x + this.width / 2)
    );

    this.rotate.setRotation(
      this.angle,
      this.x + this.width / 2,
      this.y + this.height / 2
    );
  }

  update(inputController) {
    if (GameManager.instance.state !== "playing") return;
    this.move(inputController);

    if (inputController.getMouseClick()) {
      this.shoot();
    }
    this.bullets.forEach((bullet) => {
      bullet.update();
    });
    this.bullets = this.bullets.filter((bullet) => !bullet.isColliding);

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
    if (this.health <= 0) {
      GameManager.instance.setState("gameover");
    }
  }

  draw(context) {
    context.save();
    this.rotate.applyRotation(context);
    context.drawImage(
      this.img,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    this.rotate.resetRotation(context);

    this.bullets.forEach((bullet) => {
      bullet.draw(context);
    });

    context.restore();
  }

  shoot() {
    console.log(this.angle);
    const offset = -10;
    const offsetX = Math.sin(this.angle) * offset; // Vuông góc với hướng nhìn
    const offsetY = -Math.cos(this.angle) * offset; // Vuông góc với hướng nhìn

    const bulletX = this.x + this.width / 2 + offsetX;
    const bulletY = this.y + this.height / 2 + offsetY;
    const bullet = new Bullet(bulletX, bulletY, this.angle, this);
    this.bullets.push(bullet);
    AudioManager.instance.playSound("shoot2");
  }

  clearBullets() {
    this.bullets.forEach((bullet) => {
      CollisionManager.instance.removeCollider(bullet.collider);
    });
    this.bullets = [];
  }

  drawHUD(context) {
    context.fillStyle = "black";
    context.fillRect(20, 20, 200, 20);

    context.fillStyle = "red";
    context.fillRect(20, 20, 2 * this.health, 20);

    context.fillStyle = "white";
    context.font = "16px Arial";
    context.fillText(`Health: ${this.health}`, 20, 55);
  }

  onCollision(otherCollider) {
    if (otherCollider.owner instanceof Box) {
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
      this.health -= otherCollider.owner.damage;
      AudioManager.instance.playSound("player_hurt");
    } else if (
      otherCollider.owner instanceof Bullet &&
      otherCollider.owner.owner instanceof Boss
    ) {
      this.health -= otherCollider.owner.damage;
    }
  }
}
