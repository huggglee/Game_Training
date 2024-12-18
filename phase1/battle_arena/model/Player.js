import { RectCollider } from "../handle/RectCollider.js";

export class Player extends RectCollider {
  constructor(x, y, imgSrc) {
    super(x, y);
    this.speed = 3;
    this.img = new Image();
    this.direction="right";
    this.loadImage(imgSrc);
  }

  update(inputController) {
    if (inputController.isKeyPressed("ArrowLeft")) {
      this.x -= this.speed;
      this.direction = "left";
    }
    if (inputController.isKeyPressed("ArrowRight")) {
      this.x += this.speed;
      this.direction = "right";
    }
    if (inputController.isKeyPressed("ArrowUp")) {
      this.y -= 30;
    }
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.width > canvas.width) {
      this.x = canvas.width - this.width;
    }
  }

  loadImage(imgSrc) {
    this.img.src = imgSrc;
    this.img.onload = () => {
      this.width = this.img.width / 6;
      this.height = this.img.height / 6;
    };
  }
  draw(context) {
    context.save();
    if (this.direction === "left") {
      context.translate(this.x + this.width / 2, this.y + this.height / 2);
      context.scale(-1, 1); // Lật hình ảnh theo trục X
      context.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
    }
    context.drawImage(this.img, this.x, this.y, this.width, this.height);
    context.restore();

    // Vẽ hitbox
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();
  }
}
