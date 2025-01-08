import { RectCollider } from "../handle/RectCollider.js";
import { Rotate } from "../handle/Rotate.js";
import { Bullet } from "./Bullet.js";

export class Enemy extends RectCollider {
  constructor(x, y) {
    super(x, y);
    this.targetX = x;
    this.targetY = y;
    this.speed = 3;
    this.angle = 0;
    this.health = 100;
    // this.act = "run";
    this.isAlive = true;
    this.img = new Image();
    this.imgIndex = 1;
    this.loadImage();
    setInterval(() => {
      let temp = (this.imgIndex % 6) + 1;
      this.changeIndex(temp);
    }, 200);
    this.bullets = [];
  }

  draw(context) {
   if(this.isAlive){
    context.drawImage(this.img, this.x, this.y, this.width, this.height);
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();
    context.closePath();
   }

    this.bullets.forEach((bullet) => {
      bullet.draw(context);
    });
  }

  shoot() {
    for (let i = 0; i < 10; i++) {
      this.bullets.push(new Bullet(this.x, this.y, (i * Math.PI) / 5));
    }
    // console.log(this.bullets);
  }

  loadImage() {
    this.img.onload = () => {
      this.width = this.img.width * 3;
      this.height = this.img.height * 3;
    };
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
    this.bullets.forEach((bullet) => bullet.update());
  }

  changeTarget(targetX, targetY) {
    this.targetX = targetX;
    this.targetY = targetY;
  }
}
