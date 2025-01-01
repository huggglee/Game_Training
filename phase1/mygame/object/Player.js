import { RectCollider } from "../handle/RectCollider.js";
import { Rotate } from "../handle/Rotate.js";
import { Bullet } from "./Bullet.js";

export class Player extends RectCollider {
  constructor(x, y, imgSrc) {
    super(x, y);
    this.speed = 4;
    this.angle = 0;
    this.health =100;
    this.state="alive"
    this.img = new Image();
    this.loadImage(imgSrc);
    this.rotate = new Rotate();
    this.bullets = []; 
    this.mouseX = 0; 
    this.mouseY = 0; 

    //di chuột
    window.addEventListener("mousemove", (event) => {
      this.mouseX = event.offsetX;
      this.mouseY = event.offsetY;
    });
  }

  loadImage(imgSrc) {
    this.img.src = imgSrc;
    this.img.onload = () => {
      this.width = this.img.width / 3;
      this.height = this.img.height / 3;
    };
  }

  shoot() {
    const bulletX = this.x + this.width / 2;
    const bulletY = this.y + this.height / 2;
    const bullet = new Bullet(bulletX, bulletY, this.angle); 
    this.bullets.push(bullet); 
  }

  move(inputController) {
    if (inputController.isKeyPressed("a")) {
      this.x -= this.speed;
    }
    if (inputController.isKeyPressed("d")) {
      this.x += this.speed;
    }
    if (inputController.isKeyPressed("w")) {
      this.y -= this.speed;
    }
    if (inputController.isKeyPressed("s")) {
      this.y += this.speed;
    }

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
    this.move(inputController);

    if (inputController.getMouseClick()) {
      this.shoot();
    }

    this.bullets.forEach((bullet, index) => {
      bullet.update();

      if (
        bullet.x < 0 ||
        bullet.x > canvas.width ||
        bullet.y < 0 ||
        bullet.y > canvas.height
      ) {
        this.bullets.splice(index, 1);
      }
    });

    //gioi han pham vi player
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
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();
    context.closePath();
    
    this.bullets.forEach((bullet) => {
      bullet.draw(context)
    });

  }
}