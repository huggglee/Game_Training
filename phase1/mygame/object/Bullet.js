import { RectCollider } from "../handle/RectCollider.js";
import { Rotate } from "../handle/Rotate.js";

export class Bullet extends RectCollider {
  constructor(x, y,angle) {
    super(x, y);
    this.speed = 3;
    this.img = new Image();
    this.damage=10;
    this.img.src = "../asset/img/bullet/bullet_1.png";
    this.angle = angle;
    this.loadImage();

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
  }

  draw(context) {
    this.rotate.setRotation(
      this.angle,
      this.x + this.width / 2,
      this.y + this.height / 2
    );
    this.rotate.applyRotation(context);
    context.drawImage(this.img, -this.width/2, -this.height/2, this.width, this.height);
    context.beginPath();
    context.rect( -this.width/2, -this.height/2, this.width, this.height);
    context.strokeStyle ="red";
    context.stroke();
    context.closePath();

    this.rotate.resetRotation(context);
  }
}
