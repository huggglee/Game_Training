import { RectCollider } from "../handle/RectCollider.js";

export class Box extends RectCollider {
  constructor(x, y) {
    super(x, y);
    // this.type = type;
    this.health=30;
    this.img = new Image();
    this.loadImage();
  }

  draw(context) {
    context.drawImage(this.img,this.x,this.y,this.width,this.height);
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();
    context.closePath();
  }

  loadImage() {
    this.img.onload = () => {
      this.width = this.img.width ;
      this.height = this.img.height ;
      console.log(this.width);
      console.log(this.height);
    };
    this.img.src = `../asset/img/box/box_2.png`;
  }
}
